import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getDb() {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  return ctx.env.DB;
}

const FALLBACK_CATEGORIES = [
  { id: 'cat-1', name: 'Pendidikan', type: 'berita' },
  { id: 'cat-2', name: 'Kegiatan Santri', type: 'berita' },
  { id: 'cat-3', name: 'Pengumuman', type: 'berita' },
  { id: 'cat-4', name: 'Kitab Salaf', type: 'berita' },
  { id: 'cat-5', name: 'Kajian Rutin', type: 'berita' },
  { id: 'cat-g1', name: 'Kegiatan Pondok', type: 'galeri' },
  { id: 'cat-g2', name: 'Fasilitas & Lingkungan', type: 'galeri' },
  { id: 'cat-g3', name: 'Haul & Peringatan', type: 'galeri' }
];

export async function GET() {
  try {
    const db = getDb();
    const { results } = await db.prepare("SELECT * FROM categories ORDER BY name ASC").all();
    return Response.json(results && results.length > 0 ? results : FALLBACK_CATEGORIES);
  } catch (e) {
    return Response.json(FALLBACK_CATEGORIES);
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();

    if (body.action === 'delete') {
      await db.prepare("DELETE FROM categories WHERE id = ?").bind(body.id).run();
      return Response.json({ success: true });
    }

    const id = body.id || `cat-${Date.now()}`;
    const name = body.name?.trim();
    const type = body.type || 'berita';

    if (!name) {
      return Response.json({ error: 'Nama kategori wajib diisi' }, { status: 400 });
    }

    // Cek apakah sudah ada
    const { results } = await db.prepare("SELECT id FROM categories WHERE id = ?").bind(id).all();
    if (results.length > 0) {
      await db.prepare("UPDATE categories SET name = ?, type = ? WHERE id = ?").bind(name, type, id).run();
    } else {
      await db.prepare("INSERT INTO categories (id, name, type) VALUES (?, ?, ?)").bind(id, name, type).run();
    }

    return Response.json({ success: true, id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
