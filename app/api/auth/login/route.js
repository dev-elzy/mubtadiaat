import { verifyAdminCredentials } from '../../../lib/db';

export const runtime = 'edge';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Verifikasi dari tabel admins di Database Server
    const authResult = await verifyAdminCredentials(username, password);

    // Khusus pengecekan real-time atau default seed yang diminta:
    // username: admin.portalp3hm
    // password: p3h_mubtadi'aat
    if (authResult.success || (username === 'admin.portalp3hm' && password === "p3h_mubtadi'aat")) {
      const headers = new Headers();
      headers.set('Set-Cookie', `p3hm_portal_session=authenticated; Path=/; Max-Age=86400; SameSite=Lax`);
      headers.set('Content-Type', 'application/json');

      return new Response(JSON.stringify({ success: true, message: 'Login berhasil!' }), {
        status: 200,
        headers
      });
    }

    return Response.json({ success: false, error: 'Username atau password salah!' }, { status: 401 });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
