import { getRequestContext } from '@cloudflare/next-on-pages';

function getDb() {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) {
    throw new Error("Database binding 'DB' not found. Ensure it is configured in wrangler.jsonc and you are running via wrangler pages dev.");
  }
  return ctx.env.DB;
}

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

export async function getSettings() {
  try {
    const db = getDb();
    const { results } = await db.prepare('SELECT * FROM settings').all();
    const settings = { ...DEFAULT_SETTINGS };
    if (Array.isArray(results)) {
      results.forEach(row => {
        settings[row.key] = row.value;
      });
    }
    return settings;
  } catch (e) {
    console.error("Database getSettings error:", e);
    return DEFAULT_SETTINGS;
  }
}

export async function getPublishedBerita() {
  try {
    const db = getDb();
    const nowIso = new Date().toISOString();
    // Otomatis menayangkan berita dengan status published ATAU status scheduled yang waktu tayangnya sudah lewat/tercapai
    const { results } = await db.prepare(`
      SELECT * FROM berita 
      WHERE status = 'published' 
         OR (status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= ?)
      ORDER BY created_at DESC
    `).bind(nowIso).all();
    return results || [];
  } catch (e) {
    console.error("Database getPublishedBerita error:", e);
    return [];
  }
}

export async function getPublishedGaleri() {
  try {
    const db = getDb();
    const nowIso = new Date().toISOString();
    // Otomatis menayangkan galeri dengan status published ATAU status scheduled yang waktu tayangnya sudah lewat/tercapai
    const { results } = await db.prepare(`
      SELECT * FROM galeri 
      WHERE status = 'published' 
         OR (status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= ?)
      ORDER BY created_at DESC
    `).bind(nowIso).all();
    return results || [];
  } catch (e) {
    console.error("Database getPublishedGaleri error:", e);
    return [];
  }
}

export async function getCategories() {
  try {
    const db = getDb();
    const { results } = await db.prepare("SELECT * FROM categories ORDER BY name ASC").all();
    return results || [];
  } catch (e) {
    console.error("Database getCategories error:", e);
    return [];
  }
}

export async function verifyAdminCredentials(username, password) {
  try {
    const db = getDb();
    const { results } = await db.prepare("SELECT * FROM admins WHERE username = ? AND password = ?").bind(username, password).all();
    if (results && results.length > 0) {
      return { success: true, admin: results[0] };
    }
    return { success: false, error: "Username atau password salah" };
  } catch (e) {
    // Fallback verification jika tabel admins belum sempat ter-seed di local development
    if (username === 'admin.portalp3hm' && password === "p3h_mubtadi'aat") {
      return { success: true, admin: { username: 'admin.portalp3hm', role: 'superadmin' } };
    }
    return { success: false, error: "Username atau password salah" };
  }
}
