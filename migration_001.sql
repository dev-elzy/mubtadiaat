-- Migration: Add page_views, comments, comment_replies tables
-- Also add author and category columns to galeri table
-- Date: 2026-07-10

-- Views counter
CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  visitor_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_views_content ON page_views(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_views_unique ON page_views(content_type, content_id, visitor_hash);

-- Comments
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_comments_content ON comments(content_type, content_id);

-- Comment replies
CREATE TABLE IF NOT EXISTS comment_replies (
  id TEXT PRIMARY KEY,
  comment_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_replies_comment ON comment_replies(comment_id);

-- Add author and category columns to galeri (safe ALTER — will fail silently if already exists)
-- SQLite doesn't support IF NOT EXISTS for ALTER TABLE, so we catch errors individually
