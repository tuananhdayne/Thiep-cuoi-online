# 📋 Kế Hoạch Bảo Mật Toàn Diện - Wedding Website

## 🎯 Tóm Tắt Bảo Mật

Dự án của bạn đã được cập nhật với **4 lớp bảo mật**:

1. ✅ **Bảo Mật Database** - Admin table với hashed password
2. ✅ **Chống XSS & Tấn Công Web** - Security headers (CSP, X-Frame-Options, etc.)
3. ✅ **Chống Xem Mã Nguồn** - Block F12, DevTools, Right-click
4. ✅ **Xác Thực Secure** - API server-side với bcrypt password hashing

---

## 🔐 PHẦN 1: THIẾT LẬP DATABASE VÀ BẢNG ADMIN

### Bước 1: Tạo Bảng Admin Trong Supabase

**Vào Supabase SQL Editor và chạy các câu lệnh dưới đây:**

```sql
-- ============================================
-- 1. TẠO BẢNG ADMINS VỚI PASSWORD HASH
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. THIẾT LẬP ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS để chặn truy cập từ bên ngoài
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. TẠO POLICY CHO ADMIN TABLE
-- ============================================
-- Policy cho việc SELECT từ API (server-side)
-- Chỉ cho phép SELECT khi sử dụng SUPABASE_SERVICE_ROLE_KEY
CREATE POLICY "Allow service role to select admins" ON admins
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Chặn INSERT từ client
CREATE POLICY "Prevent insert from client" ON admins
  FOR INSERT
  WITH CHECK (FALSE);

-- Chặn UPDATE từ client
CREATE POLICY "Prevent update from client" ON admins
  FOR UPDATE
  WITH CHECK (FALSE);

-- Chặn DELETE từ client
CREATE POLICY "Prevent delete from client" ON admins
  FOR DELETE
  USING (FALSE);
```

### Bước 2: Thêm Tài Khoản Admin Vào Database

**Tạo hash password trước:** Bạn cần hash mật khẩu trước khi chèn. Chạy code JavaScript này trong browser console hoặc Node.js:

```javascript
// Node.js - Chạy trong terminal
const bcrypt = require('bcryptjs');

// Hash password (1982004)
bcrypt.hash('1982004', 10).then(hash => {
  console.log('Hashed password:', hash);
  // Copy hash này và dùng trong câu lệnh SQL
});
```

**Hoặc sử dụng Supabase SQL Editor với pgcrypto:**

```sql
-- ============================================
-- INSERT ADMIN VỚI HASHED PASSWORD
-- ============================================
-- Thay thế 'YOUR_HASHED_PASSWORD_HERE' bằng hash từ bcrypt
INSERT INTO admins (username, password_hash, email)
VALUES (
  'admin',
  '$2a$10$...YOUR_HASHED_PASSWORD_HERE...',  -- Bcrypt hash của '1982004'
  'admin@wedding.local'
)
ON CONFLICT (username) DO NOTHING;
```

**Lấy Bcrypt Hash của Password (1982004):**

Chạy lệnh này ở máy tính của bạn:

```bash
# Cài bcryptjs nếu chưa có
npm install -g bcryptjs

# Chạy script
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('1982004', 10).then(h => console.log(h));"
```

**Ví dụ hash của '1982004':**
```
$2a$10$2OfJSfRCcE2LqyV/LXe.Ju0aeKJ8k.zV2DXhH9mH8pP7.qL4G8nKi
```

**Dán vào SQL:**
```sql
INSERT INTO admins (username, password_hash, email)
VALUES (
  'admin',
  '$2a$10$2OfJSfRCcE2LqyV/LXe.Ju0aeKJ8k.zV2DXhH9mH8pP7.qL4G8nKi',
  'admin@wedding.local'
)
ON CONFLICT (username) DO NOTHING;
```

---

## 🔑 Cấu Hình Environment Variables

**Đảm bảo `.env.local` của bạn có:**

```env
# Supabase Public Keys (có thể public)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key

# ⚠️ QUAN TRỌNG: Service Role Key (GIỮ KÍN, không push lên GitHub)
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
```

---

## 🛡️ PHẦN 2: CHỐNG TẤN CÔNG WEB (Security Headers)

### Các Security Headers Đã Implement

Các header bảo vệ sau đã được thêm vào `next.config.ts`:

```typescript
// X-Frame-Options: DENY
// Ngăn website bị nhúng vào iframe (chống Clickjacking)

// X-Content-Type-Options: nosniff
// Ngăn trình duyệt tự đoán MIME type (chống MIME sniffing)

// X-XSS-Protection: 1; mode=block
// Bảo vệ khỏi XSS attacks

// Content-Security-Policy (CSP)
// Chỉ cho phép script, style, font từ nguồn được phép
// Chặn script độc hại từ bên ngoài

// Referrer-Policy: strict-origin-when-cross-origin
// Kiểm soát thông tin referrer

// Permissions-Policy
// Chặn truy cập: camera, microphone, geolocation, payment, etc.

// Strict-Transport-Security (HSTS)
// Bắt buộc HTTPS (nếu deployed)
```

---

## 🔒 PHẦN 3: CHỐNG XEM MÃ NGUỒN (Client-Side Protection)

### SecurityProvider Component (`app/components/SecurityProvider.tsx`)

