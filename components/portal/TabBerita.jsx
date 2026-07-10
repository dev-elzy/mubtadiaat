"use client";

import { useState } from 'react';
import RichTextEditor from './RichTextEditor';

export default function TabBerita({ berita, categories = [], onRefresh, showToast, confirm }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: '',
    title: '',
    slug: '',
    category: 'Pendidikan',
    status: 'published',
    scheduledAt: '',
    author: 'Admin P3HM',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    image: '',
    cloudinaryId: '',
    summary: '',
    content: ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Ambil kategori khusus untuk berita dari prop categories
  const beritaCategories = categories.filter(c => c.type === 'berita');
  const categoryList = beritaCategories.length > 0
    ? beritaCategories.map(c => c.name)
    : ['Pendidikan', 'Kegiatan Santri', 'Pengumuman', 'Kitab Salaf', 'Kajian Rutin'];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'p3hm/berita');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.secure_url) {
        setForm({ ...form, image: data.secure_url, cloudinaryId: data.public_id });
        showToast('Foto berita berhasil diunggah!');
      } else {
        showToast(data.error || 'Gagal mengunggah foto', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan unggah foto', 'error');
    } finally {
      setUploading(false);
    }
  };

  const saveBerita = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      id: form.id || `berita-${Date.now()}`,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    try {
      const res = await fetch('/api/berita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(form.id ? 'Berita diperbarui!' : 'Berita baru ditambahkan!');
        setModalOpen(false);
        onRefresh();
      } else {
        showToast(data.error || 'Gagal menyimpan berita', 'error');
      }
    } catch (err) {
      showToast('Koneksi gagal', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteBerita = async (id) => {
    if (confirm) {
      const isConfirmed = await confirm('Yakin ingin menghapus artikel berita ini?', 'Hapus Artikel');
      if (!isConfirmed) return;
    } else {
      if (!window.confirm('Yakin ingin menghapus artikel berita ini?')) return;
    }
    try {
      await fetch('/api/berita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      showToast('Berita berhasil dihapus');
      onRefresh();
    } catch (err) {
      showToast('Gagal menghapus berita', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: 'var(--text)' }}>Daftar Artikel Berita P3HM</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            Kelola publikasi berita, kategori kustom, dan jadwal tayang otomatis
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setForm({
              id: '',
              title: '',
              slug: '',
              category: categoryList[0],
              status: 'published',
              scheduledAt: '',
              author: 'Admin P3HM',
              date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
              image: '',
              cloudinaryId: '',
              summary: '',
              content: ''
            });
            setModalOpen(true);
          }}
        >
          ➕ Tulis Berita Baru
        </button>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Sampul</th>
              <th>Judul Artikel</th>
              <th>Kategori</th>
              <th>Tanggal Terbit / Jadwal</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.map(b => (
              <tr key={b.id}>
                <td style={{ width: '80px' }}>
                  {b.image ? (
                    <img src={b.image} alt={b.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '60px', height: '40px', background: 'var(--bg)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>No Img</div>
                  )}
                </td>
                <td>
                  <strong style={{ color: 'var(--text)', fontSize: '14px' }}>{b.title}</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Slug: /berita/{b.slug}</div>
                </td>
                <td><span className="badge" style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}>{b.category}</span></td>
                <td>
                  <div>{b.date}</div>
                  {b.status === 'scheduled' && b.scheduled_at && (
                    <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: '600' }}>
                      ⏰ Jadwal Tayang: {b.scheduled_at.replace('T', ' ')}
                    </div>
                  )}
                </td>
                <td>
                  <span className={`badge ${b.status === 'published' ? 'badge-published' : b.status === 'scheduled' ? 'badge-warning' : 'badge-draft'}`}>
                    {b.status === 'published' ? 'TERBIT' : b.status === 'scheduled' ? 'JADWAL OTOMATIS' : 'DRAF'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setForm({ ...b, scheduledAt: b.scheduled_at || '' }); setModalOpen(true); }}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteBerita(b.id)}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {berita.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-tertiary)' }}>Belum ada artikel berita dipublikasikan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '780px' }}>
            <div className="modal-header">
              <h3>{form.id ? 'Edit Artikel Berita' : 'Tulis Artikel Berita Baru'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={saveBerita}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Judul Artikel</label>
                  <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Kategori (Dari menu Manajemen Kategori)</label>
                    <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      {categoryList.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status Penayangan</label>
                    <select className="form-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                      <option value="published">🚀 Published (Langsung Tayang)</option>
                      <option value="scheduled">⏰ Scheduled (Jadwal Tayang Otomatis)</option>
                      <option value="draft">📁 Draft (Disembunyikan sementara)</option>
                    </select>
                  </div>
                </div>

                {/* Jadwal Tayang Otomatis Date/Time Picker */}
                {form.status === 'scheduled' && (
                  <div
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <label className="form-label" style={{ color: '#F59E0B', margin: 0 }}>
                      ⏰ Atur Tanggal &amp; Jam Penayangan Otomatis:
                    </label>
                    <input
                      type="datetime-local"
                      required
                      className="form-input"
                      value={form.scheduledAt}
                      onChange={e => setForm({ ...form, scheduledAt: e.target.value })}
                    />
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      Artikel akan otomatis tayang di situs publik begitu tanggal dan jam ini tercapai.
                    </span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Gambar Sampul Artikel</label>
                  <input type="file" className="form-input" onChange={handleImageUpload} />
                  {uploading && (
                    <p style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Mengunggah ke Server Gambar</span>
                      <span className="dot-loading"><span></span><span></span><span></span></span>
                    </p>
                  )}
                  {form.image && <img src={form.image} alt="Preview" style={{ width: '100%', height: '160px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }} />}
                </div>
                <div className="form-group">
                  <label className="form-label">Ringkasan Singkat (Muncul di kartu berita Beranda)</label>
                  <textarea className="form-input" rows="2" value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} required />
                </div>
                <div className="form-group">
                  <RichTextEditor
                    label="Konten Artikel Lengkap (Mendukung format MS Word & tag HTML)"
                    value={form.content}
                    onChange={val => setForm({ ...form, content: val })}
                    rows={7}
                    helperText="Klik tombol format di atas (seperti ¶ Paragraf <p> atau B Tebal) atau klik '❓ Panduan Tag HTML' untuk bantuan."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary" disabled={uploading || saving}>
                  {saving ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span>Menyimpan</span>
                      <span className="dot-loading"><span></span><span></span><span></span></span>
                    </span>
                  ) : 'Simpan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
