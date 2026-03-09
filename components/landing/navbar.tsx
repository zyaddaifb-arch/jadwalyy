import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-navy-700 bg-white/80 dark:bg-navy-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-primary p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-white text-2xl">calendar_month</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">جدولي</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#features">المميزات</a>
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#how-it-works">كيف يعمل</a>
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#">الأسعار</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link className="hidden sm:block text-slate-600 dark:text-slate-300 font-medium hover:text-primary" href="/login">تسجيل الدخول</Link>
            <Link href="/register" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
              ابدأ الآن
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
