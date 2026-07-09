export const runtime = 'edge';

export async function GET(request) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const authenticated = cookieHeader.includes('p3hm_portal_session=authenticated');

  return Response.json({
    authenticated
  });
}
