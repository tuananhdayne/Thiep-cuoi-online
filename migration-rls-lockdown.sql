-- ============================================================
-- MIGRATION: RLS LOCKDOWN  (GĐ5)
--
-- ⚠️ DO NOT RUN THIS UNTIL:
--    1. SUPABASE_SERVICE_ROLE_KEY is set in the deployment env (Vercel), AND
--    2. The auth/RLS code (this branch) is deployed.
--
-- After this runs, the anon/publishable key can only:
--   • READ public invitation data (couples, wishes, gallery, gifts, locations, stories)
--   • INSERT public submissions (wishes, rsvp) and create a new wedding (couples,
--     locations, wedding_gifts, gallery at creation time)
-- It can NO LONGER update/delete anything, nor read private data (guests, rsvp).
-- All privileged operations go through server routes using the service_role key.
--
-- Supabase policies are permissive by default: a row is allowed if ANY policy
-- allows it. service_role BYPASSES RLS entirely, so server routes keep working.
-- Safe to run multiple times (drops policies first).
-- ============================================================

-- Helper: enable RLS + wipe existing policies on a table, then we re-create.
-- (Run the whole script; each table block is independent.)

------------------------------------------------------------------
-- couples : public READ + public INSERT (create). No anon UPDATE/DELETE.
------------------------------------------------------------------
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "couples_select_public"  ON couples;
DROP POLICY IF EXISTS "couples_insert_public"  ON couples;
DROP POLICY IF EXISTS "couples_anon_all"       ON couples;
DROP POLICY IF EXISTS "Enable read access for all users" ON couples;
DROP POLICY IF EXISTS "Enable insert for all users"      ON couples;
DROP POLICY IF EXISTS "Enable update for all users"      ON couples;
DROP POLICY IF EXISTS "Enable delete for all users"      ON couples;
CREATE POLICY "couples_select_public" ON couples FOR SELECT USING (true);
CREATE POLICY "couples_insert_public" ON couples FOR INSERT WITH CHECK (true);
-- (no UPDATE / DELETE policy => denied for anon; service_role bypasses RLS)

------------------------------------------------------------------
-- wedding_gifts : public READ + public INSERT (create). No anon UPDATE/DELETE.
-- Critical: stops anyone editing bank account / QR to redirect gift money.
------------------------------------------------------------------
ALTER TABLE wedding_gifts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gifts_select_public" ON wedding_gifts;
DROP POLICY IF EXISTS "gifts_insert_public" ON wedding_gifts;
CREATE POLICY "gifts_select_public" ON wedding_gifts FOR SELECT USING (true);
CREATE POLICY "gifts_insert_public" ON wedding_gifts FOR INSERT WITH CHECK (true);

------------------------------------------------------------------
-- locations : public READ + public INSERT (create). No anon UPDATE/DELETE.
------------------------------------------------------------------
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "locations_select_public" ON locations;
DROP POLICY IF EXISTS "locations_insert_public" ON locations;
DROP POLICY IF EXISTS "Allow public read access"   ON locations;
DROP POLICY IF EXISTS "Allow public insert access" ON locations;
DROP POLICY IF EXISTS "Allow public update access" ON locations;
CREATE POLICY "locations_select_public" ON locations FOR SELECT USING (true);
CREATE POLICY "locations_insert_public" ON locations FOR INSERT WITH CHECK (true);

------------------------------------------------------------------
-- gallery : public READ + public INSERT (create). No anon UPDATE/DELETE.
------------------------------------------------------------------
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_select_public" ON gallery;
DROP POLICY IF EXISTS "gallery_insert_public" ON gallery;
CREATE POLICY "gallery_select_public" ON gallery FOR SELECT USING (true);
CREATE POLICY "gallery_insert_public" ON gallery FOR INSERT WITH CHECK (true);

------------------------------------------------------------------
-- stories : public READ + public INSERT. No anon UPDATE/DELETE.
-- (Skip this block if you do not have a `stories` table.)
------------------------------------------------------------------
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "stories_select_public" ON stories;
DROP POLICY IF EXISTS "stories_insert_public" ON stories;
CREATE POLICY "stories_select_public" ON stories FOR SELECT USING (true);
CREATE POLICY "stories_insert_public" ON stories FOR INSERT WITH CHECK (true);

------------------------------------------------------------------
-- wishes : public READ (shown on invite) + public INSERT (guests). No UPDATE/DELETE.
------------------------------------------------------------------
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "wishes_select_public" ON wishes;
DROP POLICY IF EXISTS "wishes_insert_public" ON wishes;
CREATE POLICY "wishes_select_public" ON wishes FOR SELECT USING (true);
CREATE POLICY "wishes_insert_public" ON wishes FOR INSERT WITH CHECK (true);

------------------------------------------------------------------
-- rsvp : public INSERT (guests confirm). NO anon SELECT (private). No UPDATE/DELETE.
------------------------------------------------------------------
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "rsvp_insert_public" ON rsvp;
DROP POLICY IF EXISTS "rsvp_select_public" ON rsvp;
CREATE POLICY "rsvp_insert_public" ON rsvp FOR INSERT WITH CHECK (true);
-- (no SELECT policy => anon cannot read RSVPs; the manage page reads via service_role)

------------------------------------------------------------------
-- guests : FULLY PRIVATE. No anon access at all.
-- The manage page/routes read & write guests via the service_role key.
------------------------------------------------------------------
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "guests_select_public" ON guests;
DROP POLICY IF EXISTS "guests_insert_public" ON guests;
DROP POLICY IF EXISTS "Enable read access for all users"   ON guests;
DROP POLICY IF EXISTS "Enable insert for all users"        ON guests;
-- (no policies => anon fully denied; service_role bypasses RLS)

------------------------------------------------------------------
-- admins : already locked to service_role in database-setup.sql. Nothing to do.
------------------------------------------------------------------

-- Done. Verify with:
--   SELECT tablename, policyname, cmd FROM pg_policies ORDER BY tablename, cmd;
