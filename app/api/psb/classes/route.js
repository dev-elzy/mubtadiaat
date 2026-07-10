import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const DEFAULT_PSB_CLASSES = [
  {
    id: 'class-1',
    title: 'MADRASAH IBTIDAIYAH (KELAS I)',
    materi_ujian: "CTBQ An-Nahdliyah\nIlmu Tauhid Dasar\nHidayatul Mubtadi' I\nFasholatan & Doa Harian\nIlmu Akhlaq I\nPegon & Menulis Arab\nBahasa Indonesia",
    kurikulum: "Al-Qur'an & Tajwid Praktis\nTauhid (Aqidatul Awam)\nFiqih Dasar (Safinatun Naja)\nHafalan Juz 'Amma\nBahasa Arab Dasar",
    status_note: '',
    daftar_url: 'http://bit.ly/hidayatul-mubtadiaat',
    order_num: 1
  },
  {
    id: 'class-2',
    title: 'MADRASAH IBTIDAIYAH (KELAS II)',
    materi_ujian: "KELAS II IBTIDAIYAH TANPA UJIAN\n(Seleksi Berkas & Evaluasi Rapot Sebelumnya)",
    kurikulum: "Fiqih Wanita & Risalatul Mahid\nNahwu Dasar (Jurumiyah)\nShorof (Amtsilah Tasrifiyah)\nTarikh & Sirah Nabawiyah\nAkhlaq Santriwati",
    status_note: '',
    daftar_url: 'http://bit.ly/hidayatul-mubtadiaat',
    order_num: 2
  },
  {
    id: 'class-3',
    title: 'MADRASAH TSANAWIYAH (KELAS I TS)',
    materi_ujian: "Ujian Baca Kitab Safinatun Naja & Jurumiyah\nTes Tajwid & Hafalan Al-Qur'an\nWawancara Keislaman & Akhlaq",
    kurikulum: "Fiqih Lanjutan (Fathul Qorib)\nNahwu Lanjutan (Imrithy)\nMustholah Hadits\nAkhlaq (Ta'lim Muta'allim)\nBahtsul Masail Dasar",
    status_note: '',
    daftar_url: 'http://bit.ly/hidayatul-mubtadiaat',
    order_num: 3
  },
  {
    id: 'class-4',
    title: 'MADRASAH ALIYAH (KELAS I MA)',
    materi_ujian: "Ujian Baca Kitab Fathul Qorib & Imrithy\nTes Kemampuan Bahasa Arab & Pegon\nTes Pemahaman Fiqih Wanita",
    kurikulum: "Ushul Fiqih (Al-Waraqat)\nNahwu Tingkat Atas (Alfiyah Ibnu Malik)\nTafsir & Ulumul Qur'an\nBahtsul Masail Putri Lanjutan",
    status_note: '',
    daftar_url: 'http://bit.ly/hidayatul-mubtadiaat',
    order_num: 4
  }
];

export async function GET() {
  try {
    const { env } = getRequestContext();
    if (!env?.DB) {
      return Response.json(DEFAULT_PSB_CLASSES);
    }

    // Pastikan tabel psb_classes tersedia
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS psb_classes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        materi_ujian TEXT,
        kurikulum TEXT,
        status_note TEXT,
        daftar_url TEXT,
        order_num INTEGER DEFAULT 1
      )
    `).run();

    const { results } = await env.DB.prepare(
      "SELECT * FROM psb_classes ORDER BY order_num ASC, title ASC"
    ).all();

    if (!results || results.length === 0) {
      return Response.json(DEFAULT_PSB_CLASSES);
    }

    return Response.json(results);
  } catch (err) {
    return Response.json(DEFAULT_PSB_CLASSES);
  }
}

export async function POST(req) {
  try {
    const { env } = getRequestContext();
    if (!env?.DB) {
      return Response.json({ error: 'Database DB not bound' }, { status: 500 });
    }

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS psb_classes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        materi_ujian TEXT,
        kurikulum TEXT,
        status_note TEXT,
        daftar_url TEXT,
        order_num INTEGER DEFAULT 1
      )
    `).run();

    const body = await req.json();

    if (body.action === 'delete') {
      await env.DB.prepare("DELETE FROM psb_classes WHERE id = ?").bind(body.id).run();
      return Response.json({ success: true });
    }

    const id = body.id || `class-${Date.now()}`;
    const title = body.title || 'Kelas P3HM';
    const materi_ujian = body.materi_ujian || '';
    const kurikulum = body.kurikulum || '';
    const status_note = body.status_note || '';
    const daftar_url = body.daftar_url || '';
    const order_num = parseInt(body.order_num || 1, 10);

    await env.DB.prepare(`
      INSERT INTO psb_classes (id, title, materi_ujian, kurikulum, status_note, daftar_url, order_num)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title=excluded.title,
        materi_ujian=excluded.materi_ujian,
        kurikulum=excluded.kurikulum,
        status_note=excluded.status_note,
        daftar_url=excluded.daftar_url,
        order_num=excluded.order_num
    `).bind(id, title, materi_ujian, kurikulum, status_note, daftar_url, order_num).run();

    return Response.json({ success: true, id });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
