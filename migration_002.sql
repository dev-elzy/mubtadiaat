-- Migration: Add pesan table for contact inbox submissions
-- Date: 2026-07-10

CREATE TABLE IF NOT EXISTS pesan (
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
