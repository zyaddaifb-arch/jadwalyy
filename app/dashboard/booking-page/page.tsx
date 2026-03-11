"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function BookingPageManagement() {
  const [profile, setProfile] = useState<any>(null);
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3c83f6');
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // First, check if the bucket exists or try to create/ensure it.
      // We'll just try to upload to 'avatars' bucket.
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile({ ...profile, avatar_url: publicUrl });

      // Update DB directly
      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      alert('حدث خطأ أثناء تحميل الصورة. تأكد من وجود صلاحيات كافية.');
    } finally {
      setIsUploading(false);
    }
  };

  const colors = [
    { name: 'blue', value: '#3c83f6' },
    { name: 'emerald', value: '#10b981' },
    { name: 'violet', value: '#8b5cf6' },
    { name: 'amber', value: '#f59e0b' },
  ];

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // In this app, profiles and public_profiles are likely synced. 
      // We update 'profiles' which triggers some sync, or public_profiles directly for branding.
      // Based on app/[teacherId]/page.tsx it reads from public_profiles.
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        if (profileData.theme_color) {
          setSelectedColor(profileData.theme_color);
        }
      }

      const { data: groupsData } = await supabase
        .from('groups')
        .select('*')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false });

      if (groupsData) {
        setGroups(groupsData);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/${profile?.id || ''}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Update the profile with new branding and bio
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          bio: profile.bio,
          theme_color: selectedColor
        })
        .eq('id', user.id);

      if (!error) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
          <p className="text-slate-400 font-bold text-sm">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">إدارة صفحة الحجز</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">تحكم في مظهر صفحتك العامة والمعلومات التي تظهر لطلابك.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${profile?.id}`} target="_blank" className="bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-black text-sm flex items-center gap-2 hover:bg-slate-50 transition-all active:scale-95 group">
            <span className="material-symbols-outlined text-xl transition-transform group-hover:rotate-12">visibility</span>
            <span>معاينة الصفحة</span>
          </Link>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Profile Section */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">الهوية الشخصية</h3>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">كيف يراك الطلاب على الصفحة العامة</p>
              </div>
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined font-light">person_celebrate</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative group cursor-pointer shrink-0" onClick={handleUploadClick}>
                  <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center overflow-hidden transition-all group-hover:scale-105">
                    {isUploading ? (
                      <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
                    ) : profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-5xl text-slate-300 font-light">person</span>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="flex-1 w-full space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">الاسم المعروض للطلاب</label>
                  <input
                    type="text"
                    value={profile?.full_name || ''}
                    onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                    placeholder="اسم المدرس"
                    className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-slate-700 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">نبذة تعريفية (تظهر أسفل الاسم)</label>
                <textarea
                  rows={4}
                  value={profile?.bio || ''}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="حدث الطلاب عنك وعن خبراتك..."
                  className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 dark:text-slate-200 leading-relaxed resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Groups Section */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">المجموعات النشطة</h3>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">اختر المجموعات التي تريد عرضها للحجز</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <div key={group.id} className="group relative flex items-center justify-between p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 cursor-pointer transition-all active:scale-[0.99]">
                    <div className="flex items-center gap-5">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" defaultChecked={true} className="peer appearance-none w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-700 checked:bg-primary checked:border-primary transition-all cursor-pointer" />
                        <span className="material-symbols-outlined absolute text-white text-base scale-0 peer-checked:scale-100 transition-transform pointer-events-none font-black">check</span>
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{group.name}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{group.subject} • {group.time}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${group.status === 'نشط' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'}`}>
                      {group.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                  <p className="text-slate-400 font-bold">لا توجد مجموعات حالياً</p>
                  <Link href="/dashboard/groups/create" className="text-primary font-black text-sm uppercase tracking-widest mt-2 block">إنشاء أول مجموعة</Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl font-light">link</span>
              رابط الصفحة العامة
            </h3>
            <div className="space-y-4">
              <div className="relative group" dir="ltr">
                <input
                  type="text"
                  readOnly
                  value={isLoading ? '...' : `jadwaly.com/${profile?.id || ''}`}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-4 pr-14 py-4 font-black text-xs text-slate-600 dark:text-slate-300 outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm ${copied ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'text-slate-400 hover:text-primary hover:bg-white dark:hover:bg-slate-700'}`}
                >
                  <span className="material-symbols-outlined text-xl">{copied ? 'check' : 'content_copy'}</span>
                </button>
              </div>
              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest px-4 leading-relaxed">انسخ هذا الرابط وشاركه مع طلابك على تيليجرام أو واتساب.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl font-light">palette</span>
              طابع الهوية (اللون)
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.value)}
                  className={`h-14 rounded-2xl transition-all hover:scale-110 active:scale-90 relative flex items-center justify-center ${selectedColor === color.value ? 'ring-4 ring-primary/20 scale-105' : ''}`}
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.value && <span className="material-symbols-outlined text-white text-xl font-black">check</span>}
                </button>
              ))}
            </div>
            <button className="w-full mt-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 font-black text-xs uppercase tracking-widest border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-100 transition-colors">
              اختر لون مخصص
            </button>
          </div>

          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 transition-all hover:bg-primary/10">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
              <span className="font-black text-sm uppercase tracking-widest">حالة الحساب</span>
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed">حسابك مفعل وجاهز لاستقبال الحجوزات. صفحتك العامة تظهر حالياً في نتائج البحث.</p>
          </div>
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
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">تم حفظ تغييرات الهوية بنجاح</p>
          </div>
        </div>
      </div>
    </div>
  );
}
