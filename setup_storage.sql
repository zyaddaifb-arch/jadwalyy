
-- Create the avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'avatars', 'avatars', true
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'avatars'
);

-- Policy for viewing avatars (Anyone can view)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Access'
    ) THEN
        CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
    END IF;
END$$;

-- Policy for uploading avatars (Authenticated users can upload)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated Upload'
    ) THEN
        CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (
            bucket_id = 'avatars' AND auth.role() = 'authenticated'
        );
    END IF;
END$$;

-- Policy for updating/deleting own avatar
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Owner Update/Delete'
    ) THEN
        CREATE POLICY "Owner Update/Delete" ON storage.objects FOR ALL USING (
            bucket_id = 'avatars' AND auth.uid() = owner
        );
    END IF;
END$$;
