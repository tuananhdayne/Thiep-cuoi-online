CREATE TABLE IF NOT EXISTS stories (
  id BIGSERIAL PRIMARY KEY,
  couple_id BIGINT NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  story_date DATE,
  description TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS stories_couple_id_idx ON stories(couple_id);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view wedding stories" ON stories;
CREATE POLICY "Public can view wedding stories"
  ON stories FOR SELECT
  USING (TRUE);

ALTER TABLE rsvp
  ADD COLUMN IF NOT EXISTS message TEXT;
