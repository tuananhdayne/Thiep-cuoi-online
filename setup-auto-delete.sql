-- 1. Thêm cột expires_at vào bảng couples (nếu chưa có)
ALTER TABLE couples ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

-- 2. Bật extension pg_cron (Extension mạnh mẽ của Postgres để chạy các tác vụ theo lịch trình)
-- Lưu ý: Supabase hỗ trợ sẵn pg_cron cho tất cả các dự án.
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- (Bỏ qua bước xóa job cũ vì gây lỗi ở lần chạy đầu tiên)

-- 4. Lên lịch chạy tự động xóa thiệp hết hạn vào lúc nửa đêm (00:00) mỗi ngày
-- Nhờ tính năng ON DELETE CASCADE ở các bảng liên quan (locations, gallery, wedding_gifts...), 
-- khi xóa couple, toàn bộ ảnh và dữ liệu của couple đó cũng sẽ tự động biến mất theo!
SELECT cron.schedule(
    'delete-expired-couples', -- Tên tác vụ
    '0 0 * * *',              -- Chạy vào 00:00 mỗi ngày (theo múi giờ của server)
    $$ 
        DELETE FROM couples 
        WHERE expires_at IS NOT NULL AND expires_at < NOW();
    $$
);

-- =========================================================================
-- LỜI KHUYÊN DÀNH CHO ADMIN:
-- Nếu muốn kiểm tra xem có bao nhiêu thiệp đang sắp hết hạn, bạn có thể chạy:
-- SELECT id, slug, expires_at FROM couples WHERE expires_at IS NOT NULL ORDER BY expires_at ASC;
-- =========================================================================
