import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const DEFAULT_SETTINGS = {
  // 1. Hero & Statistik
  heroEyebrow: "Lirboyo · Kota Kediri · Jawa Timur",
  heroArabic: "مَعْهَدْ لِلْبَنَاتْ هِدَايَةُ الْمُبْتَدِئَاتْ",
  heroTitleHtml: 'Menempa Muslimah <em>Sejati</em>,<br>Berakar pada Kitab Salaf',
  heroSub: "Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati dengan keilmuan agama yang mendalam dan kesiapan menjawab kebutuhan masyarakat — di bawah naungan Yayasan Hidayatul Mubtadiat, Lirboyo Kediri.",
  heroImage: "/images/bangunan-dalam.jpg",
  heroCaption: "Lingkungan Pondok Putri Hidayatul Mubtadiat, Lirboyo Kediri",
  stat1Num: "1406 H",
  stat1Label: "Berdiri 15 September 1985 M",
  stat2Num: "Salaf",
  stat2Label: "Sistem Klasikal Kitab Kuning",
  stat3Num: "1446 H",
  stat3Label: "Periode Pendaftaran 2025–2026",
  stat4Num: "Putri",
  stat4Label: "Khusus Santriwati",

  // 2. Profil Singkat
  profilSingkatEyebrow: "Profil Singkat",
  profilSingkatTitleHtml: "Pendidikan yang Menyatukan <em>Ilmu</em> dan <em>Kepribadian</em>",
  profilSingkat: "Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) adalah unit pendidikan khusus santriwati di bawah naungan Pondok Pesantren Lirboyo, Kediri, dengan Pendiri sekaligus Pengasuh KH. M. Anwar Manshur bersama Ibu Nyai Hj. Ummi Kultsum.\n\nMelalui pembinaan yang konsisten, pondok ini mengarahkan santriwatinya menjadi kader-kader muslimah sejati yang berdaya guna dalam menyukseskan dakwah dan pengembangan Islam di lingkungannya masing-masing.\n\nMadrasah Putri Hidayatul Mubtadiat (MPHM), sebagai unit pendidikan formal keagamaan di bawah naungan yang sama, menerapkan sistem klasikal berjenjang dengan fokus pengajaran kitab-kitab salaf — ciri khas yang menjadi identitas pesantren ini secara turun-temurun.",
  profilSingkatImage: "/images/muhafadhah-akhirussanah.jpg",
  profilSingkatTagBold: "Sejak 1406 H",
  profilSingkatTagText: "Diasuh oleh KH. M. Anwar Manshur & Ibu Nyai Hj. Ummi Kultsum",

  // 3. Sejarah & Pendiri
  sejarahEyebrow: "Sekilas Sejarah",
  sejarahTitleHtml: "Berawal dari <em>Dua</em> Santri Perdana",
  sejarahP1: "Gagasan mendirikan pesantren khusus putri di lingkungan PP. Lirboyo bermula dari dawuh KH. Mahrus Aly kepada menantu dan putrinya, KH. M. Anwar Manshur dan Ibu Nyai Hj. Ummi Kultsum. Setelah melalui pertimbangan yang matang tentang pentingnya pendidikan agama bagi perempuan, keduanya memutuskan memulai dengan mengajar dua santri putri yang datang dari Jakarta dan Karawang, bersama para khadimat keluarga ndalem.",
  sejarahPullNote: "Wanita adalah tiang bagi bangsanya — semakin kokoh pendidikan yang ia terima, semakin kokoh pula generasi yang ia bentuk.",
  sejarahP2: "Metode pengajian yang semula berbentuk halaqah sederhana kemudian dikembangkan menjadi sistem madrasah berjenjang pada 1407–1408 H, sambil tetap mempertahankan pengajian kitab kuning dengan sistem sorogan dan bandongan di luar jam sekolah. Seiring bertambahnya santri, dibangunlah asrama, MCK, dan gedung madrasah tersendiri — sebelumnya seluruh kegiatan santri masih menyatu dengan ndalem pengasuh.",
  sejarahYr: "1406 H",
  sejarahYrSub: "15 September 1985 M — resmi berdiri",
  sejarahFounder1Title: "Pendiri & Pengasuh",
  sejarahFounder1Name: "KH. M. Anwar Manshur",
  sejarahFounder2Title: "Mendampingi Sejak Awal",
  sejarahFounder2Name: "Ibu Nyai Hj. Ummi Kultsum",
  sejarahFounder3Title: "Atas Dawuh",
  sejarahFounder3Name: "KH. Mahrus Aly, Pengasuh PP. Lirboyo",

  // 4. Visi & Misi
  visiMisiEyebrow: "Arah Perjuangan",
  visiMisiTitleHtml: "Visi & <em>Misi</em> Yayasan",
  visiText: "Mewujudkan generasi Islam Ahlussunnah wal Jama'ah yang kokoh keilmuannya dan nyata kontribusinya bagi agama, bangsa, dan masyarakat.",
  misiList: JSON.stringify([
    "Terwujudnya generasi Islam Ahlussunnah wal Jama'ah.",
    "Tegaknya Agama Islam Ahlussunnah wal Jama'ah.",
    "Membantu program pemerintah dalam membangun manusia seutuhnya.",
    "Menjadi sarana pendidikan, pelatihan, dan pengembangan sumber daya manusia.",
    "Menjadi media dakwah bagi masyarakat sekitar.",
    "Menjadi sarana sosial kemasyarakatan.",
    "Menjadi media informasi dan komunikasi pendidikan."
  ]),

  // 5. Pilar & Jenjang Pendidikan
  programEyebrow: "Arah Pendidikan",
  programTitleHtml: "Empat Pilar Pembinaan <em>Santriwati</em>",
  programList: JSON.stringify([
    { title: "Kitab Salaf", desc: "Kajian kitab kuning secara klasikal dan berjenjang sebagai fondasi utama keilmuan agama." },
    { title: "Madrasah Diniyah", desc: "Kegiatan belajar mengajar formal yang terstruktur di bawah Madrasah Putri Hidayatul Mubtadiat." },
    { title: "Pembinaan Akhlak", desc: "Penanaman adab dan kepribadian muslimah sejati dalam keseharian pondok." },
    { title: "Kesiapan Sosial", desc: "Membekali santriwati agar berperan aktif menyukseskan dakwah di tengah masyarakat." }
  ]),
  jenjangEyebrow: "Jenjang & Unit",
  jenjangTitleHtml: "Satu Atap, <em>Delapan</em> Jenjang Belajar",
  jenjangList: JSON.stringify([
    { name: "Madrasah Ibtidaiyah", yrs: "6 Th" },
    { name: "Madrasah Tsanawiyah", yrs: "3 Th" },
    { name: "Madrasah Aliyah", yrs: "3 Th" },
    { name: "Al-Robithoh", yrs: "1 Th" },
    { name: "Perkuliahan", yrs: "" },
    { name: "Tahfidzil Qur'an", yrs: "" },
    { name: "Tartilil Qur'an", yrs: "" },
    { name: "Bahtsul Masa-il", yrs: "" }
  ]),

  // 6. Ekstra & Fasilitas
  ekstraEyebrow: "Di Luar Jam Sekolah",
  ekstraTitleHtml: "Jam'iyyah & <em>Kursus</em> Keterampilan",
  ekstraCol1Title: "Jam'iyyah",
  ekstraCol1Sub: "Kegiatan rutin malam Jum'at & mingguan",
  ekstraCol1List: JSON.stringify([
    { name: "Khitobah", desc: "Latihan berpidato dan berbicara di depan umum dengan bahasa yang baik dan lugas." },
    { name: "Diba'iyyah & Barzanji", desc: "Pembacaan sholawat dan syair pujian kepada Nabi Muhammad ﷺ." },
    { name: "Manaqib", desc: "Mengkaji sejarah dan keutamaan para wali serta ulama besar." },
    { name: "Simtuth Duror", desc: "Pembacaan kitab Maulid karya Al-Habib Ali bin Muhammad Al-Habsyi." },
    { name: "Izalatun Najasah & Tajhizul Mayyit", desc: "Pembelajaran tata cara bersuci dan mengurus jenazah sesuai syariat." }
  ]),
  ekstraCol2Title: "Kursus Keterampilan",
  ekstraCol2Sub: "Bekal kemandirian di luar keilmuan agama",
  ekstraCol2List: JSON.stringify([
    { name: "Murottilil Qur'an", desc: "Pelatihan membaca Al-Qur'an dengan tartil sesuai kaidah tajwid." },
    { name: "Vokal & Rebana", desc: "Pengembangan seni suara serta latihan mengiringi sholawat dan qosidah." },
    { name: "Menjahit", desc: "Keterampilan menjahit untuk kebutuhan pribadi maupun usaha." },
    { name: "Kepribadian", desc: "Pelatihan etika dan pengembangan diri agar santriwati berakhlak baik." },
    { name: "Make Up", desc: "Dasar-dasar tata rias yang sesuai norma kepantasan." }
  ]),
  fasilitasEyebrow: "Sarana Penunjang",
  fasilitasTitleHtml: "Fasilitas <em>Pondok</em>",
  fasilitasList: JSON.stringify([
    "Kamar Santri", "Kamar Pengurus", "MCK", "Mushola", "Lokal / Kelas", "Aula",
    "Rental Komputer", "Wartel", "Kantin", "Ruang Serbaguna", "Ruang Penyimpanan Barang",
    "Perpustakaan", "Jemuran", "Ruang Panggilan", "UKS", "Toko Buku / Kitab",
    "Dapur", "Kantor"
  ]),

  // 7. Kontak & Tautan
  daftarUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform",
  portalWaliUrl: "https://m.p3hm.my.id/",
  phoneWa: "0856-1985-565",
  instagramHandle: "@p3hmlirboyo",
  address: "Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur",

  homeBeritaMode: "auto",
  homeBeritaIds: "[]",
  homeGaleriMode: "auto",
  homeGaleriIds: "[]",
  showSectionBerita: "true",
  showSectionGaleri: "true",
};

function getDb() {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  return ctx.env.DB;
}

export async function GET() {
  try {
    const db = getDb();
    const { results } = await db.prepare("SELECT * FROM settings").all();
    const settings = { ...DEFAULT_SETTINGS };
    results.forEach(row => {
      settings[row.key] = row.value;
    });
    return Response.json(settings);
  } catch (e) {
    return Response.json(DEFAULT_SETTINGS);
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    
    const stmt = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
    const batch = [];
    
    for (const [key, value] of Object.entries(body)) {
      batch.push(stmt.bind(key, String(value)));
    }
    
    if (batch.length > 0) {
      await db.batch(batch);
    }

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
