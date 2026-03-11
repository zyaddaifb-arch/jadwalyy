'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { StatsCard } from '@/components/dashboard/stats-card';

interface Booking {
  id: string;
  student_name: string;
  student_phone: string;
  parent_phone: string;
  school: string;
  status: string;
  created_at: string;
  group_name?: string;
  group_subject?: string;
}

export function BookingsClient({ initialBookings, userId }: { initialBookings: Booking[], userId: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'canceled'>('all');

  const filteredBookings = initialBookings.filter(b => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      (b.student_name || '').toLowerCase().includes(query) ||
      (b.student_phone || '').includes(query) ||
      (b.group_name || '').toLowerCase().includes(query);

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'active' && b.status === 'نشط') ||
      (activeFilter === 'canceled' && b.status === 'ملغي');

    return matchesSearch && matchesFilter;
  });

  const totalBookings = initialBookings.length;
  const activeBookings = initialBookings.filter(b => b.status === 'نشط').length;
  const waitlistBookings = initialBookings.filter(b => b.status === 'قيد الانتظار').length;
  const canceledBookings = initialBookings.filter(b => b.status === 'ملغي').length;

  const handleExport = () => {
    if (filteredBookings.length === 0) return;
    const headers = ['الاسم', 'الهاتف', 'هاتف ولي الأمر', 'المدرسة', 'المجموعة', 'المادة', 'الحالة', 'التاريخ'];
    const rows = filteredBookings.map(b => [
      b.student_name,
      b.student_phone,
      b.parent_phone,
      b.school || '',
      b.group_name || '',
      b.group_subject || '',
      b.status,
      new Date(b.created_at).toLocaleDateString('ar-EG'),
    ]);
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jadwalyy-bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-10 pb-20">
      <DashboardHeader
        title="إدارة الحجوزات"
        description="تتبع جميع حجوزات الطلاب، تأكيد الدفعات، وإدارة المجموعات بسهولة."
      >
        <button
          onClick={handleExport}
          disabled={filteredBookings.length === 0}
          className="bg-white dark:bg-slate-900 px-6 py-3.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-black text-sm flex items-center gap-2 hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-xl">file_download</span>
          <span>تصدير CSV</span>
        </button>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatsCard label="إجمالي الحجوزات" value={totalBookings} icon="receipt_long" color="blue" />
        <StatsCard label="حجوزات نشطة" value={activeBookings} icon="check_circle" color="emerald" />
        <StatsCard label="قيد الانتظار" value={waitlistBookings} icon="pending_actions" color="orange" />
        <StatsCard label="حجوزات ملغاة" value={canceledBookings} icon="cancel" color="red" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30 dark:bg-slate-800/20">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="بحث باسم الطالب أو رقم الهاتف..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pr-12 pl-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none text-sm font-bold"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${activeFilter === 'all' ? 'bg-primary/10 text-primary border-primary/10' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white border-transparent'}`}
            >الكل ({totalBookings})</button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${activeFilter === 'active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white border-transparent'}`}
            >النشطة ({activeBookings})</button>
            <button
              onClick={() => setActiveFilter('canceled')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${activeFilter === 'canceled' ? 'bg-red-100 text-red-700 border-red-200' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white border-transparent'}`}
            >الملغاة ({canceledBookings})</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">الطالب</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">المجموعة</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">بيانات التواصل</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">الحالة</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors ring-1 ring-slate-200/50 dark:ring-slate-700/50 shadow-inner">
                          <span className="material-symbols-outlined font-light text-2xl">person</span>
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white leading-tight mb-1">{booking.student_name}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{booking.school || 'بدون مدرسة'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-black text-slate-800 dark:text-slate-200 text-sm">{booking.group_name || 'مجموعة غير معروفة'}</p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">{booking.group_subject}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-400">
                          <span className="material-symbols-outlined text-[16px] text-slate-400">phone_iphone</span>
                          <span dir="ltr">{booking.student_phone}</span>
                        </div>
                        {booking.parent_phone && (
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                            <span className="material-symbols-outlined text-[16px]">family_restroom</span>
                            <span dir="ltr">{booking.parent_phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'نشط'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                        : booking.status === 'ملغي'
                          ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                          : 'bg-orange-500/10 text-orange-600 border border-orange-500/20'
                        }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs font-black text-slate-700 dark:text-slate-300">
                        {new Date(booking.created_at).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                        {new Date(booking.created_at).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center bg-white dark:bg-slate-900">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mb-8">
                        <span className="material-symbols-outlined text-6xl text-slate-200">receipt_long</span>
                      </div>
                      {searchQuery || activeFilter !== 'all' ? (
                        <>
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">لا توجد نتائج</h3>
                          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">جرب تغيير كلمة البحث أو الفلتر.</p>
                          <button onClick={() => { setSearchQuery(''); setActiveFilter('all'); }} className="mt-6 text-primary font-black text-sm hover:underline">إعادة تعيين الفلاتر</button>
                        </>
                      ) : (
                        <>
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">لا توجد حجوزات حتى الآن</h3>
                          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto leading-relaxed text-lg">بمجرد قيام الطلاب بالحجز عبر صفحتك العامة، ستظهر جميع بياناتهم هنا.</p>
                          {userId && (
                            <Link href={`/${userId}`} target="_blank" className="mt-8 flex items-center gap-2 text-primary font-black text-sm hover:underline">
                              <span>زيارة صفحة الحجز العامة</span>
                              <span className="material-symbols-outlined text-lg">open_in_new</span>
                            </Link>
                          )}
                        </>
                      )}
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
