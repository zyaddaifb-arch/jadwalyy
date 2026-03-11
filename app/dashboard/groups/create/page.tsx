"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function CreateGroupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [groupId, setGroupId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [seats, setSeats] = useState("25");
  const [status, setStatus] = useState("نشط");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!name.trim()) {
      setError('يرجى إدخال اسم المجموعة');
      setIsSubmitting(false);
      return;
    }

    if (!subject) {
      setError('يرجى اختيار المادة الدراسية');
      setIsSubmitting(false);
      return;
    }

    const seatsNum = parseInt(seats);
    if (isNaN(seatsNum) || seatsNum <= 0) {
      setError('يرجى إدخال عدد مقاعد صحيح (أكبر من صفر)');
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { error } = await supabase
        .from('groups')
        .insert([
          {
            teacher_id: user.id,
            name,
            subject,
            time: `${date} ${time}`,
            seats_total: parseInt(seats),
            status: status === "نشط" ? "نشط" : "مغلق",
            description: notes,
          }
        ]);

      if (error) {
        setError(error.message);
        return;
      }

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto px-10 py-12 max-w-5xl w-full">
      <DashboardHeader
        title="إنشاء مجموعة جديدة"
        description="أضف تفاصيل الجلسة الدراسية لتنظيم عملية الحجز لطلابك."
      >
        <Link href="/dashboard/groups" className="bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-black text-sm flex items-center gap-2 hover:bg-slate-50 transition-all active:scale-95 group whitespace-nowrap">
          <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
          <span>العودة للمجموعات</span>
        </Link>
      </DashboardHeader>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        {error && (
          <div className="m-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-3xl flex items-center gap-4 text-red-600 dark:text-red-400">
            <span className="material-symbols-outlined">error</span>
            <p className="font-bold text-sm">حدث خطأ: {error}</p>
          </div>
        )}
        {/* Section 1: Basic Info */}
        <div className="p-10 border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined font-light">info</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">المعلومات الأساسية</h3>
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">الخطوة 1 من 3</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">اسم المجموعة</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="مثال: مراجعة ليلة الامتحان" className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 dark:text-slate-200" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">المادة الدراسية</label>
              <div className="relative">
                <select required value={subject} onChange={e => setSubject(e.target.value)} className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200 appearance-none">
                  <option value="">اختر المادة</option>
                  <option value="الرياضيات">الرياضيات</option>
                  <option value="اللغة العربية">اللغة العربية</option>
                  <option value="الفيزياء">الفيزياء</option>
                  <option value="الكيمياء">الكيمياء</option>
                  <option value="الأحياء">الأحياء</option>
                  <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                </select>
                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">رقم المجموعة (اختياري)</label>
              <input type="text" value={groupId} onChange={e => setGroupId(e.target.value)} placeholder="MATH-101" className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 dark:text-slate-200" />
            </div>
          </div>
        </div>

        {/* Section 2: Timing */}
        <div className="p-10 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined font-light">schedule</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">الجدول الزمني</h3>
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">الخطوة 2 من 3</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">تاريخ الحصة</label>
              <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">وقت البدء</label>
              <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">مدة الدرس</label>
              <div className="relative">
                <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200 appearance-none">
                  <option value="60">60 دقيقة (ساعة واحدة)</option>
                  <option value="90">90 دقيقة (ساعة ونصف)</option>
                  <option value="120">120 دقيقة (ساعتان)</option>
                  <option value="180">180 دقيقة (3 ساعات)</option>
                </select>
                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Seats and Status */}
        <div className="p-10 border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined font-light">airline_seat_recline_normal</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">السعة والحالة</h3>
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">الخطوة 3 من 3</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">إجمالي المقاعد المتاحة</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors">event_seat</span>
                <input
                  required
                  type="number"
                  min="1"
                  value={seats}
                  onChange={e => {
                    const val = e.target.value;
                    if (val === '' || (parseInt(val) >= 0 && !val.includes('.'))) {
                      setSeats(val);
                    }
                  }}
                  placeholder="مثال: 30"
                  className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pr-14 pl-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">حالة التسجيل</label>
              <div className="relative">
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200 appearance-none">
                  <option value="نشط">متاح للحجز الآن</option>
                  <option value="مغلق">مغلق مؤقتاً (للمعاينة فقط)</option>
                </select>
                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Notes */}
        <div className="p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined font-light">description</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">وصف المجموعة</h3>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">توجيهات للطلاب (اختياري)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder="اكتب شروط الحجز أو أي تعليمات إضافية هنا..." className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2rem] px-8 py-6 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 dark:text-slate-200 leading-relaxed resize-none"></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-10 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-end gap-6">
          <Link href="/dashboard/groups" className="w-full sm:w-auto px-10 py-5 text-slate-400 hover:text-slate-900 dark:hover:text-white font-black text-sm uppercase tracking-widest transition-all text-center">
            إلغاء العملية
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(60,131,246,0.25)] hover:bg-primary-hover transition-all flex items-center justify-center gap-3 active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="material-symbols-outlined text-2xl animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-2xl">add_box</span>
            )}
            <span>تأكيد وإنشاء المجموعة</span>
          </button>
        </div>
      </form>

      {/* Floating Success Toast */}
      <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-6 transition-all duration-700 ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-90 pointer-events-none'}`}>
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/20 rounded-[2.5rem] shadow-[0_40px_80px_rgba(16,185,129,0.15)] backdrop-blur-xl p-8 flex items-center gap-8">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">تمت العملية بنجاح!</h4>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">تم إنشاء المجموعة بنجاح وجاري تحويلك للرئيسية.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-900 transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
