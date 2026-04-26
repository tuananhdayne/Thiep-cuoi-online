-- 1. Xóa bảng locations cũ (nếu có)
DROP TABLE IF EXISTS locations CASCADE;

-- 2. Tạo lại bảng locations dạng 1-1 với couples, bê y nguyên các cột sang
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE UNIQUE,
    bride_event_title TEXT,
    bride_location TEXT,
    bride_address TEXT,
    bride_google_map_embed TEXT,
    bride_event_date DATE,
    bride_event_time TIME,
    groom_event_title TEXT,
    groom_location TEXT,
    groom_address TEXT,
    groom_google_map_embed TEXT,
    groom_event_date DATE,
    groom_event_time TIME
);

-- Bật RLS
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Tạo policies
CREATE POLICY "Cho phép tất cả mọi người đọc locations" ON locations
    FOR SELECT USING (true);

CREATE POLICY "Cho phép tất cả mọi người thêm locations" ON locations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Cho phép cập nhật locations" ON locations
    FOR UPDATE USING (true);

-- 3. Chuyển dữ liệu từ bảng couples sang bảng locations (1 dòng mỗi couple)
INSERT INTO locations (
    couple_id, 
    bride_event_title, bride_location, bride_address, bride_google_map_embed, bride_event_date, bride_event_time,
    groom_event_title, groom_location, groom_address, groom_google_map_embed, groom_event_date, groom_event_time
)
SELECT 
    id as couple_id,
    bride_event_title, bride_location, bride_address, bride_google_map_embed, bride_event_date, bride_event_time,
    groom_event_title, groom_location, groom_address, groom_google_map_embed, groom_event_date, groom_event_time
FROM couples
WHERE 
    bride_event_title IS NOT NULL OR bride_location IS NOT NULL OR bride_address IS NOT NULL OR
    groom_event_title IS NOT NULL OR groom_location IS NOT NULL OR groom_address IS NOT NULL;

-- 4. Xóa các cột đã chuyển trong bảng couples
ALTER TABLE couples 
DROP COLUMN IF EXISTS bride_event_title,
DROP COLUMN IF EXISTS bride_location,
DROP COLUMN IF EXISTS bride_address,
DROP COLUMN IF EXISTS bride_google_map_embed,
DROP COLUMN IF EXISTS bride_event_date,
DROP COLUMN IF EXISTS bride_event_time,
DROP COLUMN IF EXISTS groom_event_title,
DROP COLUMN IF EXISTS groom_location,
DROP COLUMN IF EXISTS groom_address,
DROP COLUMN IF EXISTS groom_google_map_embed,
DROP COLUMN IF EXISTS groom_event_date,
DROP COLUMN IF EXISTS groom_event_time;
