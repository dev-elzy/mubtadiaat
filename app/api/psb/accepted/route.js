import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const DEFAULT_ACCEPTED_SANTRI = [
  {
    id: 'santri-1',
    no_reg: 'REG-2026-001',
    nama_lengkap: 'Aisyah Az-Zahra Putri',
    kecamatan: 'Mojoroto',
    kabupaten: 'Kota Kediri',
    nama_wali: 'H. Ahmad Fauzi',
    confirm_status: 1
  },
  {
    id: 'santri-2',
    no_reg: 'REG-2026-002',
    nama_lengkap: 'Fatimah Nabila Syahputri',
    kecamatan: 'Kertosono',
    kabupaten: 'Nganjuk',
    nama_wali: 'Hj. Maimunah',
    confirm_status: 1
  },
  {
    id: 'santri-3',
    no_reg: 'REG-2026-003',
    nama_lengkap: 'Zahra Nurul Qolbi',
    kecamatan: 'Pare',
    kabupaten: 'Kediri',
    nama_wali: 'Ustadz Abdullah',
    confirm_status: 0
  }
];

export async function GET() {
  try {
    const { env } = getRequestContext();
    if (!env?.DB) {
      return Response.json({
        santriList: DEFAULT_ACCEPTED_SANTRI,
        waInstansi: '628561985565'
      });
    }

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS psb_accepted_santri (
        id TEXT PRIMARY KEY,
        no_reg TEXT UNIQUE NOT NULL,
        nama_lengkap TEXT NOT NULL,
        kecamatan TEXT NOT NULL,
        kabupaten TEXT NOT NULL,
        nama_wali TEXT NOT NULL,
        confirm_status INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `).run();

    const { results } = await env.DB.prepare(
      "SELECT * FROM psb_accepted_santri ORDER BY no_reg ASC"
    ).all();

    const waRow = await env.DB.prepare(
      "SELECT value FROM site_settings WHERE key = 'psb_wa_instansi'"
    ).first();

    const waInstansi = waRow?.value || '628561985565';

    return Response.json({
      santriList: (!results || results.length === 0) ? DEFAULT_ACCEPTED_SANTRI : results,
      waInstansi
    });
  } catch (err) {
    return Response.json({
      santriList: DEFAULT_ACCEPTED_SANTRI,
      waInstansi: '628561985565'
    });
  }
}

export async function POST(req) {
  try {
    const { env } = getRequestContext();
    if (!env?.DB) {
      return Response.json({ error: 'Database DB not bound' }, { status: 500 });
    }

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS psb_accepted_santri (
        id TEXT PRIMARY KEY,
        no_reg TEXT UNIQUE NOT NULL,
        nama_lengkap TEXT NOT NULL,
        kecamatan TEXT NOT NULL,
        kabupaten TEXT NOT NULL,
        nama_wali TEXT NOT NULL,
        confirm_status INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    const body = await req.json();

    // 1. Simpan pengaturan WA Instansi
    if (body.action === 'save_wa') {
      await env.DB.prepare(`
        INSERT INTO site_settings (key, value) VALUES ('psb_wa_instansi', ?)
        ON CONFLICT(key) DO UPDATE SET value=excluded.value
      `).bind(body.waInstansi).run();
      return Response.json({ success: true });
    }

    // 2. Hapus santri
    if (body.action === 'delete') {
      await env.DB.prepare("DELETE FROM psb_accepted_santri WHERE id = ?").bind(body.id).run();
      return Response.json({ success: true });
    }

    // 3. Toggle Status Konfirmasi (Aktifkan / Non-Aktifkan)
    if (body.action === 'toggle_confirm') {
      await env.DB.prepare(
        "UPDATE psb_accepted_santri SET confirm_status = ? WHERE id = ?"
      ).bind(body.confirm_status, body.id).run();
      return Response.json({ success: true });
    }

    // 4. Bulk Import dari Excel / Array Rows
    if (body.action === 'bulk_import' && Array.isArray(body.rows)) {
      for (const row of body.rows) {
        const noReg = (row['No. Registrasi'] || row.no_reg || '').toString().trim();
        const namaLengkap = (row['Nama Lengkap'] || row.nama_lengkap || '').toString().trim();
        const kecamatan = (row['Kecamatan'] || row.kecamatan || '').toString().trim();
        const kabupaten = (row['Kabupaten'] || row.kabupaten || '').toString().trim();
        const namaWali = (row['Nama Wali'] || row.nama_wali || '').toString().trim();

        if (!noReg || !namaLengkap) continue;

        const id = `santri-${noReg.replace(/[^a-zA-Z0-9]/g, '')}`;
        await env.DB.prepare(`
          INSERT INTO psb_accepted_santri (id, no_reg, nama_lengkap, kecamatan, kabupaten, nama_wali, confirm_status)
          VALUES (?, ?, ?, ?, ?, ?, 1)
          ON CONFLICT(no_reg) DO UPDATE SET
            nama_lengkap=excluded.nama_lengkap,
            kecamatan=excluded.kecamatan,
            kabupaten=excluded.kabupaten,
            nama_wali=excluded.nama_wali
        `).bind(id, noReg, namaLengkap, kecamatan, kabupaten, namaWali).run();
      }
      return Response.json({ success: true, count: body.rows.length });
    }

    // 5. Tambah / Edit Santri Single
    const id = body.id || `santri-${Date.now()}`;
    const noReg = (body.no_reg || '').trim();
    const namaLengkap = (body.nama_lengkap || '').trim();
    const kecamatan = (body.kecamatan || '').trim();
    const kabupaten = (body.kabupaten || '').trim();
    const namaWali = (body.nama_wali || '').trim();
    const confirmStatus = body.confirm_status !== undefined ? parseInt(body.confirm_status, 10) : 1;

    await env.DB.prepare(`
      INSERT INTO psb_accepted_santri (id, no_reg, nama_lengkap, kecamatan, kabupaten, nama_wali, confirm_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(no_reg) DO UPDATE SET
        nama_lengkap=excluded.nama_lengkap,
        kecamatan=excluded.kecamatan,
        kabupaten=excluded.kabupaten,
        nama_wali=excluded.nama_wali,
        confirm_status=excluded.confirm_status
    `).bind(id, noReg, namaLengkap, kecamatan, kabupaten, namaWali, confirmStatus).run();

    return Response.json({ success: true, id });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
