'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CreateGroupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 1500);
  };

  return (
    <div className="mx-auto px-6 py-8 max-w-4xl w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">إنشاء مجموعة جديدة</h2>
          <p className="text-slate-500 mt-1">قم بإدخال بيانات المجموعة ليتمكن الطلاب من الحجز بسهولة</p>
        </div>
        <Link href="/dashboard/groups" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm w-fit">
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
          <span>العودة إلى المجموعات</span>
        </Link>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Section 1: Basic Info */}
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">info</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">معلومات المجموعة</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">اسم المجموعة</label>
              <input required type="text" placeholder="مثال: مجموعة التفوق 1" className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none px-4 py-2.5" />
              <p className="text-xs text-slate-400 mt-1">(مثلاً: مجموعة المراجعة النهائية - ليلة الامتحان)</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">المادة</label>
              <select required className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none px-4 py-2.5">
                <option value="">اختر المادة</option>
                <option value="math">الرياضيات</option>
                <option value="arabic">اللغة العربية</option>
                <option value="physics">الفيزياء</option>
                <option value="chemistry">الكيمياء</option>
                <option value="biology">الأحياء</option>
                <option value="english">اللغة الإنجليزية</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">رقم المجموعة</label>
              <input type="text" placeholder="مثال: MATH-101" className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none px-4 py-2.5" />
            </div>
          </div>
        </div>

        {/* Section 2: Timing */}
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">schedule</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">موعد الدرس</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">التاريخ</label>
              <input required type="date" className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none px-4 py-2.5" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">الوقت</label>
              <input required type="time" className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none px-4 py-2.5" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">مدة الحصة</label>
              <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none px-4 py-2.5">
                <option value="60">60 دقيقة</option>
                <option value="90">90 دقيقة</option>
                <option value="120">120 دقيقة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Seats and Status */}
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">event_seat</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">المقاعد والحجز</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">عدد المقاعد</label>
              <input required type="number" min="1" placeholder="مثال: 25" className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none px-4 py-2.5" />
              <p className="text-xs text-slate-400 mt-1">(أقصى عدد طلاب مسموح به في القاعة)</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">حالة الحجز</label>
              <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none px-4 py-2.5">
                <option>متاح للحجز</option>
                <option>مغلق مؤقتًا</option>
              </select>
              <p className="text-xs text-slate-400 mt-1">(تحكم في ظهور المجموعة للطلاب على صفحة الحجز)</p>
            </div>
          </div>
        </div>

        {/* Section 4: Notes */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">notes</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">ملاحظات إضافية</h3>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">أي تعليمات أو ملاحظات إضافية للطلاب</label>
            <textarea rows={4} placeholder="اكتب الملاحظات هنا..." className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary resize-none outline-none px-4 py-2.5"></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-end gap-4">
          <Link href="/dashboard/groups" className="w-full sm:w-auto px-8 py-3 text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white transition-colors text-center">
            إلغاء
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-10 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="material-symbols-outlined text-xl animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-xl">add_circle</span>
            )}
            <span>إنشاء المجموعة</span>
          </button>
        </div>
      </form>

      {/* Toast */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white dark:bg-slate-900 border-l-4 border-emerald-500 text-slate-800 dark:text-white px-6 py-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'}`}>
        <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <span className="material-symbols-outlined text-2xl">check_circle</span>
        </div>
        <div className="flex-grow">
          <p className="font-bold text-base">تمت العملية بنجاح</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">تم إنشاء المجموعة بنجاح! يمكن للطلاب الآن البدء في الحجز عبر نظام جدولي.</p>
        </div>
        <button onClick={() => setShowToast(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
    </div>
  );
}
