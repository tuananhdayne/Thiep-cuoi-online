-- ============================================
-- SQL SETUP FOR ADMIN TABLE WITH SECURITY
-- ============================================
-- Lưu ý: File migration-gift-box.sql chứa ALTER TABLE để thêm cột
-- gift box vào bảng couples (nếu bảng couples đã tồn tại).
-- Sao chép và chạy trong Supabase SQL Editor

-- ============================================
-- 1. TẠO BẢNG ADMINS
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. THIẾT LẬP ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. TẠO SECURITY POLICIES
-- ============================================

-- Policy cho việc SELECT (chỉ service_role có thể)
DROP POLICY IF EXISTS "Allow service role to select admins" ON admins;
CREATE POLICY "Allow service role to select admins" ON admins
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Policy chặn INSERT từ client
DROP POLICY IF EXISTS "Prevent insert from client" ON admins;
CREATE POLICY "Prevent insert from client" ON admins
  FOR INSERT
  WITH CHECK (FALSE);

-- Policy chặn UPDATE từ client
DROP POLICY IF EXISTS "Prevent update from client" ON admins;
CREATE POLICY "Prevent update from client" ON admins
  FOR UPDATE
  WITH CHECK (FALSE);

-- Policy chặn DELETE từ client
DROP POLICY IF EXISTS "Prevent delete from client" ON admins;
CREATE POLICY "Prevent delete from client" ON admins
  FOR DELETE
  USING (FALSE);

-- ============================================
-- 4. HÀNG ĐỦU TIÊN - ADMIN TÀI KHOẢN
-- ============================================
-- ⚠️ THAY THẾ: '$2a$10$YOUR_BCRYPT_HASH_HERE' bằng Bcrypt hash của password

-- Hash của "1982004" (copy paste từ server):
-- $2a$10$2OfJSfRCcE2LqyV/LXe.Ju0aeKJ8k.zV2DXhH9mH8pP7.qL4G8nKi

INSERT INTO admins (username, password_hash, email)
VALUES (
  'admin',
  '$2b$10$wwVbGpkLTCXVL5BYVo0shuxUVO.8xvJigz.HWxEnwlcTnKhifOjHu',
  'tuananhnguyendinh198@gmail.com'
)
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- 5. KIỂM TRA LẠI
-- ============================================
-- Chạy để xác nhận bảng được tạo
SELECT * FROM admins;

-- Kiểm tra RLS policies
SELECT schemaname, tablename, policyname FROM pg_policies 
WHERE tablename = 'admins';

-- ============================================
-- 6. HƯỚNG DẪN RESET PASSWORD
-- ============================================
-- Nếu cần thay đổi password admin, thực hiện:

-- Bước 1: Tạo hash password mới bằng Node.js
-- const bcrypt = require('bcryptjs');
-- bcrypt.hash('new_password', 10).then(h => console.log(h));

-- Bước 2: Cập nhật bảng (thay thế NEW_HASH_HERE)
-- UPDATE admins 
-- SET password_hash = '$2a$10$NEW_HASH_HERE', 
--     updated_at = NOW() 
-- WHERE username = 'admin';
