import Link from 'next/link';

export default async function BookingSuccessPage({ params }: { params: Promise<{ teacherId: string, groupId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden text-center relative">
        {/* Success Header */}
        <div className="bg-emerald-500 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10 animate-bounce">
            <span className="material-symbols-outlined text-emerald-500 text-6xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 relative z-10">تم الحجز بنجاح!</h1>
          <p className="text-emerald-50 font-medium relative z-10">لقد تم تسجيل بياناتك في المجموعة بنجاح.</p>
        </div>

        {/* Booking Details */}
        <div className="p-8">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-600">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">تفاصيل الحجز</h3>
            <div className="space-y-4 text-right">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-600 pb-3">
                <span className="text-slate-500 dark:text-slate-400 text-sm">رقم الحجز</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">#BK-1026</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-600 pb-3">
                <span className="text-slate-500 dark:text-slate-400 text-sm">اسم الطالب</span>
                <span className="font-bold text-slate-900 dark:text-white">أحمد محمود علي</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-600 pb-3">
                <span className="text-slate-500 dark:text-slate-400 text-sm">المجموعة</span>
                <span className="font-bold text-slate-900 dark:text-white">مجموعة التفوق (فيزياء)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm">الموعد القادم</span>
                <span className="font-bold text-slate-900 dark:text-white">الأحد، ٠٤:٠٠ م</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50 flex items-start gap-3 mb-8 text-right">
            <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">info</span>
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              تم إرسال رسالة نصية (SMS) تحتوي على تفاصيل الحجز ورابط الدفع إلى رقم هاتفك المسجل.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button className="w-full px-6 py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 text-lg active:scale-95">
              <span className="material-symbols-outlined">download</span>
              <span>تحميل إيصال الحجز</span>
            </button>
            <Link href={`/${resolvedParams.teacherId}`} className="w-full px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all block text-center">
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
