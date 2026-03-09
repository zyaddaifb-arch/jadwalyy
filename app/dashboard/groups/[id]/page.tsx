import Link from 'next/link';

export default function GroupDetailsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
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
          <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-lg">edit</span>
            تعديل المجموعة
          </button>
        </div>
      </header>

      {/* Main Summary Card */}
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                    متاح للحجز
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">مجموعة الفيزياء - المستوى الأول</h3>
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-500">السعة الاستيعابية</p>
                  <p className="text-lg font-bold text-primary">15 <span className="text-slate-400 text-sm font-normal">/ 20 طالب</span></p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">book</span>
                  <span className="text-sm">المادة: الفيزياء</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  <span className="text-sm">الوقت: 04:00 مساءً</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  <span className="text-sm">الأيام: الأحد، الثلاثاء</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                  <span className="text-sm">المكان: قاعة أ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">إجراءات سريعة</h4>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-primary">share</span>
                <span className="text-sm font-medium">مشاركة رابط الحجز</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">chevron_left</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-green-500">qr_code_scanner</span>
                <span className="text-sm font-medium">تحميل رمز QR</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">chevron_left</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-orange-500">pause_circle</span>
                <span className="text-sm font-medium">إيقاف الحجز مؤقتاً</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">chevron_left</span>
            </button>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">الطلاب المسجلين (15)</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input 
                type="text" 
                placeholder="بحث عن طالب..." 
                className="w-full sm:w-64 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pr-9 pl-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">اسم الطالب</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">رقم الهاتف</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">تاريخ الحجز</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">حالة الدفع</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">أ</div>
                    <span className="font-medium text-slate-900 dark:text-white">أحمد محمود</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">01012345678</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">15 أكتوبر 2023</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">تم الدفع</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-slate-400 hover:text-red-500 transition-colors" title="إلغاء الحجز">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">س</div>
                    <span className="font-medium text-slate-900 dark:text-white">سارة علي</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">01198765432</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">16 أكتوبر 2023</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">قيد الانتظار</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-slate-400 hover:text-red-500 transition-colors" title="إلغاء الحجز">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
