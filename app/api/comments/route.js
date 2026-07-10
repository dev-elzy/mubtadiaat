import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getDb() {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  return ctx.env.DB;
}

function generateId() {
  return 'cmt-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
}

export async function GET(request) {
  try {
    const db = getDb();
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const contentId = url.searchParams.get('id');

    if (!type || !contentId) {
      return Response.json({ error: 'Missing type or id' }, { status: 400 });
    }

    // Get comments
    const { results: comments } = await db.prepare(
      'SELECT * FROM comments WHERE content_type = ? AND content_id = ? ORDER BY created_at DESC'
    ).bind(type, contentId).all();

    // Get replies for all comments
    const commentIds = (comments || []).map(c => c.id);
    let replies = [];
    if (commentIds.length > 0) {
      const placeholders = commentIds.map(() => '?').join(',');
      const { results: replyResults } = await db.prepare(
        `SELECT * FROM comment_replies WHERE comment_id IN (${placeholders}) ORDER BY created_at ASC`
      ).bind(...commentIds).all();
      replies = replyResults || [];
    }

    // Attach replies to their parent comments
    const commentsWithReplies = (comments || []).map(c => ({
      ...c,
      replies: replies.filter(r => r.comment_id === c.id)
    }));

    return Response.json(commentsWithReplies);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { action } = body;

    if (action === 'reply') {
      // Add a reply to existing comment
      const { commentId, name, email, text } = body;
      if (!commentId || !name || !text) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
      }
      const id = generateId();
      await db.prepare(
        'INSERT INTO comment_replies (id, comment_id, name, email, body) VALUES (?, ?, ?, ?, ?)'
      ).bind(id, commentId, name.trim(), email?.trim() || null, text.trim()).run();

      return Response.json({ success: true, id });
    } else {
      // Add a new comment
      const { type, contentId, name, email, text } = body;
      if (!type || !contentId || !name || !text) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
      }
      const id = generateId();
      await db.prepare(
        'INSERT INTO comments (id, content_type, content_id, name, email, body) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(id, type, contentId, name.trim(), email?.trim() || null, text.trim()).run();

      return Response.json({ success: true, id });
    }
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
