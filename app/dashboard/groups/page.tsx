import Link from 'next/link';

export default function GroupsPage() {
  return (
    <div className="p-10 pb-20">
      <header className="flex flex-wrap justify-between items-start gap-6 mb-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3">إدارة المجموعات</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">تتبع الجلسات الدراسية، مستويات الإشغال، وإحصائيات الحجز المباشرة بمنظور شامل.</p>
        </div>
        <Link href="/dashboard/groups/create" className="sticky top-8 z-40 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-2xl transition-transform">add_circle</span>
          <span className="text-lg">إنشاء مجموعة</span>
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/30 transition-all group">
          <div className="flex items-center gap-5">
            <div className="size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">layers</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold mb-0.5">إجمالي المجموعات</p>
              <h4 className="text-2xl font-black dark:text-white">١٢</h4>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-green-500/30 transition-all group">
          <div className="flex items-center gap-5">
            <div className="size-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">event_available</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold mb-0.5">المجموعات المتاحة</p>
              <h4 className="text-2xl font-black dark:text-white">٨</h4>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-orange-500/30 transition-all group">
          <div className="flex items-center gap-5">
            <div className="size-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">fact_check</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold mb-0.5">المجموعات المكتملة</p>
              <h4 className="text-2xl font-black dark:text-white">٤</h4>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/30 transition-all group">
          <div className="flex items-center gap-5">
            <div className="size-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">airline_seat_recline_extra</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold mb-0.5">إجمالي المقاعد المحجوزة</p>
              <h4 className="text-2xl font-black dark:text-white">٤٩</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full gap-1 w-full lg:w-auto overflow-x-auto">
            <button className="px-8 py-2.5 text-sm font-bold bg-white dark:bg-slate-700 text-primary shadow-sm rounded-full whitespace-nowrap transition-all ring-1 ring-slate-200/50 dark:ring-slate-600">كل المجموعات</button>
            <button className="px-8 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all rounded-full">المتاحة</button>
            <button className="px-8 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all rounded-full">المكتملة</button>
          </div>
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="ابحث بسرعة عن مجموعة، مادة، أو تاريخ..." 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pr-12 pl-4 py-3.5 focus:ring-4 focus:ring-primary/10 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider">اسم المجموعة</th>
                <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">المادة</th>
                <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">التاريخ</th>
                <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">الوقت</th>
                <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">المقاعد</th>
                <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">الحالة</th>
                <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="size-10 flex items-center justify-center shrink-0 text-slate-400">
                      <span className="material-symbols-outlined text-2xl">science</span>
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">مجموعة التفوق</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-slate-600 dark:text-slate-400 font-medium">الفيزياء</td>
                <td className="px-6 py-6 text-slate-600 dark:text-slate-400">الأربعاء، ٢٥ أكتوبر</td>
                <td className="px-6 py-6 text-slate-600 dark:text-slate-400">٤:٠٠ م</td>
                <td className="px-6 py-6">
                  <div className="flex flex-col gap-2 w-40">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>١٢ محجوز</span>
                      <span>٨ متبقي</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800">متاح للحجز</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-3">
                    <Link href="/dashboard/groups/1" className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg transition-all font-bold text-xs whitespace-nowrap bg-primary text-white hover:bg-blue-600 shadow-sm">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                      عرض التفاصيل
                    </Link>
                    <button className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                      <span className="material-symbols-outlined text-2xl">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="size-10 flex items-center justify-center shrink-0 text-slate-400">
                      <span className="material-symbols-outlined text-2xl">calculate</span>
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">نخبة الرياضيات</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-slate-600 dark:text-slate-400 font-medium">الرياضيات</td>
                <td className="px-6 py-6 text-slate-600 dark:text-slate-400">الخميس، ٢٦ أكتوبر</td>
                <td className="px-6 py-6 text-slate-600 dark:text-slate-400">٢:٠٠ م</td>
                <td className="px-6 py-6">
                  <div className="flex flex-col gap-2 w-40">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>١٥ محجوز</span>
                      <span>٠ متبقي</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 border border-orange-200 dark:border-orange-800">مكتمل</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-3">
                    <Link href="/dashboard/groups/2" className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg transition-all font-bold text-xs whitespace-nowrap bg-primary text-white hover:bg-blue-600 shadow-sm">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                      عرض التفاصيل
                    </Link>
                    <button className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                      <span className="material-symbols-outlined text-2xl">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">عرض <span className="font-bold text-slate-900 dark:text-white">١-٢</span> من أصل <span className="font-bold text-slate-900 dark:text-white">١٢</span> مجموعة</span>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center size-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-primary/50 text-slate-500 hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <div className="flex items-center gap-1">
              <button className="size-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">١</button>
              <button className="size-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm">٢</button>
              <button className="size-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm">٣</button>
            </div>
            <button className="flex items-center justify-center size-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-primary/50 text-slate-500 hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
