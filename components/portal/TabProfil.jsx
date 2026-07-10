"use client";

import { useState } from 'react';
import RichTextEditor from './RichTextEditor';

function parseArraySetting(val, defaultArr) {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }
  return defaultArr;
}

const DEFAULT_MISI = [
  "Terwujudnya generasi Islam Ahlussunnah wal Jama'ah.",
  "Tegaknya Agama Islam Ahlussunnah wal Jama'ah.",
  "Membantu program pemerintah dalam membangun manusia seutuhnya.",
  "Menjadi sarana pendidikan, pelatihan, dan pengembangan sumber daya manusia.",
  "Menjadi media dakwah bagi masyarakat sekitar.",
  "Menjadi sarana sosial kemasyarakatan.",
  "Menjadi media informasi dan komunikasi pendidikan."
];

const DEFAULT_PROGRAM = [
  { title: "Kitab Salaf", desc: "Kajian kitab kuning secara klasikal dan berjenjang sebagai fondasi utama keilmuan agama." },
  { title: "Madrasah Diniyah", desc: "Kegiatan belajar mengajar formal yang terstruktur di bawah Madrasah Putri Hidayatul Mubtadiat." },
  { title: "Pembinaan Akhlak", desc: "Penanaman adab dan kepribadian muslimah sejati dalam keseharian pondok." },
  { title: "Kesiapan Sosial", desc: "Membekali santriwati agar berperan aktif menyukseskan dakwah di tengah masyarakat." }
];

const DEFAULT_JENJANG = [
  { name: "Madrasah Ibtidaiyah", yrs: "6 Th" },
  { name: "Madrasah Tsanawiyah", yrs: "3 Th" },
  { name: "Madrasah Aliyah", yrs: "3 Th" },
  { name: "Al-Robithoh", yrs: "1 Th" },
  { name: "Perkuliahan", yrs: "" },
  { name: "Tahfidzil Qur'an", yrs: "" },
  { name: "Tartilil Qur'an", yrs: "" },
  { name: "Bahtsul Masa-il", yrs: "" }
];

const DEFAULT_EKSTRA_COL1 = [
  { name: "Khitobah", desc: "Latihan berpidato dan berbicara di depan umum dengan bahasa yang baik dan lugas." },
  { name: "Diba'iyyah & Barzanji", desc: "Pembacaan sholawat dan syair pujian kepada Nabi Muhammad ﷺ." },
  { name: "Manaqib", desc: "Mengkaji sejarah dan keutamaan para wali serta ulama besar." },
  { name: "Simtuth Duror", desc: "Pembacaan kitab Maulid karya Al-Habib Ali bin Muhammad Al-Habsyi." },
  { name: "Izalatun Najasah & Tajhizul Mayyit", desc: "Pembelajaran tata cara bersuci dan mengurus jenazah sesuai syariat." }
];

const DEFAULT_EKSTRA_COL2 = [
  { name: "Murottilil Qur'an", desc: "Pelatihan membaca Al-Qur'an dengan tartil sesuai kaidah tajwid." },
  { name: "Vokal & Rebana", desc: "Pengembangan seni suara serta latihan mengiringi sholawat dan qosidah." },
  { name: "Menjahit", desc: "Keterampilan menjahit untuk kebutuhan pribadi maupun usaha." },
  { name: "Kepribadian", desc: "Pelatihan etika dan pengembangan diri agar santriwati berakhlak baik." },
  { name: "Make Up", desc: "Dasar-dasar tata rias yang sesuai norma kepantasan." }
];

const DEFAULT_FASILITAS = [
  "Kamar Santri", "Kamar Pengurus", "MCK", "Mushola", "Lokal / Kelas", "Aula",
  "Rental Komputer", "Wartel", "Kantin", "Ruang Serbaguna", "Ruang Penyimpanan Barang",
  "Perpustakaan", "Jemuran", "Ruang Panggilan", "UKS", "Toko Buku / Kitab",
  "Dapur", "Kantor"
];

