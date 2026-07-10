import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const DEFAULT_PSB_PAGES = [
  {
    id: 'psb-1',
    title: 'BERANDA',
    slug: 'beranda',
    icon: 'home',
    order_num: 1,
    is_default_home: 1,
    link_type: 'page',
    status: 'published',
    content: `<div class="psb-home-content">
      <div style="background: #ffffff; border: 1px solid rgba(173,138,78,0.2); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
        <h3 style="font-family: Fraunces, serif; color: var(--teal-900); font-size: 24px; margin: 0 0 12px 0;">Selamat Datang di Portal Penerimaan Santri Baru P3HM</h3>
        <p style="color: var(--ink-soft); font-size: 15px; line-height: 1.8; margin-bottom: 20px;">
          Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo membuka pendaftaran santri baru secara online. Seluruh jadwal, kuota, persyaratan berkas fisik, dan alur pendaftaran dapat diperbarui secara dinamis melalui Portal Admin.
        </p>
      </div>
    </div>`
  },
  {
    id: 'psb-2',
    title: 'PENDAFTARAN ONLINE',
    slug: 'pendaftaran-online',
    icon: 'book',
    order_num: 2,
    is_default_home: 0,
    link_type: 'external',
    external_url: 'http://bit.ly/hidayatul-mubtadiaat',
    status: 'published'
  },
  {
    id: 'psb-3',
    title: 'INFORMASI PENDAFTARAN',
    slug: 'informasi-pendaftaran',
    icon: 'info',
    order_num: 3,
    is_default_home: 0,
    link_type: 'page',
    status: 'published',
    content: `<div class="psb-page-content" style="background: #fff; border: 1px solid rgba(173,138,78,0.18); border-radius: 20px; padding: 36px;">
      <h2 style="font-family: Fraunces, serif; color: var(--teal-900); font-size: 26px; margin: 0 0 16px 0;">Informasi Pendaftaran</h2>
      <p style="color: var(--ink-soft); font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
        Informasi seputar ketentuan pendaftaran dan jadwal seleksi masuk Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo.
      </p>
    </div>`
  },
  {
    id: 'psb-4',
    title: 'MATERI UJIAN & BROSUR',
    slug: 'materi-ujian-brosur',
    icon: 'folder',
    order_num: 4,
    is_default_home: 0,
    link_type: 'download',
    external_url: 'https://sites.google.com/view/hidayatul-mubtadi-aat/',
    content: `<div class="psb-page-content" style="background: #fff; border: 1px solid rgba(173,138,78,0.18); border-radius: 20px; padding: 36px;">
      <h2 style="font-family: Fraunces, serif; color: var(--teal-900); font-size: 26px; margin: 0 0 16px 0;">Materi Ujian & Unduhan Brosur</h2>
      <p style="color: var(--ink-soft); font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
        Silakan unduh materi ujian dan brosur resmi penerimaan santri baru P3HM Lirboyo.
      </p>
    </div>`,
    status: 'published'
  },
  {
    id: 'psb-5',
    title: 'WHATSAPP PANITIA',
    slug: 'whatsapp-panitia',
    icon: 'chat',
    order_num: 5,
    is_default_home: 0,
    link_type: 'external',
    external_url: 'https://wa.me/628561985565',
    status: 'published'
  }
];

function getDb() {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  return ctx.env.DB;
}

export async function GET() {
  try {
    const db = getDb();
    const { results } = await db.prepare("SELECT * FROM psb_pages ORDER BY order_num ASC, created_at ASC").all();
    if (!results || results.length === 0) {
      return Response.json(DEFAULT_PSB_PAGES);
    }
    return Response.json(results);
  } catch (e) {
    return Response.json(DEFAULT_PSB_PAGES);
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();

    if (body.action === 'delete') {
      await db.prepare("DELETE FROM psb_pages WHERE id = ?").bind(body.id).run();
      return Response.json({ success: true });
    }

    const { id, title, slug, icon, orderNum, isDefaultHome, linkType, externalUrl, fileUrl, content, status } = body;
    const finalOrderNum = typeof orderNum === 'number' ? orderNum : parseInt(orderNum || 0, 10);
    const finalIsDefaultHome = isDefaultHome ? 1 : 0;

    const { results } = await db.prepare("SELECT id FROM psb_pages WHERE id = ?").bind(id).all();

    if (results.length > 0) {
      await db.prepare(`
        UPDATE psb_pages
        SET title=?, slug=?, icon=?, order_num=?, is_default_home=?, link_type=?, external_url=?, file_url=?, content=?, status=?, updated_at=CURRENT_TIMESTAMP
        WHERE id=?
      `).bind(
        title,
        slug,
        icon || 'file',
        finalOrderNum,
        finalIsDefaultHome,
        linkType || 'page',
        externalUrl || null,
        fileUrl || null,
        content || '',
        status || 'published',
        id
      ).run();
    } else {
      await db.prepare(`
        INSERT INTO psb_pages (id, title, slug, icon, order_num, is_default_home, link_type, external_url, file_url, content, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        id,
        title,
        slug,
        icon || 'file',
        finalOrderNum,
        finalIsDefaultHome,
        linkType || 'page',
        externalUrl || null,
        fileUrl || null,
        content || '',
        status || 'published'
      ).run();
    }

    return Response.json({ success: true, id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
