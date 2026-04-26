-- ============================================
-- MIGRATION: Thêm bảng Hộp Mừng Cưới riêng biệt
-- ============================================
-- Chạy trong Supabase SQL Editor

-- 1. (Tùy chọn) Xóa các cột cũ nếu đã trót tạo trên bảng couples
ALTER TABLE couples DROP COLUMN IF EXISTS gift_enabled;
ALTER TABLE couples DROP COLUMN IF EXISTS groom_bank_name;
ALTER TABLE couples DROP COLUMN IF EXISTS groom_bank_holder;
ALTER TABLE couples DROP COLUMN IF EXISTS groom_bank_account;
ALTER TABLE couples DROP COLUMN IF EXISTS groom_bank_qr;
ALTER TABLE couples DROP COLUMN IF EXISTS bride_bank_name;
ALTER TABLE couples DROP COLUMN IF EXISTS bride_bank_holder;
ALTER TABLE couples DROP COLUMN IF EXISTS bride_bank_account;
ALTER TABLE couples DROP COLUMN IF EXISTS bride_bank_qr;

-- 2. Tạo bảng wedding_gifts riêng
CREATE TABLE IF NOT EXISTS wedding_gifts (
  id BIGSERIAL PRIMARY KEY,
  couple_id BIGINT NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT FALSE,
  groom_bank_name VARCHAR(100),
  groom_bank_holder VARCHAR(100),
  groom_bank_account VARCHAR(50),
  groom_bank_qr TEXT,
  bride_bank_name VARCHAR(100),
  bride_bank_holder VARCHAR(100),
  bride_bank_account VARCHAR(50),
  bride_bank_qr TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(couple_id)
);

-- Bật RLS
ALTER TABLE wedding_gifts ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép ai cũng đọc được
CREATE POLICY "Allow public read-only access on wedding_gifts" 
ON wedding_gifts FOR SELECT USING (true);

-- Cho phép insert từ anon (nếu API public) hoặc service_role
CREATE POLICY "Allow insert on wedding_gifts"
ON wedding_gifts FOR INSERT WITH CHECK (true);

-- Kiểm tra
SELECT table_name FROM information_schema.tables WHERE table_name = 'wedding_gifts';
