# Rollout bảo mật (Auth + RLS) — Runbook

Branch: `feature/auth-rls`. Các thay đổi code đã deploy được **mà không khóa RLS**
(server route fallback về anon key khi chưa có service_role). Khóa RLS là bước cuối,
làm theo đúng thứ tự dưới đây để không sập site.

## Những gì đã làm trong code
- **Admin**: bỏ gate `sessionStorage`; đăng nhập cấp **cookie httpOnly có chữ ký HMAC**;
  list/xoá/đặt-hạn/tạo-link-quản-lý đều qua server route xác thực cookie + service_role.
- **Manage** (`/[slug]/manage`): chặn bằng **manage token bí mật** (không còn ai có
  slug cũng vào được). Trang đọc dữ liệu riêng tư (guests/rsvp) bằng service_role.
  Mọi thao tác ghi (sửa info, địa điểm, khách mời, gallery, nhạc) qua server route
  xác thực token.
- **Create**: sinh manage token, lưu hash, hiện link quản lý 1 lần cho người tạo.
- **Upload ảnh**: chặn path traversal + yêu cầu quyền (admin/manager) nếu thiệp đã tồn tại.
- SQL: `migration-manage-token.sql`, `migration-rls-lockdown.sql`.

## Thứ tự triển khai (QUAN TRỌNG)

1. **Đặt biến môi trường trên Vercel** (Production + Preview):
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key thật (Supabase → Settings → API).
   - `ADMIN_SESSION_SECRET` = chuỗi ngẫu nhiên dài
     (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).

2. **Chạy `migration-manage-token.sql`** trên Supabase SQL Editor (thêm cột token).

3. **Merge branch này vào `main`** (deploy code).

4. **Test** (xem phần dưới). Nếu OK:

5. **Tạo link quản lý cho các thiệp CŨ**: vào `/admin` → mỗi thiệp bấm **"Link quản lý"**
   → gửi link cho chủ thiệp. (Thiệp cũ chưa có token vẫn vào quản lý được tạm thời cho
   tới khi bước 6 chạy — xem cảnh báo trong code.)

6. **Chạy `migration-rls-lockdown.sql`** trên Supabase SQL Editor (khóa RLS).
   ⚠️ Chỉ chạy sau khi bước 1 (service_role key) đã xong và code đã deploy.

## Test sau khi deploy
- [ ] Thiệp công khai `/<slug>` hiển thị bình thường.
- [ ] Link khách `/<slug>/<guest>` cá nhân hoá đúng.
- [ ] Khách gửi lời chúc / RSVP được.
- [ ] `/admin`: không vào được nếu không đăng nhập; mở DevTools đặt cookie giả → vẫn bị chặn.
- [ ] `/admin`: đăng nhập đúng mật khẩu mới → thấy danh sách; xoá/đặt hạn/tạo link chạy.
- [ ] `/<slug>/manage` KHÔNG mở được nếu thiếu `?token` đúng (sau khi thiệp có token).
- [ ] `/<slug>/manage?token=<đúng>` mở được, sửa info / thêm khách / gallery chạy.
- [ ] Sau khi khóa RLS: thử gọi trực tiếp REST API bằng anon key để UPDATE/DELETE → **bị chặn**.

## Rollback
- Gỡ khóa RLS: mở lại policy (hoặc `ALTER TABLE ... DISABLE ROW LEVEL SECURITY`) nếu cần khẩn.
- Code: revert merge commit.
