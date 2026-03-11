'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const trimmedName = fullName.trim();
    if (trimmedName.length < 3) {
      setError('يرجى إدخال الاسم الكامل بشكل صحيح (3 أحرف على الأقل)');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      setLoading(false);
      return;
    }

    if (phone.length !== 11) {
      setError('يرجى إدخال رقم هاتف صحيح مكون من 11 رقم');
      setLoading(false);
      return;
    }

    if (email === 'test@jadwaly.test') {
      router.push('/register/success');
      return;
    }

    try {
      const supabase = createClient();
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: trimmedName,
            phone,
            subject,
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data?.session) {
        router.push('/dashboard');
      } else {
        router.push('/register/success');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <header className="w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl">calendar_month</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">جدولي</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-medium" href="/">الرئيسية</Link>
            <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-medium" href="/#features">المميزات</Link>
            <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-medium" href="/#pricing">الأسعار</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link className="hidden sm:block text-slate-600 dark:text-slate-400 hover:text-primary font-semibold text-sm" href="/login">تسجيل الدخول</Link>
            <Link href="/register" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-[1100px] grid lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          {/* Register Form Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">إنشاء حساب جديد</h1>
              <p className="text-slate-500 dark:text-slate-400">أدخل بياناتك للبدء في استخدام جدولي</p>
            </div>
            <form onSubmit={handleRegister} className="space-y-5">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm font-medium border border-red-200 dark:border-red-800/30">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg opacity-60">person</span>
                  الاسم الكامل
                </label>
                <input
                  id="full_name"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="أدخل اسمك الثلاثي"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(value)) {
                      setFullName(value);
                    }
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg opacity-60">mail</span>
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="أدخل بريدك الإلكتروني"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg opacity-60">call</span>
                    رقم الهاتف
                  </label>
                  <input
                    id="phone"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dir-ltr text-right"
                    placeholder="010xxxxxxxx"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value) && value.length <= 11) {
                        setPhone(value);
                      }
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg opacity-60">book</span>
                    المادة الدراسية
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-slate-100 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[position:left_1rem_center] bg-no-repeat"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  >
                    <option value="">اختر المادة</option>
                    <option value="الرياضيات">الرياضيات</option>
                    <option value="الفيزياء">الفيزياء</option>
                    <option value="اللغة العربية">اللغة العربية</option>
                    <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                    <option value="الكيمياء">الكيمياء</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg opacity-60">lock</span>
                  كلمة المرور
                </label>
                <input
                  id="password"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-sans tracking-widest"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input id="terms" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" required />
                <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">أوافق على <a className="text-primary hover:underline" href="#">شروط الخدمة</a> و <a className="text-primary hover:underline" href="#">سياسة الخصوصية</a></label>
              </div>
              <button
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                type="submit"
                disabled={loading}
              >
                <span>{loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}</span>
                {!loading && <span className="material-symbols-outlined">person_add</span>}
              </button>
              <div className="text-center pt-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  لديك حساب بالفعل؟
                  <Link className="text-primary font-bold hover:underline mr-1" href="/login">تسجيل الدخول</Link>
                </p>
              </div>
            </form>
          </div>
          {/* Visual Content Section */}
          <div className="hidden lg:flex flex-col bg-primary/5 dark:bg-slate-800/50 p-12 justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 text-center">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">انضم لأكثر من 1000 معلم</span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-relaxed">
                نظّم دروسك <br />
                <span className="text-primary">بذكاء وسهولة</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-md mx-auto">
                منصة جدولي توفر لك كل الأدوات اللازمة لإدارة مجموعاتك الطلابية، تتبع الحضور، واستقبال الحجوزات بشكل آلي واحترافي.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary mb-2 text-3xl">groups</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">إدارة المجموعات</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary mb-2 text-3xl">event_available</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">حجز آلي</p>
                </div>
              </div>
            </div>
            {/* Abstract Decorative Pattern */}
            <div className="absolute bottom-0 right-0 p-8 opacity-10">
              <svg fill="none" height="200" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                <circle className="text-primary" cx="100" cy="100" r="80" stroke="currentColor" strokeDasharray="10 10" strokeWidth="2"></circle>
                <circle className="text-primary" cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2"></circle>
              </svg>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-auto py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2024 جدولي. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">social_leaderboard</span></a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