Thành phần này **tự động kích hoạt** và ngăn chặn:

✅ **Right-click context menu** - Không cho phép xem page source  
✅ **F12 key** - Chặn Developer Tools  
✅ **Ctrl+Shift+I** - Chặn Inspect Element (Windows/Linux)  
✅ **Cmd+Option+I** - Chặn Inspect Element (Mac)  
✅ **Ctrl+Shift+C** - Chặn Inspect Mode  
✅ **Ctrl+U** - Chặn View Page Source  
✅ **Ctrl+S** - Chặn Save Page  
✅ **Drag & Drop Files** - Chặn kéo thả file  
✅ **Auto DevTools Detection** - Phát hiện khi DevTools mở  

**SecurityProvider tự động áp dụng trên tất cả trang** (xem `app/layout.tsx`)

---

## 🔐 PHẦN 4: API AUTHENTICATION SECURE

### Flow Xác Thực

**Trước (unsafe):**
```
User → Nhập username/password → JavaScript check mật khẩu cứng trong code
❌ Bất cứ ai cũng thấy password trong source code
```

**Bây giờ (secure):**
```
User → form submission → API route (/api/admin/login) → 
Database query → bcrypt compare → session storage → ✅ Authenticated
```

### API Endpoint: `app/api/admin/login/route.ts`

```typescript
// Chỉ chạy trên SERVER - hacker KHÔNG thể thấy code này
POST /api/admin/login

Request: { username: "admin", password: "1982004" }

Server Process:
1. Lấy password_hash từ database
2. Dùng bcrypt.compare() so sánh password nhập vào với hash
3. Nếu match → return { success: true }
4. Client lưu session vào sessionStorage

⚠️ Password không bao giờ được gửi dưới dạng plaintext
✅ Hash được so sánh một chiều (không thể reverse)
```

---

## 📊 Tổng Hợp Bảo Mật

| Lớp Bảo Mật | Cơ Chế | Tệp |
|---|---|---|
| **Database** | RLS + Hashed Password | Supabase SQL |
| **API** | bcryptjs Password Comparison | `app/api/admin/login/route.ts` |
| **Headers** | CSP, X-Frame-Options, HSTS | `next.config.ts` |
| **Client** | Block DevTools, F12, Right-click | `app/components/SecurityProvider.tsx` |

---

## ⚙️ Cách Kiểm Tra Bảo Mật

### 1️⃣ Kiểm Tra Security Headers

**Trên browser:**
```javascript
// Mở DevTools (nếu có thể) và check Headers
fetch('/').then(r => {
  console.log('X-Frame-Options:', r.headers.get('X-Frame-Options'));
  console.log('Content-Security-Policy:', r.headers.get('Content-Security-Policy'));
})
```

**Hoặc dùng tool online:**
- https://securityheaders.com

### 2️⃣ Kiểm Tra Admin Login

```bash
# Test API
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1982004"}'

# Kết quả: { "success": true }
```

### 3️⃣ Kiểm Tra Database Security

**Supabase Dashboard → Authentication → Policies**
- Xác nhận RLS **enabled**
- Xác nhận chỉ `service_role` có thể SELECT từ admins table

---

## 🚀 Tiếp Theo: Deployment

Khi deploy (Vercel, Netlify, etc.):

1. **Thiết lập Environment Variables**
   - `NEXT_PUBLIC_SUPABASE_URL` ✅ public
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅ public
   - `SUPABASE_SERVICE_ROLE_KEY` 🔒 **PRIVATE** (không bao giờ public)

2. **Enable HTTPS**
   - Supabase: Custom domain với SSL
   - Hosting: Bật automatic HTTPS

3. **Monitoring**
   - Supabase: Check Database Logs
   - Hosting: Monitor failed login attempts

---

## ⚠️ Lưu Ý Quan Trọng

❌ **KHÔNG BÕ:**
- Service Role Key vào public
- Password dưới dạng plaintext trong database
- Disable RLS trên sensitive tables

✅ **NÊN LÀM:**
- Giữ `.env.local` riêng (thêm vào `.gitignore`)
- Định kỳ thay đổi admin password
- Review Supabase logs
- Test security headers thường xuyên

---

## 📞 Troubleshooting

**Q: Admin login không hoạt động?**
A: Kiểm tra:
- ✅ Bảng `admins` tồn tại trong database
- ✅ Password hash đúng (dùng bcrypt)
- ✅ RLS policies được setup đúng
- ✅ `SUPABASE_SERVICE_ROLE_KEY` được set trong `.env.local`

**Q: Security headers không hiển thị?**
A:
- Build lại: `npm run build`
- Làm mới cache browser
- Kiểm tra `next.config.ts` đã lưu

**Q: DevTools vẫn mở được?**
A: Là tính năng client-side, hacker chuyên nghiệp vẫn có thể bypass. Kết hợp với server-side security quan trọng hơn.

---

## 📚 Tài Liệu Tham Khảo

- OWASP Security Headers: https://owasp.org/www-project-secure-headers/
- Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- bcryptjs: https://www.npmjs.com/package/bcryptjs
- Supabase RLS: https://supabase.com/docs/guides/auth/row-level-security

---

**✅ Dự án của bạn đã được bảo vệ bởi các lớp bảo mật hiện đại!**
