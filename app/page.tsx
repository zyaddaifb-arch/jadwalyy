import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="text-center max-w-2xl">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
          <span className="material-symbols-outlined text-white text-4xl">calendar_month</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          جدولي
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          المنصة الأذكى لإدارة الدروس والمجموعات التعليمية. 
          نظم وقتك، أدر حجوزات طلابك، وانطلق نحو تجربة تعليمية أفضل.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3 text-lg active:scale-95"
          >
            <span>دخول المعلم</span>
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <Link 
            href="/teacher-123" 
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <span>تجربة صفحة الطالب</span>
            <span className="material-symbols-outlined">school</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
