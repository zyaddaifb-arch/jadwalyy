-- Add a check constraint to ensure student phone is different from parent phone
-- This is backward safe for insertion of new rows.
-- If existing rows violate this, the migration will fail, allowing you to clean data first.

ALTER TABLE bookings 
  ADD CONSTRAINT student_parent_phone_different 
  CHECK (student_phone != parent_phone);
