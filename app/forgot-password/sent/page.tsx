import Link from "next/link";
import { MailCheck, ArrowRight, Moon } from "lucide-react";

export default function ForgotPasswordSentPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col font-cairo">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-10 py-4 bg-white dark:bg-slate-900 relative z-10">
        <Link href="/" className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
          <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-xl">calendar_month</span>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">جدولي</h2>
        </Link>
        <button className="flex items-center justify-center rounded-xl w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
          <Moon className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-10 flex flex-col items-center text-center">
          {/* Success Icon/Illustration Area */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full scale-150 blur-xl"></div>
            <div className="relative w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <MailCheck className="w-12 h-12" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              تم إرسال الرابط
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              تحقق من بريدك الإلكتروني للمتابعة وإعادة تعيين كلمة المرور.
            </p>
          </div>

          {/* Action Button */}
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            <span>العودة إلى تسجيل الدخول</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Secondary Actions */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 w-full">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              لم يصلك البريد الإلكتروني؟{" "}
              <button className="text-primary font-semibold hover:underline mr-1 focus:outline-none">
                إعادة الإرسال
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0"></div>
    </div>
  );
}
