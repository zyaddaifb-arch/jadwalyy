"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile({ ...profile, avatar_url: publicUrl });

      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      alert('حدث خطأ أثناء تحميل الصورة.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const trimmedName = profile.full_name?.trim();
    if (!trimmedName || trimmedName.length < 3) {
      setError('يرجى إدخال الاسم الكامل بشكل صحيح (3 أحرف على الأقل)');
      setIsSaving(false);
      return;
    }

    if (profile.phone?.length !== 11) {
      setError('يرجى إدخال رقم هاتف صحيح مكون من 11 رقم');
      setIsSaving(false);
      return;
    }

    if (user) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: trimmedName,
          phone: profile.phone,
          subject: profile.subject,
          bio: profile.bio?.trim(),
          public_slug: profile.public_slug?.trim().toLowerCase()
        })
        .eq('id', user.id);

      if (updateError) {
        setError(updateError.message);
      } else {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    }
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
          <p className="text-slate-400 font-bold text-sm">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    );
  }

  const firstName = profile?.full_name?.split(' ')[0] || '';
  const lastName = profile?.full_name?.split(' ').slice(1).join(' ') || '';

  return (
    <div className="p-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">الإعدادات</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">إدارة حسابك، المادة العلمية، وإعدادات الملف الشخصي.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-black shadow-[0_20px_40px_rgba(60,131,246,0.25)] transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <span className="material-symbols-outlined font-black animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined font-black">save</span>
            )}
            <span>حفظ التغييرات</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="flex flex-col gap-2 sticky top-8">
            <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary text-white font-black text-right w-full transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">person</span>
              <span>الملف الشخصي</span>
            </button>
            <button className="flex items-center gap-3 px-6 py-4 rounded-2xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 font-black text-right w-full transition-all">
              <span className="material-symbols-outlined">school</span>
              <span>المادة العلمية</span>
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-12">
          {error && (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-3xl flex items-center gap-4 text-red-600 dark:text-red-400">
              <span className="material-symbols-outlined">error</span>
              <p className="font-bold text-sm">حدث خطأ: {error}</p>
            </div>
          )}

          {/* Profile Settings */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">المعلومات الأساسية</h3>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">صورتك الشخصية وبيانات التواصل</p>
              </div>
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined">account_circle</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="relative group cursor-pointer shrink-0" onClick={handleUploadClick}>
                <div className="w-32 h-32 rounded-[2rem] bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 group-hover:rotate-3">
                  {isUploading ? (
                    <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
                  ) : profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-black text-5xl">
                      {firstName.charAt(0) || 'A'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                  <span className="material-symbols-outlined text-xl">upload</span>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>

              <div className="flex-1 w-full space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">الاسم معروض للجميع</label>
                    <input
                      type="text"
                      value={profile?.full_name || ''}
                      onChange={e => {
                        const value = e.target.value;
                        if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(value)) {
                          setProfile({ ...profile, full_name: value });
                        }
                      }}
                      className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">رقم الهاتف العام</label>
                    <div className="relative group">
                      <input
                        type="tel"
                        value={profile?.phone || ''}
                        onChange={e => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value) && value.length <= 11) {
                            setProfile({ ...profile, phone: value });
                          }
                        }}
                        placeholder="01012345678"
                        className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">المادة الدراسية</h3>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">تخصصك الذي يظهر للطلاب</p>
              </div>
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">المادة الأساسية</label>
                <select
                  value={profile?.subject || 'الفيزياء'}
                  onChange={e => setProfile({ ...profile, subject: e.target.value })}
                  className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200 appearance-none"
                >
                  <option value="الفيزياء">الفيزياء</option>
                  <option value="الكيمياء">الكيمياء</option>
                  <option value="الرياضيات">الرياضيات</option>
                  <option value="الأحياء">الأحياء</option>
                  <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                  <option value="اللغة العربية">اللغة العربية</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">رابط الصفحة الشخصية (Slug)</label>
                <div className="relative group" dir="ltr">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300">jadwaly.com/</span>
                  <input
                    type="text"
                    value={profile?.public_slug || ''}
                    onChange={e => {
                      const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                      setProfile({ ...profile, public_slug: value });
                    }}
                    placeholder="your-name"
                    className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-32 pr-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mr-2 mt-1">استخدم فقط الحروف الإنجليزية، الأرقام، والشرطات (-)</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">نبذة تعريفية (Bio)</label>
                <textarea
                  value={profile?.bio || ''}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-700 dark:text-slate-200 resize-none"
                  placeholder="أكتب نبذة عن خبراتك وطريقة تدريسك..."
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-5 rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] flex items-center gap-6 border border-slate-800 dark:border-slate-200">
          <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <span className="material-symbols-outlined text-2xl">check</span>
          </div>
          <div>
            <h4 className="font-black text-sm tracking-tight">تم التحديث!</h4>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">تم حفظ تغييرات الإعدادات بنجاح</p>
          </div>
        </div>
      </div>
    </div>
  );
}

