import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const DEFAULT_SETTINGS = {
  heroEyebrow: "Lirboyo · Kota Kediri · Jawa Timur",
  heroArabic: "مَعْهَدْ لِلْبَنَاتْ هِدَايَةُ الْمُبْتَدِئَاتْ",
  heroTitleHtml: 'Menempa Muslimah <em>Sejati</em>,<br>Berakar pada Kitab Salaf',
  heroSub: "Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati dengan keilmuan agama yang mendalam dan kesiapan menjawab kebutuhan masyarakat — di bawah naungan Yayasan Hidayatul Mubtadiat, Lirboyo Kediri.",
  daftarUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform",
  portalWaliUrl: "https://m.p3hm.my.id/",
  phoneWa: "0856-1985-565",
  instagramHandle: "@p3hmlirboyo",
  address: "Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur",
  profilSingkat: "Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo merupakan institusi pendidikan Islam yang mencetak santriwati berkarakter salaf, berilmu mendalam, dan berakhlak mulia.",
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
