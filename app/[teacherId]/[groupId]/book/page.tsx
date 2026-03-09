'use client';

import Link from 'next/link';
import { use } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingFormPage({ params }: { params: Promise<{ teacherId: string, groupId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      router.push(`/${resolvedParams.teacherId}/${resolvedParams.groupId}/success`);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">تأكيد بيانات الحجز</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">يرجى إدخال بياناتك بدقة لإتمام عملية حجز مقعدك في المجموعة.</p>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Summary Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-blue-100 dark:border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-3xl">science</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">مجموعة التفوق (فيزياء)</h3>
              <p className="text-sm text-slate-500">أ. أحمد العتيبي</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">موعد المجموعة</p>
            <p className="text-slate-900 dark:text-white font-medium">الأحد، ٠٤:٠٠ م</p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">بيانات الطالب</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">الاسم الرباعي <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="مثال: أحمد محمود علي حسن" className="w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none px-4 py-3 transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">رقم هاتف الطالب <span className="text-red-500">*</span></label>
                <div className="flex" dir="ltr">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-slate-500 font-bold">
                    +20
                  </span>
                  <input required type="tel" placeholder="1012345678" className="flex-1 rounded-r-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none px-4 py-3 transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">رقم هاتف ولي الأمر <span className="text-red-500">*</span></label>
                <div className="flex" dir="ltr">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-slate-500 font-bold">
                    +20
                  </span>
                  <input required type="tel" placeholder="1012345678" className="flex-1 rounded-r-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none px-4 py-3 transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">المدرسة</label>
                <input type="text" placeholder="مثال: مدرسة المتفوقين الثانوية" className="w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none px-4 py-3 transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/50 flex items-start gap-3 mb-10">
            <span className="material-symbols-outlined text-orange-500 shrink-0 mt-0.5">info</span>
            <p className="text-sm text-orange-800 dark:text-orange-300 leading-relaxed">
              يرجى التأكد من صحة أرقام الهواتف المدخلة، حيث سيتم إرسال رسالة تأكيد الحجز وتفاصيل الدفع إليها.
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Link href={`/${resolvedParams.teacherId}/${resolvedParams.groupId}`} className="w-full sm:w-auto px-8 py-3 text-slate-600 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors text-center">
              إلغاء والعودة
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-10 py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all text-center text-lg active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="material-symbols-outlined text-xl animate-spin">sync</span>
              ) : (
                <span className="material-symbols-outlined text-xl">check_circle</span>
              )}
              <span>تأكيد الحجز</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
