DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (id, username, password, role)
VALUES ('admin-1', 'admin.portalp3hm', 'p3h_mubtadi''aat', 'superadmin');

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  type TEXT DEFAULT 'berita',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (id, name, type) VALUES ('cat-1', 'Pendidikan', 'berita');
INSERT INTO categories (id, name, type) VALUES ('cat-2', 'Kegiatan Santri', 'berita');
INSERT INTO categories (id, name, type) VALUES ('cat-3', 'Pengumuman', 'berita');
INSERT INTO categories (id, name, type) VALUES ('cat-4', 'Kitab Salaf', 'berita');
INSERT INTO categories (id, name, type) VALUES ('cat-5', 'Kajian Rutin', 'berita');
INSERT INTO categories (id, name, type) VALUES ('cat-g1', 'Kegiatan Pondok', 'galeri');
INSERT INTO categories (id, name, type) VALUES ('cat-g2', 'Fasilitas & Lingkungan', 'galeri');
INSERT INTO categories (id, name, type) VALUES ('cat-g3', 'Haul & Peringatan', 'galeri');

DROP TABLE IF EXISTS berita;
CREATE TABLE berita (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  status TEXT DEFAULT 'draft',
  scheduled_at TEXT NULL,
  author TEXT,
  date TEXT,
  image TEXT,
  cloudinary_id TEXT,
  summary TEXT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS galeri;
CREATE TABLE galeri (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT,
  status TEXT DEFAULT 'published',
  scheduled_at TEXT NULL,
  image TEXT,
  cloudinary_id TEXT,
  folder TEXT DEFAULT 'p3hm/galeri',
  date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS settings;
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

INSERT INTO settings (key, value) VALUES ('heroEyebrow', 'Lirboyo · Kota Kediri · Jawa Timur');
INSERT INTO settings (key, value) VALUES ('heroArabic', 'مَعْهَدْ لِلْبَنَاتْ هِدَايَةُ الْمُبْتَدِئَاتْ');
INSERT INTO settings (key, value) VALUES ('heroTitleHtml', 'Menempa Muslimah <em>Sejati</em>,<br>Berakar pada Kitab Salaf');
INSERT INTO settings (key, value) VALUES ('heroSub', 'Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati dengan keilmuan agama yang mendalam dan kesiapan menjawab kebutuhan masyarakat — di bawah naungan Yayasan Hidayatul Mubtadiat, Lirboyo Kediri.');
INSERT INTO settings (key, value) VALUES ('daftarUrl', 'https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform');
INSERT INTO settings (key, value) VALUES ('portalWaliUrl', 'https://m.p3hm.my.id/');
INSERT INTO settings (key, value) VALUES ('phoneWa', '0856-1985-565');
INSERT INTO settings (key, value) VALUES ('instagramHandle', '@p3hmlirboyo');
INSERT INTO settings (key, value) VALUES ('address', 'Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur');

-- ==========================================
-- VIEWS COUNTER (Real-time, Deduplicated)
-- ==========================================
DROP TABLE IF EXISTS page_views;
CREATE TABLE page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  visitor_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_views_content ON page_views(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_views_unique ON page_views(content_type, content_id, visitor_hash);

-- ==========================================
-- COMMENTS SYSTEM
-- ==========================================
DROP TABLE IF EXISTS comment_replies;
DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_comments_content ON comments(content_type, content_id);

CREATE TABLE comment_replies (
  id TEXT PRIMARY KEY,
  comment_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_replies_comment ON comment_replies(comment_id);

-- ==========================================
-- INBOX MESSAGES (Contact Form Submissions)
-- ==========================================
DROP TABLE IF EXISTS pesan;
CREATE TABLE pesan (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  reply_text TEXT DEFAULT NULL,
  replied_at TEXT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_pesan_created ON pesan(created_at DESC);
