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
    const { results } = await db.prepare("SELECT * FROM galeri ORDER BY created_at DESC").all();
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
      await db.prepare("DELETE FROM galeri WHERE id = ?").bind(body.id).run();
      return Response.json({ success: true });
    }

    const { id, title, caption, status, scheduledAt, image, cloudinaryId, date } = body;

    const { results } = await db.prepare("SELECT id FROM galeri WHERE id = ?").bind(id).all();
    
    if (results.length > 0) {
      await db.prepare(`
        UPDATE galeri 
        SET title=?, caption=?, status=?, scheduled_at=?, image=?, cloudinary_id=?, date=? 
        WHERE id=?
      `).bind(title, caption, status, scheduledAt || null, image, cloudinaryId, date, id).run();
    } else {
      await db.prepare(`
        INSERT INTO galeri (id, title, caption, status, scheduled_at, image, cloudinary_id, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(id, title, caption, status, scheduledAt || null, image, cloudinaryId, date).run();
    }

    return Response.json({ success: true, id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