export default function TabProfil({ settings = {}, onSaveSettings }) {
  const [activeSubTab, setActiveSubTab] = useState('ALL');

  const [formData, setFormData] = useState({
    // 1. Hero & Statistik
    heroEyebrow: settings.heroEyebrow || "Lirboyo · Kota Kediri · Jawa Timur",
    heroArabic: settings.heroArabic || "مَعْهَدْ لِلْبَنَاتْ هِدَايَةُ الْمُبْتَدِئَاتْ",
    heroTitleHtml: settings.heroTitleHtml || 'Menempa Muslimah <em>Sejati</em>,<br>Berakar pada Kitab Salaf',
    heroSub: settings.heroSub || "Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati dengan keilmuan agama yang mendalam dan kesiapan menjawab kebutuhan masyarakat — di bawah naungan Yayasan Hidayatul Mubtadiat, Lirboyo Kediri.",
    heroImage: settings.heroImage || "/images/bangunan-dalam.jpg",
    heroCaption: settings.heroCaption || "Lingkungan Pondok Putri Hidayatul Mubtadiat, Lirboyo Kediri",
    stat1Num: settings.stat1Num || "1406 H",
    stat1Label: settings.stat1Label || "Berdiri 15 September 1985 M",
    stat2Num: settings.stat2Num || "Salaf",
    stat2Label: settings.stat2Label || "Sistem Klasikal Kitab Kuning",
    stat3Num: settings.stat3Num || "1446 H",
    stat3Label: settings.stat3Label || "Periode Pendaftaran 2025–2026",
    stat4Num: settings.stat4Num || "Putri",
    stat4Label: settings.stat4Label || "Khusus Santriwati",

    // 2. Profil Singkat
    profilSingkatEyebrow: settings.profilSingkatEyebrow || "Profil Singkat",
    profilSingkatTitleHtml: settings.profilSingkatTitleHtml || "Pendidikan yang Menyatukan <em>Ilmu</em> dan <em>Kepribadian</em>",
    profilSingkat: settings.profilSingkat || "Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) adalah unit pendidikan khusus santriwati di bawah naungan Pondok Pesantren Lirboyo, Kediri, dengan Pendiri sekaligus Pengasuh KH. M. Anwar Manshur bersama Ibu Nyai Hj. Ummi Kultsum.\n\nMelalui pembinaan yang konsisten, pondok ini mengarahkan santriwatinya menjadi kader-kader muslimah sejati yang berdaya guna dalam menyukseskan dakwah dan pengembangan Islam di lingkungannya masing-masing.\n\nMadrasah Putri Hidayatul Mubtadiat (MPHM), sebagai unit pendidikan formal keagamaan di bawah naungan yang sama, menerapkan sistem klasikal berjenjang dengan fokus pengajaran kitab-kitab salaf — ciri khas yang menjadi identitas pesantren ini secara turun-temurun.",
    profilSingkatImage: settings.profilSingkatImage || "/images/muhafadhah-akhirussanah.jpg",
    profilSingkatTagBold: settings.profilSingkatTagBold || "Sejak 1406 H",
    profilSingkatTagText: settings.profilSingkatTagText || "Diasuh oleh KH. M. Anwar Manshur & Ibu Nyai Hj. Ummi Kultsum",

    // 3. Sejarah & Pendiri
    sejarahEyebrow: settings.sejarahEyebrow || "Sekilas Sejarah",
    sejarahTitleHtml: settings.sejarahTitleHtml || "Berawal dari <em>Dua</em> Santri Perdana",
    sejarahP1: settings.sejarahP1 || "Gagasan mendirikan pesantren khusus putri di lingkungan PP. Lirboyo bermula dari dawuh KH. Mahrus Aly kepada menantu dan putrinya, KH. M. Anwar Manshur dan Ibu Nyai Hj. Ummi Kultsum. Setelah melalui pertimbangan yang matang tentang pentingnya pendidikan agama bagi perempuan, keduanya memutuskan memulai dengan mengajar dua santri putri yang datang dari Jakarta dan Karawang, bersama para khadimat keluarga ndalem.",
    sejarahPullNote: settings.sejarahPullNote || "Wanita adalah tiang bagi bangsanya — semakin kokoh pendidikan yang ia terima, semakin kokoh pula generasi yang ia bentuk.",
    sejarahP2: settings.sejarahP2 || "Metode pengajian yang semula berbentuk halaqah sederhana kemudian dikembangkan menjadi sistem madrasah berjenjang pada 1407–1408 H, sambil tetap mempertahankan pengajian kitab kuning dengan sistem sorogan dan bandongan di luar jam sekolah. Seiring bertambahnya santri, dibangunlah asrama, MCK, dan gedung madrasah tersendiri — sebelumnya seluruh kegiatan santri masih menyatu dengan ndalem pengasuh.",
    sejarahYr: settings.sejarahYr || "1406 H",
    sejarahYrSub: settings.sejarahYrSub || "15 September 1985 M — resmi berdiri",
    sejarahFounder1Title: settings.sejarahFounder1Title || "Pendiri & Pengasuh",
    sejarahFounder1Name: settings.sejarahFounder1Name || "KH. M. Anwar Manshur",
    sejarahFounder2Title: settings.sejarahFounder2Title || "Mendampingi Sejak Awal",
    sejarahFounder2Name: settings.sejarahFounder2Name || "Ibu Nyai Hj. Ummi Kultsum",
    sejarahFounder3Title: settings.sejarahFounder3Title || "Atas Dawuh",
    sejarahFounder3Name: settings.sejarahFounder3Name || "KH. Mahrus Aly, Pengasuh PP. Lirboyo",

    // 4. Visi & Misi
    visiMisiEyebrow: settings.visiMisiEyebrow || "Arah Perjuangan",
    visiMisiTitleHtml: settings.visiMisiTitleHtml || "Visi & <em>Misi</em> Yayasan",
    visiText: settings.visiText || "Mewujudkan generasi Islam Ahlussunnah wal Jama'ah yang kokoh keilmuannya dan nyata kontribusinya bagi agama, bangsa, dan masyarakat.",

    // 5. Pilar & Jenjang Pendidikan
    programEyebrow: settings.programEyebrow || "Arah Pendidikan",
    programTitleHtml: settings.programTitleHtml || "Empat Pilar Pembinaan <em>Santriwati</em>",
    jenjangEyebrow: settings.jenjangEyebrow || "Jenjang & Unit",
    jenjangTitleHtml: settings.jenjangTitleHtml || "Satu Atap, <em>Delapan</em> Jenjang Belajar",

    // 6. Ekstra & Fasilitas
    ekstraEyebrow: settings.ekstraEyebrow || "Di Luar Jam Sekolah",
    ekstraTitleHtml: settings.ekstraTitleHtml || "Jam'iyyah & <em>Kursus</em> Keterampilan",
    ekstraCol1Title: settings.ekstraCol1Title || "Jam'iyyah",
    ekstraCol1Sub: settings.ekstraCol1Sub || "Kegiatan rutin malam Jum'at & mingguan",
    ekstraCol2Title: settings.ekstraCol2Title || "Kursus Keterampilan",
    ekstraCol2Sub: settings.ekstraCol2Sub || "Bekal kemandirian di luar keilmuan agama",
    fasilitasEyebrow: settings.fasilitasEyebrow || "Sarana Penunjang",
    fasilitasTitleHtml: settings.fasilitasTitleHtml || "Fasilitas <em>Pondok</em>",

    // 7. Kontak & Tautan
    phoneWa: settings.phoneWa || "0856-1985-565",
    instagramHandle: settings.instagramHandle || "@p3hmlirboyo",
    address: settings.address || "Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur",
    daftarUrl: settings.daftarUrl || "https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform",
    portalWaliUrl: settings.portalWaliUrl || "https://m.p3hm.my.id/",
  });

  const [misiList, setMisiList] = useState(() => parseArraySetting(settings.misiList, DEFAULT_MISI));
  const [programList, setProgramList] = useState(() => parseArraySetting(settings.programList, DEFAULT_PROGRAM));
  const [jenjangList, setJenjangList] = useState(() => parseArraySetting(settings.jenjangList, DEFAULT_JENJANG));
  const [ekstraCol1List, setEkstraCol1List] = useState(() => parseArraySetting(settings.ekstraCol1List, DEFAULT_EKSTRA_COL1));
  const [ekstraCol2List, setEkstraCol2List] = useState(() => parseArraySetting(settings.ekstraCol2List, DEFAULT_EKSTRA_COL2));
  const [fasilitasList, setFasilitasList] = useState(() => parseArraySetting(settings.fasilitasList, DEFAULT_FASILITAS));

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      misiList: JSON.stringify(misiList),
      programList: JSON.stringify(programList),
      jenjangList: JSON.stringify(jenjangList),
      ekstraCol1List: JSON.stringify(ekstraCol1List),
      ekstraCol2List: JSON.stringify(ekstraCol2List),
      fasilitasList: JSON.stringify(fasilitasList)
    };
    await onSaveSettings(payload);
    setSaving(false);
  };

  const showSection = (key) => activeSubTab === 'ALL' || activeSubTab === key;

  return (
    <form onSubmit={handleSubmit}>
      {/* Sub-navigasi Filter Bagian Profil */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '24px',
        padding: '12px',
        background: 'var(--surface)',
        borderRadius: '12px',
        border: '1px solid var(--border)'
      }}>
        {[
          { id: 'ALL', label: '🌟 Tampilkan Semua Bagian (Awal - Akhir)' },
          { id: 'HERO', label: '1. Hero & Statistik' },
          { id: 'PROFIL', label: '2. Profil Singkat' },
          { id: 'SEJARAH', label: '3. Sejarah & Pendiri' },
          { id: 'VISIMISI', label: '4. Visi & Misi' },
          { id: 'PROGRAM', label: '5. Pilar & Jenjang' },
          { id: 'EKSTRA', label: '6. Ekstra & Fasilitas' },
          { id: 'KONTAK', label: '7. Kontak & Tautan' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              padding: '8px 16px',
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

      {/* 1. BAGIAN HERO & STATISTIK PONDOK */}
      {showSection('HERO') && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-head">
            <div className="card-head-left">
              <h3>🏷️ 1. Hero Utama &amp; 4 Kotak Statistik Pondok</h3>
              <p>Mengatur tampilan paling atas halaman beranda dan menu profil pondok</p>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Eyebrow / Lokasi Atas</label>
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
            </div>

            <div className="form-group">
              <RichTextEditor
                label="Judul Utama Hero (Mendukung tag HTML seperti <em> dan <br>)"
                value={formData.heroTitleHtml}
                onChange={val => setFormData({ ...formData, heroTitleHtml: val })}
                rows={3}
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Path/URL Foto Hero Utama</label>
                <input
                  className="form-input"
                  value={formData.heroImage}
                  onChange={e => setFormData({ ...formData, heroImage: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Keterangan Foto Hero (Caption)</label>
                <input
                  className="form-input"
                  value={formData.heroCaption}
                  onChange={e => setFormData({ ...formData, heroCaption: e.target.value })}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', marginBottom: '12px' }}>📊 4 Kotak Statistik Utama Hero</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <label className="form-label" style={{ fontSize: '12px' }}>Kotak 1 - Angka/Teks Utama</label>
                  <input className="form-input" style={{ marginBottom: '8px' }} value={formData.stat1Num} onChange={e => setFormData({ ...formData, stat1Num: e.target.value })} />
                  <label className="form-label" style={{ fontSize: '12px' }}>Kotak 1 - Keterangan</label>
                  <input className="form-input" value={formData.stat1Label} onChange={e => setFormData({ ...formData, stat1Label: e.target.value })} />
                </div>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <label className="form-label" style={{ fontSize: '12px' }}>Kotak 2 - Angka/Teks Utama</label>
                  <input className="form-input" style={{ marginBottom: '8px' }} value={formData.stat2Num} onChange={e => setFormData({ ...formData, stat2Num: e.target.value })} />
                  <label className="form-label" style={{ fontSize: '12px' }}>Kotak 2 - Keterangan</label>
                  <input className="form-input" value={formData.stat2Label} onChange={e => setFormData({ ...formData, stat2Label: e.target.value })} />
                </div>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <label className="form-label" style={{ fontSize: '12px' }}>Kotak 3 - Angka/Teks Utama</label>
                  <input className="form-input" style={{ marginBottom: '8px' }} value={formData.stat3Num} onChange={e => setFormData({ ...formData, stat3Num: e.target.value })} />
                  <label className="form-label" style={{ fontSize: '12px' }}>Kotak 3 - Keterangan</label>
                  <input className="form-input" value={formData.stat3Label} onChange={e => setFormData({ ...formData, stat3Label: e.target.value })} />
                </div>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <label className="form-label" style={{ fontSize: '12px' }}>Kotak 4 - Angka/Teks Utama</label>
                  <input className="form-input" style={{ marginBottom: '8px' }} value={formData.stat4Num} onChange={e => setFormData({ ...formData, stat4Num: e.target.value })} />
                  <label className="form-label" style={{ fontSize: '12px' }}>Kotak 4 - Keterangan</label>
                  <input className="form-input" value={formData.stat4Label} onChange={e => setFormData({ ...formData, stat4Label: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BAGIAN PROFIL SINGKAT */}
      {showSection('PROFIL') && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-head">
            <div className="card-head-left">
              <h3>🏫 2. Profil Singkat Pondok Pesantren</h3>
              <p>Narasi pengenalan pondok beserta foto dan badge keterangan pengasuh</p>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Eyebrow Bagian Profil</label>
                <input
                  className="form-input"
                  value={formData.profilSingkatEyebrow}
                  onChange={e => setFormData({ ...formData, profilSingkatEyebrow: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Judul Bagian HTML</label>
                <input
                  className="form-input"
                  value={formData.profilSingkatTitleHtml}
                  onChange={e => setFormData({ ...formData, profilSingkatTitleHtml: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <RichTextEditor
                label="Paragraf Profil Lengkap Pondok Pesantren"
                value={formData.profilSingkat}
                onChange={val => setFormData({ ...formData, profilSingkat: val })}
                rows={6}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Path/URL Foto Profil Singkat</label>
                <input
                  className="form-input"
                  value={formData.profilSingkatImage}
                  onChange={e => setFormData({ ...formData, profilSingkatImage: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Badge Keterangan (Tahun Bold)</label>
                <input
                  className="form-input"
                  value={formData.profilSingkatTagBold}
                  onChange={e => setFormData({ ...formData, profilSingkatTagBold: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Badge Keterangan (Teks Pengasuh)</label>
                <input
                  className="form-input"
                  value={formData.profilSingkatTagText}
                  onChange={e => setFormData({ ...formData, profilSingkatTagText: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BAGIAN SEJARAH & PENDIRI */}
      {showSection('SEJARAH') && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-head">
            <div className="card-head-left">
              <h3>📜 3. Sekilas Sejarah &amp; Kartu Pendiri Pondok</h3>
              <p>Narasi sejarah awal mula berdirinya pesantren dan daftar pengasuh/pendiri</p>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Eyebrow Sejarah</label>
                <input
                  className="form-input"
                  value={formData.sejarahEyebrow}
                  onChange={e => setFormData({ ...formData, sejarahEyebrow: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Judul Sejarah HTML</label>
                <input
                  className="form-input"
                  value={formData.sejarahTitleHtml}
                  onChange={e => setFormData({ ...formData, sejarahTitleHtml: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Paragraf Sejarah Bagian 1</label>
              <textarea
                className="form-input"
                rows={4}
                value={formData.sejarahP1}
                onChange={e => setFormData({ ...formData, sejarahP1: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kutipan Pencerahan (Pull Note / Quote Sejarah)</label>
              <textarea
                className="form-input"
                rows={2}
                value={formData.sejarahPullNote}
                onChange={e => setFormData({ ...formData, sejarahPullNote: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Paragraf Sejarah Bagian 2</label>
              <textarea
                className="form-input"
                rows={4}
                value={formData.sejarahP2}
                onChange={e => setFormData({ ...formData, sejarahP2: e.target.value })}
              />
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', marginBottom: '12px' }}>🏛️ Kartu Informasi Berdiri &amp; Pendiri Pesantren</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Tahun Hijriah (Bold)</label>
                  <input className="form-input" value={formData.sejarahYr} onChange={e => setFormData({ ...formData, sejarahYr: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Sub Tahun / Masehi</label>
                  <input className="form-input" value={formData.sejarahYrSub} onChange={e => setFormData({ ...formData, sejarahYrSub: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '14px' }}>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <label className="form-label" style={{ fontSize: '12px' }}>Tokoh 1 - Jabatan/Judul</label>
                  <input className="form-input" style={{ marginBottom: '8px' }} value={formData.sejarahFounder1Title} onChange={e => setFormData({ ...formData, sejarahFounder1Title: e.target.value })} />
                  <label className="form-label" style={{ fontSize: '12px' }}>Tokoh 1 - Nama Lengkap</label>
                  <input className="form-input" value={formData.sejarahFounder1Name} onChange={e => setFormData({ ...formData, sejarahFounder1Name: e.target.value })} />
                </div>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <label className="form-label" style={{ fontSize: '12px' }}>Tokoh 2 - Jabatan/Judul</label>
                  <input className="form-input" style={{ marginBottom: '8px' }} value={formData.sejarahFounder2Title} onChange={e => setFormData({ ...formData, sejarahFounder2Title: e.target.value })} />
                  <label className="form-label" style={{ fontSize: '12px' }}>Tokoh 2 - Nama Lengkap</label>
                  <input className="form-input" value={formData.sejarahFounder2Name} onChange={e => setFormData({ ...formData, sejarahFounder2Name: e.target.value })} />
                </div>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <label className="form-label" style={{ fontSize: '12px' }}>Tokoh 3 - Jabatan/Judul</label>
                  <input className="form-input" style={{ marginBottom: '8px' }} value={formData.sejarahFounder3Title} onChange={e => setFormData({ ...formData, sejarahFounder3Title: e.target.value })} />
                  <label className="form-label" style={{ fontSize: '12px' }}>Tokoh 3 - Nama Lengkap</label>
                  <input className="form-input" value={formData.sejarahFounder3Name} onChange={e => setFormData({ ...formData, sejarahFounder3Name: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. BAGIAN VISI & MISI */}
      {showSection('VISIMISI') && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-head">
            <div className="card-head-left">
              <h3>🎯 4. Visi &amp; Misi Yayasan / Pondok Pesantren</h3>
              <p>Kelola teks visi utama serta butir-butir poin misi secara dinamis</p>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Eyebrow Visi Misi</label>
                <input
                  className="form-input"
                  value={formData.visiMisiEyebrow}
                  onChange={e => setFormData({ ...formData, visiMisiEyebrow: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Judul Visi Misi HTML</label>
                <input
                  className="form-input"
                  value={formData.visiMisiTitleHtml}
                  onChange={e => setFormData({ ...formData, visiMisiTitleHtml: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pernyataan Visi Utama (Visi Lead)</label>
              <textarea
                className="form-input"
                rows={3}
                value={formData.visiText}
                onChange={e => setFormData({ ...formData, visiText: e.target.value })}
              />
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', margin: 0 }}>📋 Daftar Poin Misi Pondok Pesantren</h4>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                  onClick={() => setMisiList([...misiList, "Poin misi baru..."])}
                >
                  + Tambah Poin Misi
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {misiList.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, minWidth: '32px', color: 'var(--gold)' }}>
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <input
                      className="form-input"
                      style={{ flex: 1 }}
                      value={typeof item === 'string' ? item : item.text || String(item)}
                      onChange={e => {
                        const next = [...misiList];
                        next[index] = e.target.value;
                        setMisiList(next);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setMisiList(misiList.filter((_, i) => i !== index))}
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. BAGIAN PILAR & JENJANG PENDIDIKAN */}
      {showSection('PROGRAM') && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-head">
            <div className="card-head-left">
              <h3>📚 5. Arah Pendidikan (Pilar) &amp; Jenjang Belajar</h3>
              <p>Kelola 4 Pilar Pembinaan Santriwati dan Daftar Jenjang/Unit Pendidikan</p>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Empat Pilar */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Eyebrow Pilar Pembinaan</label>
                  <input
                    className="form-input"
                    value={formData.programEyebrow}
                    onChange={e => setFormData({ ...formData, programEyebrow: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Judul Pilar HTML</label>
                  <input
                    className="form-input"
                    value={formData.programTitleHtml}
                    onChange={e => setFormData({ ...formData, programTitleHtml: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0f766e', margin: 0 }}>🕌 Kartu Pilar Pembinaan</h4>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                  onClick={() => setProgramList([...programList, { title: "Pilar Baru", desc: "Deskripsi pilar..." }])}
                >
                  + Tambah Pilar
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {programList.map((p, i) => (
                  <div key={i} style={{ background: 'var(--surface)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--gold)' }}>Pilar {i + 1}</span>
                      <button
                        type="button"
                        onClick={() => setProgramList(programList.filter((_, idx) => idx !== i))}
                        style={{ background: 'transparent', color: '#b91c1c', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Hapus
                      </button>
                    </div>
                    <label className="form-label" style={{ fontSize: '12px' }}>Judul Pilar</label>
                    <input
                      className="form-input"
                      style={{ marginBottom: '8px' }}
                      value={p.title || ''}
                      onChange={e => {
                        const next = [...programList];
                        next[i] = { ...p, title: e.target.value };
                        setProgramList(next);
                      }}
                    />
                    <label className="form-label" style={{ fontSize: '12px' }}>Deskripsi Pilar</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={p.desc || ''}
                      onChange={e => {
                        const next = [...programList];
                        next[i] = { ...p, desc: e.target.value };
                        setProgramList(next);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Jenjang Belajar */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Eyebrow Jenjang Pendidikan</label>
                  <input
                    className="form-input"
                    value={formData.jenjangEyebrow}
                    onChange={e => setFormData({ ...formData, jenjangEyebrow: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Judul Jenjang HTML</label>
                  <input
                    className="form-input"
                    value={formData.jenjangTitleHtml}
                    onChange={e => setFormData({ ...formData, jenjangTitleHtml: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0f766e', margin: 0 }}>🎓 Daftar Jenjang &amp; Masa Belajar</h4>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                  onClick={() => setJenjangList([...jenjangList, { name: "Jenjang Baru", yrs: "3 Th" }])}
                >
                  + Tambah Jenjang
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {jenjangList.map((j, i) => (
                  <div key={i} style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <input
                        className="form-input"
                        placeholder="Nama Jenjang (misal: Madrasah Aliyah)"
                        style={{ marginBottom: '6px' }}
                        value={j.name || ''}
                        onChange={e => {
                          const next = [...jenjangList];
                          next[i] = { ...j, name: e.target.value };
                          setJenjangList(next);
                        }}
                      />
                      <input
                        className="form-input"
                        placeholder="Masa Belajar (misal: 3 Th / kosong)"
                        value={j.yrs || ''}
                        onChange={e => {
                          const next = [...jenjangList];
                          next[i] = { ...j, yrs: e.target.value };
                          setJenjangList(next);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setJenjangList(jenjangList.filter((_, idx) => idx !== i))}
                      style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer' }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. BAGIAN EKSTRA & FASILITAS */}
      {showSection('EKSTRA') && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-head">
            <div className="card-head-left">
              <h3>🏆 6. Jam'iyyah, Kursus Keterampilan &amp; Fasilitas Pondok</h3>
              <p>Kelola daftar kegiatan ekstrakurikuler serta sarana penunjang pesantren</p>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Eyebrow Di Luar Jam Sekolah</label>
                <input
                  className="form-input"
                  value={formData.ekstraEyebrow}
                  onChange={e => setFormData({ ...formData, ekstraEyebrow: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Judul Bagian HTML</label>
                <input
                  className="form-input"
                  value={formData.ekstraTitleHtml}
                  onChange={e => setFormData({ ...formData, ekstraTitleHtml: e.target.value })}
                />
              </div>
            </div>

            {/* Kolom 1: Jam'iyyah */}
            <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label className="form-label">Judul Kolom 1</label>
                  <input className="form-input" value={formData.ekstraCol1Title} onChange={e => setFormData({ ...formData, ekstraCol1Title: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Subjudul Kolom 1</label>
                  <input className="form-input" value={formData.ekstraCol1Sub} onChange={e => setFormData({ ...formData, ekstraCol1Sub: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h5 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold)', margin: 0 }}>Daftar Kegiatan Jam'iyyah</h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '4px 12px', fontSize: '11px' }}
                  onClick={() => setEkstraCol1List([...ekstraCol1List, { name: "Kegiatan Baru", desc: "Keterangan kegiatan..." }])}
                >
                  + Tambah Jam'iyyah
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                {ekstraCol1List.map((item, i) => (
                  <div key={i} style={{ background: 'var(--bg-elevated)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>Kegiatan {i + 1}</span>
                      <button type="button" onClick={() => setEkstraCol1List(ekstraCol1List.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#b91c1c', cursor: 'pointer', fontSize: '12px' }}>Hapus</button>
                    </div>
                    <input className="form-input" style={{ marginBottom: '6px' }} placeholder="Nama Kegiatan" value={item.name || ''} onChange={e => {
                      const next = [...ekstraCol1List];
                      next[i] = { ...item, name: e.target.value };
                      setEkstraCol1List(next);
                    }} />
                    <textarea className="form-input" rows={2} placeholder="Deskripsi Kegiatan" value={item.desc || ''} onChange={e => {
                      const next = [...ekstraCol1List];
                      next[i] = { ...item, desc: e.target.value };
                      setEkstraCol1List(next);
                    }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom 2: Kursus Keterampilan */}
            <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label className="form-label">Judul Kolom 2</label>
                  <input className="form-input" value={formData.ekstraCol2Title} onChange={e => setFormData({ ...formData, ekstraCol2Title: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Subjudul Kolom 2</label>
                  <input className="form-input" value={formData.ekstraCol2Sub} onChange={e => setFormData({ ...formData, ekstraCol2Sub: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h5 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold)', margin: 0 }}>Daftar Kursus Keterampilan</h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '4px 12px', fontSize: '11px' }}
                  onClick={() => setEkstraCol2List([...ekstraCol2List, { name: "Kursus Baru", desc: "Keterangan kursus..." }])}
                >
                  + Tambah Kursus
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                {ekstraCol2List.map((item, i) => (
                  <div key={i} style={{ background: 'var(--bg-elevated)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>Kursus {i + 1}</span>
                      <button type="button" onClick={() => setEkstraCol2List(ekstraCol2List.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#b91c1c', cursor: 'pointer', fontSize: '12px' }}>Hapus</button>
                    </div>
                    <input className="form-input" style={{ marginBottom: '6px' }} placeholder="Nama Kursus" value={item.name || ''} onChange={e => {
                      const next = [...ekstraCol2List];
                      next[i] = { ...item, name: e.target.value };
                      setEkstraCol2List(next);
                    }} />
                    <textarea className="form-input" rows={2} placeholder="Deskripsi Kursus" value={item.desc || ''} onChange={e => {
                      const next = [...ekstraCol2List];
                      next[i] = { ...item, desc: e.target.value };
                      setEkstraCol2List(next);
                    }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Fasilitas Pondok */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Eyebrow Sarana Penunjang</label>
                  <input
                    className="form-input"
                    value={formData.fasilitasEyebrow}
                    onChange={e => setFormData({ ...formData, fasilitasEyebrow: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Judul Fasilitas HTML</label>
                  <input
                    className="form-input"
                    value={formData.fasilitasTitleHtml}
                    onChange={e => setFormData({ ...formData, fasilitasTitleHtml: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0f766e', margin: 0 }}>🏢 Sarana &amp; Fasilitas Pondok</h4>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                  onClick={() => setFasilitasList([...fasilitasList, "Fasilitas Baru"])}
                >
                  + Tambah Fasilitas
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {fasilitasList.map((f, i) => (
                  <div key={i} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '6px 14px'
                  }}>
                    <input
                      style={{ border: 'none', background: 'transparent', fontSize: '13px', fontWeight: 500, outline: 'none', minWidth: '80px' }}
                      value={typeof f === 'string' ? f : f.name || String(f)}
                      onChange={e => {
                        const next = [...fasilitasList];
                        next[i] = e.target.value;
                        setFasilitasList(next);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setFasilitasList(fasilitasList.filter((_, idx) => idx !== i))}
                      style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. BAGIAN KONTAK & TAUTAN */}
      {showSection('KONTAK') && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-head">
            <div className="card-head-left">
              <h3>📞 7. Kontak Resmi &amp; Tautan Pendaftaran / Portal</h3>
              <p>Kelola nomor WhatsApp, Instagram, Alamat Lengkap, dan tautan publik</p>
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
      )}

      <div style={{
        position: 'sticky',
        bottom: '16px',
        background: 'rgba(14, 37, 32, 0.96)',
        backdropFilter: 'blur(12px)',
        padding: '16px 24px',
        borderRadius: '16px',
        border: '1px solid var(--border-strong)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '32px',
        zIndex: 100
      }}>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          💡 Semua informasi dari awal sampai akhir pada menu profil siap diedit &amp; disimpan secara real-time.
        </div>
        <button type="submit" className="btn btn-primary" disabled={saving} style={{ padding: '12px 32px', fontSize: '14px', fontWeight: '600' }}>
          {saving ? '⏳ Menyimpan Seluruh Perubahan...' : '💾 Simpan Seluruh Informasi Profil & Kontak'}
        </button>
      </div>
    </form>
  );
}
