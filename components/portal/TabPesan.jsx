"use client";

import { useState } from 'react';

export default function TabPesan({ pesanList = [], onRefresh, showToast, confirm }) {
  const [activeSubTab, setActiveSubTab] = useState('UNREAD');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPesan, setSelectedPesan] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [saving, setSaving] = useState(false);

  const openPesan = async (item) => {
    setSelectedPesan(item);
    setReplyText(item.reply_text || '');
    setModalOpen(true);

    // If unread, mark as read automatically
    if (item.is_read === 0) {
      try {
        await fetch('/api/pesan', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.id, action: 'read' })
        });
        onRefresh();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSaveReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/pesan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedPesan.id,
          action: 'reply',
          replyText
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Balasan pesan berhasil disimpan!');
        setModalOpen(false);
        onRefresh();
      } else {
        showToast(data.error || 'Gagal menyimpan balasan', 'error');
      }
    } catch (err) {
      showToast('Koneksi gagal: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePesan = async (id) => {
    if (confirm) {
      const isConfirmed = await confirm('Hapus pesan masuk ini permanent?', 'Hapus Pesan');
      if (!isConfirmed) return;
    } else {
      if (!window.confirm('Hapus pesan masuk ini permanent?')) return;
    }

    try {
      const res = await fetch('/api/pesan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'delete' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Pesan berhasil dihapus');
        onRefresh();
      } else {
        showToast(data.error || 'Gagal menghapus pesan', 'error');
      }
    } catch (err) {
      showToast('Gagal menghapus pesan', 'error');
    }
  };

  const filteredPesanList = pesanList.filter(item => {
    if (activeSubTab === 'UNREAD') return item.is_read === 0;
    if (activeSubTab === 'READ') return item.is_read !== 0;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub-navigasi Filter Menu Pesan */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '12px',
        background: 'var(--surface)',
        borderRadius: '12px',
        border: '1px solid var(--border)'
      }}>
        {[
          { id: 'UNREAD', label: '1. 📩 Pesan Baru / Belum Dibaca' },
          { id: 'READ', label: '2. 📬 Sudah Dibaca / Dibalas' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              border: activeSubTab === tab.id ? '1px solid var(--gold)' : '1px solid var(--border)',
              fontSize: '13px',
              fontWeight: activeSubTab === tab.id ? '600' : '500',
              backgroundColor: activeSubTab === tab.id ? 'var(--gold-dark)' : 'var(--bg-elevated)',
              color: activeSubTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
              boxShadow: activeSubTab === tab.id ? '0 4px 14px rgba(216,190,140,0.25)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--text)' }}>📬 Kotak Masuk Pesan &amp; Kontak</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Lihat pesan dari pengunjung situs dan kelola balasan secara langsung.
        </p>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Nama Pengirim</th>
              <th>Subjek</th>
              <th>Tanggal Masuk</th>
              <th>Status Balasan</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPesanList.map(item => (
              <tr key={item.id} style={{ fontWeight: item.is_read === 0 ? '700' : 'normal' }}>
                <td>
                  {item.is_read === 0 ? (
                    <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>Baru</span>
                  ) : (
                    <span className="badge" style={{ background: 'var(--border)', color: 'var(--text-tertiary)' }}>Dibaca</span>
                  )}
                </td>
                <td>
                  <strong style={{ color: 'var(--text)', fontSize: '14px' }}>{item.name}</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 'normal' }}>{item.email}</div>
                </td>
                <td>{item.subject}</td>
                <td style={{ fontWeight: 'normal' }}>
                  {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>
                <td>
                  {item.reply_text ? (
                    <span className="badge badge-published">Sudah Dibalas</span>
                  ) : (
                    <span className="badge badge-draft">Belum Dibalas</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openPesan(item)}>Detail &amp; Balas</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeletePesan(item.id)}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {pesanList.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-tertiary)' }}>
                  Tidak ada pesan masuk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedPesan && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>Detail Pesan Masuk</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Pengirim</span>
                    <h4 style={{ color: 'var(--text)', margin: '2px 0 0 0' }}>{selectedPesan.name}</h4>
                    <span style={{ fontSize: '12.5px', color: 'var(--gold-bright)' }}>{selectedPesan.email}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Tanggal Masuk</span>
                    <div style={{ color: 'var(--text)', fontSize: '13.5px', marginTop: '2px' }}>
                      {new Date(selectedPesan.created_at).toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Subjek</span>
                  <div style={{ color: 'var(--text)', fontWeight: '600', fontSize: '14.5px', marginTop: '2px' }}>{selectedPesan.subject}</div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Isi Pesan</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '4px 0 0 0', whiteSpace: 'pre-wrap' }}>
                    {selectedPesan.message}
                  </p>
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSaveReply} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Tulis Balasan Arsip Internal (Tersimpan di Sistem)</span>
                    {selectedPesan.replied_at && (
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        Terakhir diupdate: {new Date(selectedPesan.replied_at).toLocaleString('id-ID')}
                      </span>
                    )}
                  </label>
                  <textarea
                    className="form-input"
                    rows="4"
                    required
                    placeholder="Tulis draf balasan atau catatan tindakan di sini..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  {/* Mailto link helper to respond directly via Email client */}
                  <a
                    href={`mailto:${selectedPesan.email}?subject=Re: ${encodeURIComponent(selectedPesan.subject)}&body=Assalamu'alaikum Wr. Wb. Yth. Bpk/Ibu/Sdr ${encodeURIComponent(selectedPesan.name)},%0D%0A%0D%0AMenanggapi pesan Anda mengenai "${encodeURIComponent(selectedPesan.subject)}":%0D%0A%0D%0A${encodeURIComponent(replyText)}%0D%0A%0D%0A%0D%0AWassalamu'alaikum Wr. Wb.%0D%0A--%0D%0ASekretariat Madrasah P3HM Lirboyo`}
                    target="_blank"
                    className="btn btn-ghost"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(218, 190, 140, 0.05)', color: 'var(--gold-bright)' }}
                  >
                    ✉️ Kirim Balasan ke Email Pengirim
                  </a>
                  <button type="submit" className="btn btn-primary" disabled={saving || !replyText.trim()}>
                    {saving ? 'Menyimpan...' : '💾 Simpan Arsip Balasan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
