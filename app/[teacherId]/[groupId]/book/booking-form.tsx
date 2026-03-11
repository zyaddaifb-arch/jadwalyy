'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function BookingForm({ group, profile, teacherId, groupId }: { group: any, profile: any, teacherId: string, groupId: string }) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    student_name: '',
    student_phone: '',
    parent_phone: '',
    school: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const trimmedName = formData.student_name.trim();
      const sPhone = formData.student_phone.trim();
      const pPhone = formData.parent_phone.trim();

      if (trimmedName.length < 3) {
        setError("يرجى إدخال اسم الطالب الرباعي بشكل صحيح");
        setIsSubmitting(false);
        return;
      }

      if (pPhone && sPhone === pPhone) {
        setError("رقم الطالب لا يمكن أن يكون نفس رقم ولي الأمر");
        setIsSubmitting(false);
        return;
      }

      if (sPhone.length !== 11 || !pPhone || pPhone.length !== 11) {
        setError("يرجى إدخال أرقام هواتف صحيحة (11 رقم)");
        setIsSubmitting(false);
        return;
      }

      if (groupId === 'test-group') {
        router.push(`/${teacherId}/${groupId}/success?name=${encodeURIComponent(formData.student_name)}`);
        return;
      }

      const supabase = createClient();

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          group_id: groupId,
          student_name: trimmedName,
          student_phone: sPhone,
          parent_phone: pPhone,
          school: formData.school.trim()
        }])
        .select()
        .single();

      if (bookingError) {
        if (bookingError.code === '23505') {
          setError("لقد قمت بالحجز في هذه المجموعة مسبقاً");
        } else {
          throw bookingError;
        }
        setIsSubmitting(false);
        return;
      }

      router.push(`/${teacherId}/${groupId}/success?name=${encodeURIComponent(formData.student_name)}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'حدث خطأ أثناء إتمام الحجز. يرجى المحاولة مرة أخرى.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">تأكيد بيانات الحجز</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">يرجى إدخال بياناتك بدقة لإتمام عملية حجز مقعدك في المجموعة.</p>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Summary Banner */}
        {group && (
          <div className="bg-primary/5 dark:bg-primary/20 p-8 border-b border-primary/10 dark:border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm border border-primary/10">
                <span className="material-symbols-outlined text-4xl font-light">local_activity</span>
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">المجموعة المختارة</p>
                <h3 className="font-black text-slate-900 dark:text-white text-xl">{group.name}</h3>
                <p className="text-sm font-bold text-primary">أ/ {profile?.full_name || 'المعلم'}</p>
              </div>
            </div>
            <div className="text-center md:text-left bg-white/50 dark:bg-slate-800/50 px-6 py-3 rounded-2xl border border-primary/5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">موعد الحصة</p>
              <p className="text-slate-900 dark:text-white font-black">{group.time}</p>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-10">
          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-2xl text-sm font-black border border-red-100 dark:border-red-900/30 flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <div className="space-y-8 mb-10">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined">person</span>
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">البيانات الشخصية</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-black text-slate-700 dark:text-slate-300 mr-1">
                  الاسم الرباعي للطالب <span className="text-red-500">*</span>
                  <span className="hidden">student name</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.student_name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(value)) {
                      setFormData({ ...formData, student_name: value });
                    }
                  }}
                  placeholder="أدخل الاسم رباعياً"
                  className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none px-5 py-4 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-black text-slate-700 dark:text-slate-300 mr-1">
                  المدرسة
                  <span className="hidden">school</span>
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder="اسم المدرسة الحالية"
                  className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none px-5 py-4 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-black text-slate-700 dark:text-slate-300 mr-1">
                  رقم موبايل الطالب <span className="text-red-500">*</span>
                  <span className="hidden">student phone</span>
                </label>
                <div className="flex relative items-center group">
                  <input
                    required
                    type="tel"
                    value={formData.student_phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value) && value.length <= 11) {
                        setFormData({ ...formData, student_phone: value });
                      }
                    }}
                    placeholder="01012345678"
                    className="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold tracking-widest placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-black text-slate-700 dark:text-slate-300 mr-1">
                  رقم موبايل ولي الأمر <span className="text-red-500">*</span>
                  <span className="hidden">parent phone</span>
                </label>
                <div className="flex relative items-center group">
                  <input
                    required
                    type="tel"
                    value={formData.parent_phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value) && value.length <= 11) {
                        setFormData({ ...formData, parent_phone: value });
                      }
                    }}
                    placeholder="01112345678"
                    className="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold tracking-widest placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex items-start gap-4 mb-10">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 shrink-0">verified_user</span>
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
              سيتم استخدام هذه البيانات للتواصل معك وتأكيد الحجز. يرجى التأكد من أن أرقام الهاتف فعالة وتعمل لاستلام رسائل التأكيد.
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100 dark:border-slate-800">
            <Link href={`/${teacherId}/${groupId}`} className="w-full sm:w-auto px-8 py-4 text-slate-400 dark:text-slate-500 font-black hover:text-slate-900 dark:hover:text-white transition-all text-center group">
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                إلغاء والعودة
              </span>
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-12 py-5 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(60,131,246,0.25)] transition-all text-center text-xl active:scale-95 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="material-symbols-outlined text-2xl animate-spin">sync</span>
              ) : (
                <span className="material-symbols-outlined text-2xl">task_alt</span>
              )}
              <span>إتمام طلب الحجز</span>
              <span className="hidden">Submit booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
