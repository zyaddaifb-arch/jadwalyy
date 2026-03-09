import Link from "next/link";
import { CheckCircle2, Users, CalendarCheck, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function RegisterSuccessPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-cairo">
      <header className="w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
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
            <Link className="hidden sm:block text-slate-600 dark:text-slate-400 hover:text-primary font-semibold text-sm" href="/login">تسجيل الدخول</Link>
            <Link href="/register" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:flex flex-col gap-8 pr-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold">انضم لأكثر من 1000 معلم</span>
              <h2 className="text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
                نظّم دروسك <br />
                <span className="text-primary">بذكاء وسهولة</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                منصة جدولي توفر لك كل الأدوات اللازمة لإدارة مجموعاتك الطلابية، تتبع الحضور، واستقبال الحجوزات بشكل آلي واحترافي.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <Users className="text-primary mb-3 w-8 h-8" />
                <h4 className="font-bold mb-1">إدارة المجموعات</h4>
                <p className="text-xs text-slate-500">نظم طلابك في مجموعات منظمة</p>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <CalendarCheck className="text-primary mb-3 w-8 h-8" />
                <h4 className="font-bold mb-1">حجز آلي</h4>
                <p className="text-xs text-slate-500">دع الطلاب يختارون مواعيدهم</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
              <Image 
                alt="Team working" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRw9Fo_AeBRowJ8EmHyit2LHCGOBXs4p7nIGpaa5aZpoFUWVslKxHY9uC88RmFqC64eh-nCSpmcRUwOTqjHP-W3AQ-M5xBDvAIIXAVeOF6bcaMTW7JfJBr0P6KtbvRh6KGo5rmw6k773CVbypjzuvIj4YoiMpf42KTm7ybo42Bv1TyenrNbMFqG7Wc2lI-aXND9W7anjn6YhEgNEB8YTCe4GbD6nnefTjSGobEvvL2PFJhXL_LW2mfprDBG4XAQUn-FUp9XqgO_u0"
                fill
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <div className="text-center py-8 space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">تم إنشاء حسابك بنجاح!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">مرحباً بك في عائلة جدولي. يمكنك الآن البدء في تنظيم دروسك ومجموعاتك بكل سهولة.</p>
                </div>
                <div className="pt-4">
                  <Link 
                    href="/dashboard"
                    className="inline-flex items-center justify-center w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
                  >
                    الانتقال إلى لوحة التحكم
                    <ArrowLeft className="mr-2 w-5 h-5" />
                  </Link>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  سيتم توجيهك تلقائياً خلال ثوانٍ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} جدولي. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
