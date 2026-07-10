"use client";

import { useState } from 'react';
import RichTextEditor from './RichTextEditor';

export default function TabProfil({ settings, onSaveSettings }) {
  const [formData, setFormData] = useState({
    heroEyebrow: settings.heroEyebrow || "Lirboyo · Kota Kediri · Jawa Timur",
    heroArabic: settings.heroArabic || "مَعْهَدْ لِلْبَنَاتْ هِدَايَةُ الْمُبْتَدِئَاتْ",
    heroTitleHtml: settings.heroTitleHtml || 'Menempa Muslimah <em>Sejati</em>,<br>Berakar pada Kitab Salaf',
    heroSub: settings.heroSub || "Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati dengan keilmuan agama yang mendalam dan kesiapan menjawab kebutuhan masyarakat — di bawah naungan Yayasan Hidayatul Mubtadiat, Lirboyo Kediri.",
    profilSingkat: settings.profilSingkat || "Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo merupakan institusi pendidikan Islam yang mencetak santriwati berkarakter salaf, berilmu mendalam, dan berakhlak mulia.",
    phoneWa: settings.phoneWa || "0856-1985-565",
    instagramHandle: settings.instagramHandle || "@p3hmlirboyo",
    address: settings.address || "Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur",
    daftarUrl: settings.daftarUrl || "https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform",
    portalWaliUrl: settings.portalWaliUrl || "https://m.p3hm.my.id/",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSaveSettings(formData);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>🏷️ Pengaturan Bagian Hero Utama (Beranda)</h3>
            <p>Teks sambutan pertama yang dilihat pengunjung situs di halaman utama</p>
          </div>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Eyebrow / Lokasi Singkat</label>
            <input
              className="form-input"
              value={formData.heroEyebrow}
              onChange={e => setFormData({ ...formData, heroEyebrow: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Teks Kaligrafi Arab</label>
            <input
              className="form-input"
              value={formData.heroArabic}
              onChange={e => setFormData({ ...formData, heroArabic: e.target.value })}
            />
          </div>

          <div className="form-group">
            <RichTextEditor
              label="Judul Utama Hero (Mendukung format MS Word & tag HTML)"
              value={formData.heroTitleHtml}
              onChange={val => setFormData({ ...formData, heroTitleHtml: val })}
              rows={3}
              helperText="Tip: Klik tombol format di atas seperti B Tebal atau ↵ Baris Baru <br> untuk menata judul secara profesional."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subjudul Deskripsi Hero</label>
            <textarea
              className="form-input"
              rows={3}
              value={formData.heroSub}
              onChange={e => setFormData({ ...formData, heroSub: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>🏫 Deskripsi Profil Pondok Pesantren</h3>
            <p>Teks pengenalan yang ditampilkan pada bagian Profil Singkat</p>
          </div>
        </div>
        <div className="card-body">
          <div className="form-group">
            <RichTextEditor
              label="Paragraf Profil Lengkap Pondok Pesantren"
              value={formData.profilSingkat}
              onChange={val => setFormData({ ...formData, profilSingkat: val })}
              rows={6}
              helperText="Gunakan tombol ¶ Paragraf <p> atau ↵ Baris Baru <br> di atas agar teks narasi tersusun rapi."
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>📞 Kontak &amp; Tautan Penting</h3>
            <p>Kelola nomor kontak resmi dan tautan pendaftaran santriwati</p>
          </div>
        </div>
        <div className="card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Nomor Telepon / WhatsApp Resmi</label>
            <input
              className="form-input"
              value={formData.phoneWa}
              onChange={e => setFormData({ ...formData, phoneWa: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Akun Instagram Resmi</label>
            <input
              className="form-input"
              value={formData.instagramHandle}
              onChange={e => setFormData({ ...formData, instagramHandle: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Alamat Lengkap Pondok Pesantren</label>
            <textarea
              className="form-input"
              rows={2}
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tautan Pendaftaran Santri Baru (Google Form / Portal)</label>
            <input
              className="form-input"
              value={formData.daftarUrl}
              onChange={e => setFormData({ ...formData, daftarUrl: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tautan Portal Wali &amp; Akademik</label>
            <input
              className="form-input"
              value={formData.portalWaliUrl}
              onChange={e => setFormData({ ...formData, portalWaliUrl: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button type="submit" className="btn btn-primary" disabled={saving} style={{ padding: '12px 28px', fontSize: '14px' }}>
          {saving ? '⏳ Menyimpan Perubahan...' : '💾 Simpan Seluruh Pengaturan Profil & Kontak'}
        </button>
      </div>
    </form>
  );
}
