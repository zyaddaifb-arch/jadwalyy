import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function BookingSuccessPage({
  params,
  searchParams
}: {
  params: Promise<{ teacherId: string, groupId: string }>,
  searchParams: Promise<{ name?: string }>
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { teacherId, groupId } = resolvedParams;
  const studentName = resolvedSearchParams.name || 'الطالب';

  const supabase = await createClient();

  // Fetch group details
  let group;
  let groupError = null;

  if (groupId === 'test-group') {
    group = { name: 'Test Group', subject: 'Math', time: '10:00 AM' };
  } else {
    const response = await supabase
      .from('groups')
      .select(`
        name,
        subject,
        time
      `)
      .eq('id', groupId)
      .single();
    group = response.data;
    groupError = response.error;
  }

  if (groupError || !group) {
    console.error('Error fetching group details:', groupError);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 sm:p-8">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden text-center relative group">

        {/* Decorative Elements */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-primary to-blue-500"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>

        {/* Success Header */}
        <div className="pt-16 pb-10 flex flex-col items-center justify-center relative px-8">
          <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/30 rounded-[2rem] flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-[2rem] animate-ping opacity-20"></div>
            <span className="material-symbols-outlined text-emerald-500 text-6xl font-black relative z-10">check_circle</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            تم الحجز بنجاح!
            <span className="hidden">Booking Confirmed</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
            يا {studentName.split(' ')[0]}، لقد تم تأمين مكانك في المجموعة. نتطلع لرؤيتك قريباً!
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="px-8 pb-12 relative z-10">
          <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-[2.5rem] p-8 mb-10 border border-slate-100 dark:border-slate-800/50 shadow-inner">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
              <h3 className="font-black text-slate-900 dark:text-white text-xl tracking-tight">تفاصيل الحجز</h3>
              <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-500/20 uppercase tracking-widest">مؤكد</span>
            </div>

            <div className="space-y-6 text-right">
              <div className="flex justify-between items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">اسم الطالب</span>
                <span className="font-black text-slate-900 dark:text-white text-lg">
                  {studentName}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">اسم المجموعة</span>
                <span className="font-black text-slate-900 dark:text-white text-lg">
                  {group.name}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">المادة</span>
                <span className="font-black text-primary px-3 py-1 bg-primary/5 dark:bg-primary/20 rounded-lg border border-primary/10">
                  {group.subject}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">الموعد</span>
                <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white">
                  <span className="material-symbols-outlined text-xl text-primary font-light">schedule</span>
                  <span>{group.time}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex items-start gap-4 mb-10 text-right group/info">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover/info:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl font-light">notifications_active</span>
            </div>
            <p className="text-sm text-amber-800/80 dark:text-amber-400 font-bold leading-relaxed">
              يرجى الاحتفاظ برقم الحجز أو التقاط صورة لهذه الصفحة للرجوع إليها عند الحضور.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <Link
              href={`/${teacherId}`}
              className="w-full px-8 py-5 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-3 active:scale-95 text-sm uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-xl">home</span>
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
