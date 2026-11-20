-- ============================================================
-- MIGRATION: per-couple manage token
-- Run this on Supabase (SQL Editor) BEFORE / together with the auth changes.
-- Safe to run multiple times.
-- ============================================================

-- SHA-256 hash (hex) of the secret manage token. NULL = legacy couple with no
-- token yet (admin can generate one from the admin panel -> "Link quản lý").
ALTER TABLE couples
  ADD COLUMN IF NOT EXISTS manage_token_hash text;

CREATE INDEX IF NOT EXISTS idx_couples_manage_token_hash
  ON couples (manage_token_hash);
