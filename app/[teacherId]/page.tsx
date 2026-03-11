import Link from 'next/link';
import { createPublicClient } from '@/lib/supabase/public';
import { notFound } from 'next/navigation';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function TeacherPublicPage({ params }: { params: Promise<{ teacherId: string }> }) {
  const resolvedParams = await params;
  const teacherId = resolvedParams.teacherId;
  const supabase = createPublicClient();

  // Fetch teacher profile & groups in parallel to significantly reduce latency
  const [profileResponse, groupsResponse] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', teacherId).single(),
    supabase.from('groups').select('*').eq('teacher_id', teacherId).order('created_at', { ascending: false })
  ]);

  if (profileResponse.error || !profileResponse.data) {
    return notFound();
  }

  const profile = profileResponse.data;
  const groups = groupsResponse.data || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Profile */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-12 text-center relative overflow-hidden group">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"></div>
        <div className="absolute top-8 left-8 flex items-center gap-1.5 px-4 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
          <span className="material-symbols-outlined text-primary text-xl">verified</span>
          <span className="text-xs font-black text-slate-700 dark:text-slate-200 tracking-tighter">معلم معتمد</span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-36 h-36 rounded-3xl border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden mb-8 bg-slate-100 dark:bg-slate-800 flex items-center justify-center transform group-hover:rotate-2 transition-transform">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-7xl text-slate-300 font-light">person</span>
            )}
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{profile.full_name}</h1>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/5 dark:bg-primary/20 text-primary rounded-xl font-black text-lg mb-6 border border-primary/10">
            <span className="material-symbols-outlined text-2xl">school</span>
            <span>معلم {profile.subject}</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
            مرحباً بك! يمكنك من خلال هذه الصفحة حجز مقعدك في المجموعات الدراسية المتاحة. يتم تحديث المقاعد المتوفرة بشكل لحظي لضمان دقة معلومات الحجز.
          </p>
        </div>
      </div>

      {/* Available Groups */}
      <div className="space-y-8 pb-20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-xl text-3xl">event_note</span>
            المجموعات والدروس المتاحة
          </h2>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">مباشر الآن</span>
          </div>
        </div>

        {groups && groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groups.map((group) => {
              const remainingSeats = group.seats_total - group.seats_reserved;
              const isFull = remainingSeats <= 0;
              const isAlmostFull = remainingSeats > 0 && remainingSeats <= 5;
              const percentFilled = Math.min(100, Math.round((group.seats_reserved / group.seats_total) * 100)) || 0;

              return (
                <div key={group.id} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-primary/5 border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all group flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

                  <div className="flex justify-between items-start mb-6 relative">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isFull ? 'bg-red-50 text-red-500 dark:bg-red-950/30' : 'bg-primary/5 text-primary dark:bg-primary/10'}`}>
                        <span className="material-symbols-outlined text-3xl font-light">group</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight mb-1">{group.name}</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{group.subject}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 relative flex-grow">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                      <span className="material-symbols-outlined text-primary text-2xl">today</span>
                      <span className="font-bold text-sm tracking-tight">{group.time}</span>
                    </div>

                    <div className="px-1 space-y-2">
                      <div className="flex justify-between items-center text-xs font-black">
                        <span className="text-slate-500 dark:text-slate-400">حالة الإشغال</span>
                        <span className={isFull ? 'text-red-600' : isAlmostFull ? 'text-orange-600' : 'text-emerald-600'}>
                          {isFull ? 'اكتمل الحجز' : `متبقي ${remainingSeats} مقعد`}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${isFull ? 'bg-red-500' : isAlmostFull ? 'bg-orange-500' : 'bg-primary'}`} style={{ width: `${percentFilled}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={isFull ? '#' : `/${teacherId}/${group.id}`}
                    className={`w-full py-4 rounded-2xl font-black text-lg transition-all border-2 flex items-center justify-center gap-3 relative overflow-hidden active:scale-95 ${isFull
                      ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed dark:bg-slate-800/10 dark:border-slate-800 dark:text-slate-700'
                      : 'bg-white dark:bg-slate-900 text-primary border-primary/20 hover:bg-primary hover:text-white hover:border-primary shadow-lg shadow-primary/5'
                      }`}
                  >
                    <span>{isFull ? 'المجموعة مكتملة' : 'عرض التفاصيل والحجز'}</span>
                    {!isFull && <span className="material-symbols-outlined text-2xl">arrow_back</span>}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-20 shadow-sm border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-6xl text-slate-200">event_busy</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">لا توجد مجموعات متاحة</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs font-medium">سيتم إضافة مجموعات دراسية جديدة قريباً، يرجى مراجعة الصفحة لاحقاً.</p>
          </div>
        )}
      </div>
    </div>
  );
}
