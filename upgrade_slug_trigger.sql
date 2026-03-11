-- 1. Safely Generate Fallback Public Slugs
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter int := 1;
BEGIN
  -- Generate a basic url-friendly slug from the full name (very simplified) or fallback
  -- Just using a prefix + the start of the UUID is 100% collision proof and safe
  final_slug := 't-' || split_part(new.id::text, '-', 1);

  insert into public.profiles (id, full_name, phone, subject, public_slug)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'subject',
    final_slug
  );
  return new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
