
-- 1. Support Migration by Temporarily Removing Dependencies
DROP POLICY IF EXISTS "Public users can view active groups" ON groups;
DROP TRIGGER IF EXISTS on_booking_before_insert ON bookings;
DROP TRIGGER IF EXISTS on_booking_cancelled_or_deleted ON bookings;
ALTER TABLE groups DROP CONSTRAINT IF EXISTS group_status_check;
DROP INDEX IF EXISTS unique_active_booking_idx; -- Remove previous index to avoid duplicates

-- 2. Create ENUM Types
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'group_status') THEN
        CREATE TYPE group_status AS ENUM ('نشط', 'مكتمل', 'مغلق');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
        CREATE TYPE booking_status AS ENUM ('نشط', 'ملغي');
    END IF;
END$$;

-- 3. Convert Columns to ENUM safely
-- Groups table
ALTER TABLE groups ALTER COLUMN status DROP DEFAULT;
ALTER TABLE groups 
  ALTER COLUMN status TYPE group_status 
  USING status::group_status;
ALTER TABLE groups ALTER COLUMN status SET DEFAULT 'نشط'::group_status;

-- Bookings table
ALTER TABLE bookings ALTER COLUMN status DROP DEFAULT;
ALTER TABLE bookings 
  ALTER COLUMN status TYPE booking_status 
  USING status::booking_status;
ALTER TABLE bookings ALTER COLUMN status SET DEFAULT 'نشط'::booking_status;

-- 4. Redefine Functions to use ENUM types for safety and avoid "operator does not exist" errors
CREATE OR REPLACE FUNCTION validate_booking_and_increment()
RETURNS trigger AS $$
DECLARE
  v_group_status group_status;
  v_seats_total int;
  v_seats_reserved int;
BEGIN
  SELECT status, seats_total, seats_reserved INTO v_group_status, v_seats_total, v_seats_reserved
  FROM groups
  WHERE id = NEW.group_id FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'المجموعة غير موجودة.';
  END IF;

  -- Use explicit enum comparison
  IF v_group_status != 'نشط'::group_status THEN
    RAISE EXCEPTION 'لا يمكن الحجز في هذه المجموعة لأنها غير متاحة للحجز حالياً.';
  END IF;
  
  IF v_seats_reserved >= v_seats_total THEN
    RAISE EXCEPTION 'عذراً، المجموعة مكتملة العدد.';
  END IF;

  UPDATE groups
  SET seats_reserved = seats_reserved + 1
  WHERE id = NEW.group_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION handle_booking_cancelled_or_deleted()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    -- Use explicit enum comparison
    IF OLD.status = 'نشط'::booking_status AND NEW.status != 'نشط'::booking_status THEN
      UPDATE groups
      SET seats_reserved = GREATEST(seats_reserved - 1, 0)
      WHERE id = NEW.group_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.status = 'نشط'::booking_status THEN
      UPDATE groups
      SET seats_reserved = GREATEST(seats_reserved - 1, 0)
      WHERE id = OLD.group_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Restore RLS Policies and Triggers
-- Policy for Groups
CREATE POLICY "Public users can view active groups" ON groups
  FOR SELECT USING (status = 'نشط'::group_status);

-- Trigger for Group Capacity (Insertion)
CREATE TRIGGER on_booking_before_insert
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE PROCEDURE validate_booking_and_increment();

-- Trigger for Seats Recovery (Cancellation/Deletion)
CREATE TRIGGER on_booking_cancelled_or_deleted
  AFTER UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE PROCEDURE handle_booking_cancelled_or_deleted();

-- 6. Prevent Duplicate Active Bookings
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_booking_per_student
ON bookings (group_id, student_phone)
WHERE status = 'نشط'::booking_status;

-- 7. Performance Optimization Indexes
CREATE INDEX IF NOT EXISTS idx_groups_teacher_id ON groups(teacher_id);
CREATE INDEX IF NOT EXISTS idx_groups_status ON groups(status);
CREATE INDEX IF NOT EXISTS idx_bookings_group_id ON bookings(group_id);
