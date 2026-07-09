"use client";

import { useState } from 'react';

export default function TabTampilan({ settings, berita, galeri, onSaveSettings }) {
  const [formData, setFormData] = useState({
    showSectionBerita: settings.showSectionBerita || "true",
    homeBeritaMode: settings.homeBeritaMode || "auto",
    homeBeritaIds: (() => {
      try { return JSON.parse(settings.homeBeritaIds || "[]"); }
      catch { return []; }
    })(),
    showSectionGaleri: settings.showSectionGaleri || "true",
    homeGaleriMode: settings.homeGaleriMode || "auto",
    homeGaleriIds: (() => {
      try { return JSON.parse(settings.homeGaleriIds || "[]"); }
      catch { return []; }
    })(),
  });

  const [saving, setSaving] = useState(false);

  const toggleBeritaId = (id) => {
    const ids = [...formData.homeBeritaIds];
    const index = ids.indexOf(id);
    if (index > -1) ids.splice(index, 1);
    else ids.push(id);
    setFormData({ ...formData, homeBeritaIds: ids });
  };

  const toggleGaleriId = (id) => {
    const ids = [...formData.homeGaleriIds];
    const index = ids.indexOf(id);
    if (index > -1) ids.splice(index, 1);
    else ids.push(id);
    setFormData({ ...formData, homeGaleriIds: ids });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSaveSettings({
      showSectionBerita: formData.showSectionBerita,
      homeBeritaMode: formData.homeBeritaMode,
      homeBeritaIds: JSON.stringify(formData.homeBeritaIds),
      showSectionGaleri: formData.showSectionGaleri,
      homeGaleriMode: formData.homeGaleriMode,
      homeGaleriIds: JSON.stringify(formData.homeGaleriIds),
    });
    setSaving(false);
  };

  const publishedBerita = berita.filter(b => b.status === 'published');
  const publishedGaleri = galeri.filter(g => g.status === 'published');

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>📰 Pengaturan Seksi Warta Terbaru di Beranda</h3>
            <p>Atur apakah berita di Beranda dipilihin otomatis (terbaru) atau manual pilihan Admin</p>
          </div>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Tampilkan Seksi Berita di Beranda?</label>
            <select
              className="form-input"
              value={formData.showSectionBerita}
              onChange={e => setFormData({ ...formData, showSectionBerita: e.target.value })}
            >
              <option value="true">✅ Tampilkan Seksi Berita</option>
              <option value="false">🚫 Sembunyikan Seksi Berita</option>
            </select>
          </div>

          {formData.showSectionBerita === "true" && (
            <>
              <div className="form-group">
                <label className="form-label">Mode Pemilihan Berita</label>
                <select
                  className="form-input"
                  value={formData.homeBeritaMode}
                  onChange={e => setFormData({ ...formData, homeBeritaMode: e.target.value })}
                >
                  <option value="auto">⚡ Otomatis (Tampilkan 3 Berita Terbaru yang Diterbitkan)</option>
                  <option value="manual">🎯 Manual Pilihan Admin (Pilih berita di bawah)</option>
                </select>
              </div>

              {formData.homeBeritaMode === "manual" && (
                <div className="form-group">
                  <label className="form-label">Pilih Berita yang Ingin Ditampilkan (Disarankan 3 artikel)</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', maxHeight: '250px', overflowY: 'auto' }}>
                    {publishedBerita.length === 0 && <p style={{ color: 'var(--text-tertiary)' }}>Belum ada berita terbit.</p>}
                    {publishedBerita.map(b => {
                      const selected = formData.homeBeritaIds.includes(b.id);
                      return (
                        <label key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px', borderRadius: '6px', background: selected ? 'rgba(216,190,140,0.1)' : 'transparent' }}>
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleBeritaId(b.id)}
                          />
                          <div>
                            <strong style={{ fontSize: '13.5px', color: selected ? 'var(--gold-bright)' : 'var(--text)' }}>{b.title}</strong>
                            <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>{b.date} · {b.category}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>🖼️ Pengaturan Seksi Galeri Dokumentasi di Beranda</h3>
            <p>Atur tampilan foto kegiatan santriwati pada halaman awal</p>
          </div>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Tampilkan Seksi Galeri di Beranda?</label>
            <select
              className="form-input"
              value={formData.showSectionGaleri}
              onChange={e => setFormData({ ...formData, showSectionGaleri: e.target.value })}
            >
              <option value="true">✅ Tampilkan Seksi Galeri</option>
              <option value="false">🚫 Sembunyikan Seksi Galeri</option>
            </select>
          </div>

          {formData.showSectionGaleri === "true" && (
            <>
              <div className="form-group">
                <label className="form-label">Mode Pemilihan Foto Galeri</label>
                <select
                  className="form-input"
                  value={formData.homeGaleriMode}
                  onChange={e => setFormData({ ...formData, homeGaleriMode: e.target.value })}
                >
                  <option value="auto">⚡ Otomatis (Tampilkan 4 Foto Terbaru)</option>
                  <option value="manual">🎯 Manual Pilihan Admin (Pilih foto di bawah)</option>
                </select>
              </div>

              {formData.homeGaleriMode === "manual" && (
                <div className="form-group">
                  <label className="form-label">Pilih Foto yang Ingin Ditampilkan (Disarankan 4 foto)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', maxHeight: '300px', overflowY: 'auto' }}>
                    {publishedGaleri.length === 0 && <p style={{ color: 'var(--text-tertiary)', gridColumn: '1/-1' }}>Belum ada foto galeri.</p>}
                    {publishedGaleri.map(g => {
                      const selected = formData.homeGaleriIds.includes(g.id);
                      return (
                        <div
                          key={g.id}
                          onClick={() => toggleGaleriId(g.id)}
                          style={{
                            cursor: 'pointer',
                            border: selected ? '2px solid var(--gold)' : '1px solid var(--border)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative',
                            background: selected ? 'rgba(216,190,140,0.15)' : 'var(--surface)'
                          }}
                        >
                          <img src={g.image} alt={g.title} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                          <div style={{ padding: '8px' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: selected ? 'var(--gold-bright)' : 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{selected ? '✅ Terpilih' : '⚪ Klik untuk pilih'}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Menyimpan Pengaturan...' : '💾 Simpan Aturan Tampilan Beranda'}
        </button>
      </div>
    </form>
  );
}
