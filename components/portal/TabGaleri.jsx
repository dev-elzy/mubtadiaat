"use client";

import { useState } from 'react';

export default function TabGaleri({ galeri, categories = [], onRefresh, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: '',
    title: '',
    caption: '',
    category: 'Kegiatan Pondok',
    status: 'published',
    scheduledAt: '',
    image: '',
    cloudinaryId: ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const galeriCategories = categories.filter(c => c.type === 'galeri');
  const categoryList = galeriCategories.length > 0
    ? galeriCategories.map(c => c.name)
    : ['Kegiatan Pondok', 'Fasilitas & Lingkungan', 'Haul & Peringatan'];

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'p3hm/galeri');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.secure_url) {
        setForm({ ...form, image: data.secure_url, cloudinaryId: data.public_id });
        showToast("Foto berhasil diunggah!");
      } else {
        showToast(data.error || "Gagal mengunggah foto", "error");
      }
    } catch (err) {
      showToast(err.message || "Gagal mengunggah foto", "error");
    }
    setUploading(false);
  }

  async function saveGaleri(e) {
    e.preventDefault();
    if (!form.image) {
      showToast("Silakan unggah foto terlebih dahulu.", "error");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      id: form.id || `galeri-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    await fetch('/api/galeri', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setModalOpen(false);
    showToast("Foto dokumentasi berhasil disimpan!");
    onRefresh();
    setSaving(false);
  }

  async function deleteGaleri(item) {
    if (!confirm("Yakin ingin menghapus foto dokumentasi ini?")) return;
    await fetch('/api/galeri', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id: item.id })
    });
    showToast("Foto dokumentasi berhasil dihapus");
    onRefresh();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: 'var(--text)' }}>Daftar Galeri Dokumentasi P3HM</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            Kelola arsip foto kegiatan, fasilitas, dan jadwal tayang dokumentasi pondok
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setForm({
              id: '',
              title: '',
              caption: '',
              category: categoryList[0],
              status: 'published',
              scheduledAt: '',
              image: '',
              cloudinaryId: ''
            });
            setModalOpen(true);
          }}
        >
          ➕ Unggah Foto Kegiatan
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {galeri.map(item => (
          <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '180px', background: 'var(--bg)' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span className={`badge ${item.status === 'published' ? 'badge-published' : 'badge-draft'}`} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                {item.status === 'published' ? 'TERBIT' : 'JADWAL OTOMATIS'}
              </span>
            </div>
            <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.caption || '-'}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{item.date}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setForm({ ...item, scheduledAt: item.scheduled_at || '' }); setModalOpen(true); }}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteGaleri(item)}>Hapus</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {galeri.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-tertiary)' }}>
          Belum ada foto dokumentasi diunggah.
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3>{form.id ? 'Edit Foto Kegiatan' : 'Unggah Foto Kegiatan Baru'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={saveGaleri}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Judul Foto Kegiatan</label>
                  <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Kategori Galeri</label>
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
                    </select>
                  </div>
                </div>

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
                      ⏰ Tanggal &amp; Jam Penayangan Otomatis:
                    </label>
                    <input
                      type="datetime-local"
                      required
                      className="form-input"
                      value={form.scheduledAt}
                      onChange={e => setForm({ ...form, scheduledAt: e.target.value })}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Keterangan / Caption</label>
                  <textarea className="form-input" rows="2" value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Pilih Berkas Foto</label>
                  <input type="file" className="form-input" onChange={handleImageUpload} />
                  {uploading && (
                    <p style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Mengunggah ke Server Gambar</span>
                      <span className="dot-loading"><span></span><span></span><span></span></span>
                    </p>
                  )}
                  {form.image && <img src={form.image} alt="Preview" style={{ width: '100%', height: '220px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }} />}
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
                  ) : 'Simpan Foto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
