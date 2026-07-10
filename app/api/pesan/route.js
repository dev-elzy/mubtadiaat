import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getDb() {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  return ctx.env.DB;
}

function generateId() {
  return 'msg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
}

// GET all messages (for Admin Panel)
export async function GET() {
  try {
    const db = getDb();
    const { results } = await db.prepare(
      "SELECT * FROM pesan ORDER BY created_at DESC"
    ).all();
    return Response.json(results || []);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// POST a new message (Public Contact Form)
export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = generateId();
    await db.prepare(
      `INSERT INTO pesan (id, name, email, subject, message, is_read) 
       VALUES (?, ?, ?, ?, ?, 0)`
    ).bind(id, name.trim(), email.trim(), subject.trim(), message.trim()).run();

    return Response.json({ success: true, id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// PATCH a message (Mark as read or Save admin reply)
export async function PATCH(request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { id, action, replyText } = body;

    if (!id) {
      return Response.json({ error: 'Missing message ID' }, { status: 400 });
    }

    if (action === 'reply') {
      const nowIso = new Date().toISOString();
      await db.prepare(
        `UPDATE pesan 
         SET reply_text = ?, replied_at = ?, is_read = 1 
         WHERE id = ?`
      ).bind(replyText.trim(), nowIso, id).run();
      return Response.json({ success: true });
    } else if (action === 'read') {
      await db.prepare(
        "UPDATE pesan SET is_read = 1 WHERE id = ?"
      ).bind(id).run();
      return Response.json({ success: true });
    } else if (action === 'delete') {
      await db.prepare(
        "DELETE FROM pesan WHERE id = ?"
      ).bind(id).run();
      return Response.json({ success: true });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
