import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('يرجى إعداد متغيرات البيئة الخاصة بـ Supabase (NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY) في إعدادات المشروع.');
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
