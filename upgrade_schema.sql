-- 1. Fix Groups RLS Policies
DROP POLICY IF EXISTS "Groups are viewable by everyone." ON groups;
DROP POLICY IF EXISTS "Teachers can manage their own groups." ON groups;

-- Public can only select active groups
CREATE POLICY "Public users can view active groups" ON groups
  FOR SELECT USING (status = 'نشط');

-- Teachers can select their own groups (active or not)
CREATE POLICY "Teachers can view their own groups" ON groups
  FOR SELECT USING (auth.uid() = teacher_id);

-- Teachers can insert their own groups
CREATE POLICY "Teachers can insert their own groups" ON groups
  FOR INSERT WITH CHECK (auth.uid() = teacher_id);

-- Teachers can update their own groups
CREATE POLICY "Teachers can update their own groups" ON groups
  FOR UPDATE USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);

-- Teachers can delete their own groups
CREATE POLICY "Teachers can delete their own groups" ON groups
  FOR DELETE USING (auth.uid() = teacher_id);


-- 2. Prevent Duplicate Student Bookings (Active only)
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_booking_idx 
ON bookings (group_id, student_phone) 
WHERE status = 'نشط';


-- 3. Fix Seat Counter When Booking Is Cancelled
CREATE OR REPLACE FUNCTION handle_booking_cancelled_or_deleted()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF OLD.status = 'نشط' AND NEW.status != 'نشط' THEN
      UPDATE groups
      SET seats_reserved = GREATEST(seats_reserved - 1, 0)
      WHERE id = NEW.group_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.status = 'نشط' THEN
      UPDATE groups
      SET seats_reserved = GREATEST(seats_reserved - 1, 0)
      WHERE id = OLD.group_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_booking_cancelled_or_deleted ON bookings;
CREATE TRIGGER on_booking_cancelled_or_deleted
  AFTER UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE PROCEDURE handle_booking_cancelled_or_deleted();


-- 4. Protect Teacher Phone Numbers
-- Drop the public select policy to hide phone numbers
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;

-- Ensure users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Create public_profiles view
CREATE OR REPLACE VIEW public_profiles AS
SELECT 
  id,
  full_name,
  subject,
  public_slug,
  bio,
  avatar_url
FROM profiles;

-- Grant access to public role for the view
GRANT SELECT ON public_profiles TO anon, authenticated;


-- 5. Automatically Maintain updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS set_groups_updated_at ON groups;
CREATE TRIGGER set_groups_updated_at
  BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();


-- 6. Improve Booking Data Integrity
-- Seats reserved check
ALTER TABLE groups 
  DROP CONSTRAINT IF EXISTS seats_reserved_not_negative,
  ADD CONSTRAINT seats_reserved_not_negative CHECK (seats_reserved >= 0);

-- Group status enum equivalent check
ALTER TABLE groups
  DROP CONSTRAINT IF EXISTS group_status_check,
  ADD CONSTRAINT group_status_check CHECK (status IN ('نشط', 'مكتمل', 'مغلق'));

-- Booking details check
ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS missing_student_name,
  ADD CONSTRAINT missing_student_name CHECK (student_name IS NOT NULL AND trim(student_name) <> '');

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS missing_student_phone,
  ADD CONSTRAINT missing_student_phone CHECK (student_phone IS NOT NULL AND trim(student_phone) <> '');
