import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { StatsCard } from '@/components/dashboard/stats-card';

export const dynamic = 'force-dynamic';

export default async function GroupsPage() {
  const supabase = await createClient();

  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch groups for the teacher
  const { data: groups, error: groupsError } = await supabase
    .from('groups')
    .select('*')
    .eq('teacher_id', user.id)
    .order('created_at', { ascending: false });

  if (groupsError) {
    console.error('Error fetching groups:', groupsError);
  }

  const validGroups = groups || [];

  // Calculate dynamic stats
  const totalGroups = validGroups.length;
  const availableGroups = validGroups.filter(g => (g.seats_total - g.seats_reserved) > 0).length;
  const completedGroups = validGroups.filter(g => (g.seats_total - g.seats_reserved) <= 0).length;
  const totalReservedSeats = validGroups.reduce((acc, curr) => acc + curr.seats_reserved, 0);

  return (
    <div className="p-10 pb-20">
      <DashboardHeader
        title="إدارة المجموعات"
        description="تتبع الجلسات الدراسية، مستويات الإشغال، وإحصائيات الحجز المباشرة."
      >
        <Link href="/dashboard/groups/create" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 transition-all flex items-center gap-3 active:scale-95 whitespace-nowrap">
          <span className="material-symbols-outlined font-black text-2xl">add_circle</span>
          <span>إنشاء مجموعة جديدة</span>
        </Link>
      </DashboardHeader>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard
          label="إجمالي المجموعات"
          value={totalGroups}
          icon="layers"
          color="blue"
        />
        <StatsCard
          label="مجموعات متاحة"
          value={availableGroups}
          icon="event_available"
          color="emerald"
        />
        <StatsCard
          label="مجموعات مكتملة"
          value={completedGroups}
          icon="task_alt"
          color="orange"
        />
        <StatsCard
          label="إجمالي المحجوز"
          value={totalReservedSeats}
          icon="how_to_reg"
          color="purple"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">المجموعة</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">المادة</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">الإشغال</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">الموعد</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {validGroups.length > 0 ? (
                validGroups.map((group: any) => {
                  const percent = Math.min(100, Math.round((group.seats_reserved / group.seats_total) * 100)) || 0;
                  const isFull = group.seats_reserved >= group.seats_total;
                  return (
                    <tr key={group.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-primary/10">
                            <span className="material-symbols-outlined text-2xl font-light">category</span>
                          </div>
                          <div>
                            <p className="font-black text-slate-900 dark:text-white leading-tight mb-1">{group.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">معرف: {group.id.split('-')[0].toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black rounded-lg border border-slate-200 dark:border-slate-700 uppercase tracking-widest">
                          {group.subject}
                        </span>
                      </td>
                      <td className="px-8 py-6 max-w-[200px]">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
                            <span className="text-slate-400">سعة الحجز</span>
                            <span className={isFull ? 'text-red-600' : 'text-primary'}>{group.seats_reserved} / {group.seats_total}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-200/30 dark:border-slate-700/30">
                            <div className={`h-full rounded-full transition-all duration-1000 ${isFull ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${percent}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-300">
                          <span className="material-symbols-outlined text-primary text-xl font-light">schedule</span>
                          <span>{group.time}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-left">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <Link href={`/${user.id}/${group.id}`} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-400 hover:text-primary border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-110 active:scale-90" title="معاينة الصفحة العامة">
                            <span className="material-symbols-outlined text-xl">open_in_new</span>
                          </Link>
                          <Link href={`/dashboard/groups/${group.id}`} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-400 hover:text-primary border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-110 active:scale-90" title="تعديل المجموعة">
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center bg-white dark:bg-slate-900">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mb-8 rotate-12 group-hover:rotate-0 transition-transform">
                        <span className="material-symbols-outlined text-6xl text-slate-200 font-light">layers</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">ابدأ بإنشاء أول مجموعة لك</h3>
                      <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto leading-relaxed text-lg mb-8">قم بإنشاء مجموعات دراسية وتحديد مواعيدها لتبدأ في استقبال طلبات الحجز من الطلاب.</p>
                      <Link
                        href="/dashboard/groups/create"
                        className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 transition-all flex items-center gap-3 active:scale-95"
                      >
                        <span className="material-symbols-outlined font-black">add_circle</span>
                        <span>إنشاء مجموعة الآن</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
