import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getDb() {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  return ctx.env.DB;
}

// Simple hash function for visitor deduplication
async function hashVisitor(request) {
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
  const ua = request.headers.get('user-agent') || 'unknown';
  const raw = `${ip}::${ua}`;
  const buffer = new TextEncoder().encode(raw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
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

    const { results } = await db.prepare(
      'SELECT COUNT(*) as count FROM page_views WHERE content_type = ? AND content_id = ?'
    ).bind(type, contentId).all();

    return Response.json({ count: results[0]?.count || 0 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { type, contentId } = body;

    if (!type || !contentId) {
      return Response.json({ error: 'Missing type or contentId' }, { status: 400 });
    }

    const visitorHash = await hashVisitor(request);

    // Check if this visitor already viewed this content (deduplicate per session ~ 24h)
    const { results: existing } = await db.prepare(
      `SELECT id FROM page_views 
       WHERE content_type = ? AND content_id = ? AND visitor_hash = ? 
       AND created_at > datetime('now', '-24 hours')`
    ).bind(type, contentId, visitorHash).all();

    if (existing.length === 0) {
      await db.prepare(
        'INSERT INTO page_views (content_type, content_id, visitor_hash) VALUES (?, ?, ?)'
      ).bind(type, contentId, visitorHash).run();
    }

    // Return updated count
    const { results: countResult } = await db.prepare(
      'SELECT COUNT(*) as count FROM page_views WHERE content_type = ? AND content_id = ?'
    ).bind(type, contentId).all();

    return Response.json({ count: countResult[0]?.count || 0 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
