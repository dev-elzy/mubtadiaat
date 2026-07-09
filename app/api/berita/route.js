import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getDb() {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  return ctx.env.DB;
}

export async function GET() {
  try {
    const db = getDb();
    const { results } = await db.prepare("SELECT * FROM berita ORDER BY created_at DESC").all();
    return Response.json(results || []);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    
    if (body.action === 'delete') {
      await db.prepare("DELETE FROM berita WHERE id = ?").bind(body.id).run();
      return Response.json({ success: true });
    }

    const { id, title, slug, category, status, scheduledAt, author, date, image, cloudinaryId, summary, content } = body;

    // Check if exists
    const { results } = await db.prepare("SELECT id FROM berita WHERE id = ?").bind(id).all();
    
    if (results.length > 0) {
      await db.prepare(`
        UPDATE berita 
        SET title=?, slug=?, category=?, status=?, scheduled_at=?, author=?, date=?, image=?, cloudinary_id=?, summary=?, content=? 
        WHERE id=?
      `).bind(title, slug, category, status, scheduledAt || null, author, date, image, cloudinaryId, summary, content, id).run();
    } else {
      await db.prepare(`
        INSERT INTO berita (id, title, slug, category, status, scheduled_at, author, date, image, cloudinary_id, summary, content)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(id, title, slug, category, status, scheduledAt || null, author, date, image, cloudinaryId, summary, content).run();
    }

    return Response.json({ success: true, id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
