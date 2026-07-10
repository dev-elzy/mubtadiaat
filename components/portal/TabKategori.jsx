"use client";

import { useState } from 'react';

export default function TabKategori({ categories, onRefresh, showToast, confirm }) {
  const [activeSubTab, setActiveSubTab] = useState('BERITA');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', type: 'berita' });
  const [saving, setSaving] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Kategori berhasil disimpan!');
        setForm({ id: '', name: '', type: 'berita' });
        setModalOpen(false);
        onRefresh();
      } else {
        showToast(data.error || 'Gagal menyimpan kategori', 'error');
      }
    } catch (err) {
      showToast('Koneksi gagal: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (confirm) {
      const isConfirmed = await confirm('Hapus kategori ini? Kategori yang dihapus tidak akan muncul lagi di daftar pilihan.', 'Hapus Kategori');
      if (!isConfirmed) return;
    } else {
      if (!window.confirm('Hapus kategori ini? Kategori yang dihapus tidak akan muncul lagi di daftar pilihan.')) return;
    }
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      showToast('Kategori berhasil dihapus');
      onRefresh();
    } catch (err) {
      showToast('Gagal menghapus kategori', 'error');
    }
  }

  const beritaCategories = categories.filter(c => c.type === 'berita');
  const galeriCategories = categories.filter(c => c.type === 'galeri');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Sub-navigasi Filter Menu Kategori */}
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
          { id: 'BERITA', label: '1. 📰 Kategori Artikel Berita' },
          { id: 'GALERI', label: '2. 🖼️ Kategori Galeri Dokumentasi' },
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: 'var(--text)' }}>Daftar Kategori Kustom P3HM</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            Kelola kategori untuk Berita dan Galeri Dokumentasi secara dinamis
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setForm({ id: '', name: '', type: 'berita' });
            setModalOpen(true);
          }}
        >
          ➕ Tambah Kategori Baru
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Kategori Berita */}
        {(activeSubTab === 'ALL' || activeSubTab === 'BERITA') && (
        <div className="card">
          <div className="card-head">
            <div className="card-head-left">
              <h3>📰 Kategori Artikel Berita ({beritaCategories.length})</h3>
              <p>Daftar kategori untuk bagian Berita</p>
            </div>
          </div>
          <div className="item-list">
            {beritaCategories.map(c => (
              <div key={c.id} className="item-row" style={{ justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: 'var(--text)', fontSize: '14px' }}>{c.name}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>ID: {c.id}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setForm(c); setModalOpen(true); }}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Hapus</button>
                </div>
              </div>
            ))}
            {beritaCategories.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>Belum ada kategori berita</div>
            )}
          </div>
        </div>
        )}

        {/* Kategori Galeri */}
        {(activeSubTab === 'ALL' || activeSubTab === 'GALERI') && (
        <div className="card">
          <div className="card-head">
            <div className="card-head-left">
              <h3>🖼️ Kategori Galeri Dokumentasi ({galeriCategories.length})</h3>
              <p>Daftar kategori untuk bagian Galeri</p>
            </div>
          </div>
          <div className="item-list">
            {galeriCategories.map(c => (
              <div key={c.id} className="item-row" style={{ justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: 'var(--text)', fontSize: '14px' }}>{c.name}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>ID: {c.id}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setForm(c); setModalOpen(true); }}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Hapus</button>
                </div>
              </div>
            ))}
            {galeriCategories.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>Belum ada kategori galeri</div>
            )}
          </div>
        </div>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3>{form.id ? 'Edit Kategori Kustom' : 'Tambah Kategori Kustom Baru'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Nama Kategori</label>
                  <input
                    className="form-input"
                    required
                    placeholder="Misal: Kajian Subuh, Prestasi Santri, dsb."
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ height: '38px' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tipe Kategori</label>
                  <select
                    className="form-input"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    style={{ height: '38px' }}
                  >
                    <option value="berita">📰 Untuk Berita</option>
                    <option value="galeri">🖼️ Untuk Galeri</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary" disabled={saving} style={{ height: '38px', padding: '0 20px' }}>
                  {saving ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span>Menyimpan</span>
                      <span className="dot-loading"><span></span><span></span><span></span></span>
                    </span>
                  ) : 'Simpan Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
