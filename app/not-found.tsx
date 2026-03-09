import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">الصفحة غير موجودة</p>
        <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
