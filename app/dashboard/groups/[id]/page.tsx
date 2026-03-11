import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';

export default async function GroupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch the group
  const { data: group, error: groupError } = await supabase
    .from('groups')
    .select(`
      *,
      bookings (*)
    `)
    .eq('id', id)
    .single();

  if (groupError || !group) {
    console.error('Group Fetch Error:', groupError);
    notFound();
  }

  // Verify ownership
  if (group.teacher_id !== user.id) {
    redirect('/dashboard/groups');
  }

  const { bookings } = group;
  const isFull = group.seats_reserved >= group.seats_total;

  // Quick status display based on active and seats_reserved
  const statusLabel = group.status === 'ملغي' ? 'ملغي' : isFull ? 'مكتمل' : 'متاح للحجز';
  const statusStyles = statusLabel === 'متاح للحجز'
    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    : statusLabel === 'مكتمل'
      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';

  return (
    <div className="p-6 space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">تفاصيل المجموعة</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">عرض بيانات المجموعة، حالة الحجز، والطلاب المسجلين في مكان واحد</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/groups" className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
            العودة إلى المجموعات
          </Link>
          <Link href={`/${user.id}/${group.id}`} target="_blank" className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-lg">public</span>
            معاينة الصفحة العامة
          </Link>
        </div>
      </header>
// turbo-all
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary/40">science</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${statusStyles}`}>
                    {statusLabel}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{group.name}</h3>
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-500">السعة الاستيعابية</p>
                  <p className="text-lg font-bold text-primary">{group.seats_reserved} <span className="text-slate-400 text-sm font-normal">/ {group.seats_total} طالب</span></p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">book</span>
                  <span className="text-sm">المادة: {group.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  <span className="text-sm">الوقت: {group.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 col-span-2">
                  <span className="material-symbols-outlined text-lg">info</span>
                  <span className="text-sm">الوصف: {group.description || 'لا يوجد وصف'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">إجراءات سريعة</h4>
          <div className="space-y-3">
            <Link href={`/${user.id}/${group.id}`} target="_blank" className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-primary">share</span>
                <span className="text-sm font-medium">مشاركة رابط الحجز</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">chevron_left</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">الطلاب المسجلين ({bookings.length})</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input
                type="text"
                placeholder="بحث عن طالب..."
                className="w-full sm:w-64 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pr-9 pl-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {bookings.length > 0 ? (
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">اسم الطالب</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">رقم الهاتف</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ولي الأمر</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">المدرسة</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">تاريخ الحجز</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {bookings.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {booking.student_name ? booking.student_name.charAt(0) : '?'}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{booking.student_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300" dir="ltr">{booking.student_phone}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300" dir="ltr">{booking.parent_phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{booking.school || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300" dir="ltr">{new Date(booking.created_at).toLocaleString('ar-EG')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${booking.status === 'نشط'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        : booking.status === 'ملغي'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'
                        }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              لا يوجد طلاب مسجلين في هذه المجموعة حتى الآن.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
