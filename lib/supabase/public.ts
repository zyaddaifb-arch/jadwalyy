import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// This client does NOT use cookies(), making it safe to use in public
// Server Components that you want to be statically generated or cached via ISR.
// Using the regular server client opts the route into Dynamic Rendering.
export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing.');
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}
