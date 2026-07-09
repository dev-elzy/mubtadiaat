"use client";

import { useState } from 'react';

export default function TabKategori({ categories, onRefresh, showToast }) {
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
    if (!confirm('Hapus kategori ini? Kategori yang dihapus tidak akan muncul lagi di daftar pilihan.')) return;
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
      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>🗂️ Tambah / Edit Kategori Kustom</h3>
            <p>Kategori yang ditambahkan di sini akan otomatis muncul pada pilihan kategori saat membuat Berita / Galeri</p>
          </div>
        </div>
        <form onSubmit={handleSave}>
          <div className="card-body" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: '1 1 240px' }}>
              <label className="form-label">Nama Kategori Baru</label>
              <input
                className="form-input"
                required
                placeholder="Misal: Kajian Subuh, Prestasi Santri, dsb."
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ flex: '0 0 180px' }}>
              <label className="form-label">Tipe Kategori</label>
              <select
                className="form-input"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
              >
                <option value="berita">📰 Untuk Berita</option>
                <option value="galeri">🖼️ Untuk Galeri</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving} style={{ padding: '11px 20px' }}>
              {saving ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Menyimpan</span>
                  <span className="dot-loading"><span></span><span></span><span></span></span>
                </span>
              ) : form.id ? '💾 Perbarui Kategori' : '➕ Tambah Kategori'}
            </button>
            {form.id && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setForm({ id: '', name: '', type: 'berita' })}
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Kategori Berita */}
        <div className="card">
          <div className="card-head">
            <div className="card-head-left">
              <h3>📰 Kategori Artikel Berita ({beritaCategories.length})</h3>
              <p>Daftar kategori untuk seksi Berita</p>
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
                  <button className="btn btn-ghost btn-sm" onClick={() => setForm(c)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Hapus</button>
                </div>
              </div>
            ))}
            {beritaCategories.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>Belum ada kategori berita</div>
            )}
          </div>
        </div>

        {/* Kategori Galeri */}
        <div className="card">
          <div className="card-head">
            <div className="card-head-left">
              <h3>🖼️ Kategori Galeri Dokumentasi ({galeriCategories.length})</h3>
              <p>Daftar kategori untuk seksi Galeri</p>
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
                  <button className="btn btn-ghost btn-sm" onClick={() => setForm(c)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Hapus</button>
                </div>
              </div>
            ))}
            {galeriCategories.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>Belum ada kategori galeri</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
