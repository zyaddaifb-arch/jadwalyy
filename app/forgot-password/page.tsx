'use client';

import Link from "next/link";
import { Mail, Send, ArrowRight, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push('/forgot-password/sent');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-cairo">
      {/* Simple Navigation */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">calendar_month</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">جدولي</h1>
        </Link>
        <div>
          <button className="text-slate-500 hover:text-primary transition-colors font-medium">العربية</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-none p-8 md:p-10 border border-slate-100 dark:border-slate-800 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 text-primary">
              <LockKeyhole className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">استعادة كلمة المرور</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور.</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleResetPassword}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm font-medium border border-red-200 dark:border-red-800/30">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mr-1" htmlFor="email">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  className="block w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  id="email"
                  name="email"
                  placeholder="example@domain.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/25 transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'جاري الإرسال...' : 'إرسال رابط الاستعادة'}</span>
              {!loading && <Send className="w-5 h-5" />}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors group">
              <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        </div>
      </main>

      {/* Subtle Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Page Footer */}
      <footer className="py-8 text-center text-slate-400 text-xs relative z-10">
        © {new Date().getFullYear()} جدولي SaaS. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
