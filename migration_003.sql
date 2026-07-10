-- Migration: Add psb_pages table and PSB Settings for Dynamic Pendaftaran Santri Baru (PSB)
-- Date: 2026-07-10

CREATE TABLE IF NOT EXISTS psb_pages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT 'file',
  order_num INTEGER DEFAULT 0,
  is_default_home INTEGER DEFAULT 0,
  link_type TEXT DEFAULT 'page',
  external_url TEXT NULL,
  file_url TEXT NULL,
  content TEXT,
  status TEXT DEFAULT 'published',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_psb_pages_slug ON psb_pages(slug);
CREATE INDEX IF NOT EXISTS idx_psb_pages_order ON psb_pages(order_num ASC);

-- Insert PSB Settings into settings table
INSERT OR IGNORE INTO settings (key, value) VALUES ('psbPeriode', 'TA 1446 - 1447 H / 2025 - 2026 M');
INSERT OR IGNORE INTO settings (key, value) VALUES ('psbTitle', 'Penerimaan Santri Baru Online Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo');
INSERT OR IGNORE INTO settings (key, value) VALUES ('psbHeroDesc', 'Selamat datang di Portal Resmi Penerimaan Santri Baru Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo Kediri. Seluruh informasi pendaftaran, alur registrasi, dan pengumuman dikelola secara online.');
INSERT OR IGNORE INTO settings (key, value) VALUES ('psbFormUrl', 'http://bit.ly/hidayatul-mubtadiaat');
INSERT OR IGNORE INTO settings (key, value) VALUES ('psbPengumumanUrl', 'https://bit.ly/DaftarSantriBaruYangDiterima2025');
INSERT OR IGNORE INTO settings (key, value) VALUES ('psbWaPhone', '0856-1985-565');
INSERT OR IGNORE INTO settings (key, value) VALUES ('psbDriveUrl', 'https://sites.google.com/view/hidayatul-mubtadi-aat/');

-- Insert Default PSB Dynamic Menus
INSERT OR IGNORE INTO psb_pages (id, title, slug, icon, order_num, is_default_home, link_type, content, status) VALUES (
  'psb-1',
  'BERANDA',
  'beranda',
  'home',
  1,
  1,
  'page',
  '<div class="psb-home-content">
    <div style="background: #ffffff; border: 1px solid rgba(173,138,78,0.2); border-radius: 16px; padding: 28px; margin-bottom: 24px;">
      <h3 style="font-family: Fraunces, serif; color: var(--teal-900); font-size: 22px; margin: 0 0 12px 0;">Selamat Datang di Portal Penerimaan Santri Baru P3HM</h3>
      <p style="color: var(--ink-soft); font-size: 15px; line-height: 1.8; margin-bottom: 20px;">
        Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo membuka pendaftaran santri baru secara online. Silakan periksa informasi persyaratan, alur daftar ulang, dan unduh berkas panduan melalui menu di atas.
      </p>
    </div>
  </div>',
  'published'
);

INSERT OR IGNORE INTO psb_pages (id, title, slug, icon, order_num, is_default_home, link_type, external_url, content, status) VALUES (
  'psb-2',
  'PENDAFTARAN ONLINE',
  'pendaftaran-online',
  'book',
  2,
  0,
  'external',
  'http://bit.ly/hidayatul-mubtadiaat',
  '',
  'published'
);

INSERT OR IGNORE INTO psb_pages (id, title, slug, icon, order_num, is_default_home, link_type, content, status) VALUES (
  'psb-3',
  'INFORMASI PENDAFTARAN',
  'informasi-pendaftaran',
  'info',
  3,
  0,
  'page',
  '<div class="psb-page-content" style="background: #fff; border: 1px solid rgba(173,138,78,0.18); border-radius: 20px; padding: 36px;">
    <h2 style="font-family: Fraunces, serif; color: var(--teal-900); font-size: 26px; margin: 0 0 16px 0;">Informasi & Jadwal Pendaftaran</h2>
    <p style="color: var(--ink-soft); font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
      Informasi pembukaan pendaftaran, kuota penerimaan, jadwal ujian masuk, dan ketentuan administrasi santri baru Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo diatur melalui portal ini.
    </p>
  </div>',
  'published'
);

INSERT OR IGNORE INTO psb_pages (id, title, slug, icon, order_num, is_default_home, link_type, file_url, external_url, content, status) VALUES (
  'psb-4',
  'MATERI UJIAN & BROSUR',
  'materi-ujian-brosur',
  'folder',
  4,
  0,
  'download',
  '',
  'https://sites.google.com/view/hidayatul-mubtadi-aat/',
  '<div class="psb-page-content" style="background: #fff; border: 1px solid rgba(173,138,78,0.18); border-radius: 20px; padding: 36px;">
    <h2 style="font-family: Fraunces, serif; color: var(--teal-900); font-size: 26px; margin: 0 0 16px 0;">Materi Ujian & Unduhan Brosur</h2>
    <p style="color: var(--ink-soft); font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
      Unduh materi ujian seleksi masuk kelas diniyah dan brosur resmi pendaftaran santri baru P3HM Lirboyo.
    </p>
  </div>',
  'published'
);

INSERT OR IGNORE INTO psb_pages (id, title, slug, icon, order_num, is_default_home, link_type, external_url, content, status) VALUES (
  'psb-5',
  'WHATSAPP PANITIA',
  'whatsapp-panitia',
  'chat',
  5,
  0,
  'external',
  'https://wa.me/628561985565',
  '',
  'published'
);
