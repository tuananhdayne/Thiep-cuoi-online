-- ============================================
-- MIGRATION: Thêm tính năng Hộp Mừng Cưới
-- ============================================
-- Chạy trong Supabase SQL Editor

-- Thêm cột vào bảng couples
ALTER TABLE couples ADD COLUMN IF NOT EXISTS gift_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE couples ADD COLUMN IF NOT EXISTS groom_bank_name VARCHAR(100);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS groom_bank_holder VARCHAR(100);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS groom_bank_account VARCHAR(50);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS groom_bank_qr TEXT;
ALTER TABLE couples ADD COLUMN IF NOT EXISTS bride_bank_name VARCHAR(100);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS bride_bank_holder VARCHAR(100);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS bride_bank_account VARCHAR(50);
ALTER TABLE couples ADD COLUMN IF NOT EXISTS bride_bank_qr TEXT;

-- Kiểm tra
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'couples' AND column_name LIKE '%bank%' OR column_name = 'gift_enabled';
