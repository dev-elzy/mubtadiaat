export const runtime = 'edge';

export async function POST() {
  const headers = new Headers();
  headers.set('Set-Cookie', `p3hm_portal_session=; Path=/; Max-Age=0; SameSite=Lax`);
  headers.set('Content-Type', 'application/json');

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers
  });
}
