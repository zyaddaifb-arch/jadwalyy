import Link from 'next/link';

export default function BookingsPage() {
  return (
    <div className="p-10 pb-20">
      <header className="flex flex-wrap justify-between items-start gap-6 mb-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3">إدارة الحجوزات</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">تتبع جميع حجوزات الطلاب، تأكيد الدفعات، وإدارة قوائم الانتظار بسهولة.</p>
        </div>
        <div className="flex items-center gap-3 sticky top-8 z-40">
          <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-xl">file_download</span>
            <span>تصدير البيانات</span>
          </button>
          <button className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">add</span>
            <span>إضافة حجز يدوي</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-bold mb-1">إجمالي الحجوزات</p>
            <h4 className="text-3xl font-black text-slate-900 dark:text-white">١٤٥</h4>
          </div>
          <div className="size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">confirmation_number</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-bold mb-1">حجوزات مؤكدة</p>
            <h4 className="text-3xl font-black text-green-600 dark:text-green-400">١٢٠</h4>
          </div>
          <div className="size-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-bold mb-1">قيد الانتظار</p>
            <h4 className="text-3xl font-black text-orange-500 dark:text-orange-400">٢٥</h4>
          </div>
          <div className="size-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500">
            <span className="material-symbols-outlined text-3xl">pending_actions</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full gap-1 w-full lg:w-auto overflow-x-auto">
            <button className="px-6 py-2 text-sm font-bold bg-white dark:bg-slate-700 text-primary shadow-sm rounded-full whitespace-nowrap transition-all ring-1 ring-slate-200/50 dark:ring-slate-600">الكل</button>
            <button className="px-6 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all rounded-full">المؤكدة</button>
            <button className="px-6 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all rounded-full">قيد الانتظار</button>
            <button className="px-6 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all rounded-full">الملغاة</button>
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                type="text" 
                placeholder="بحث برقم الهاتف أو الاسم..." 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pr-12 pl-4 py-2.5 focus:ring-2 focus:ring-primary/20 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none text-sm"
              />
            </div>
            <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">رقم الحجز</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">الطالب</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">المجموعة</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">تاريخ الحجز</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-5 text-sm font-mono text-slate-500 dark:text-slate-400">#BK-1024</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">أ</div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">أحمد محمود</p>
                      <p className="text-xs text-slate-500">01012345678</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">مجموعة التفوق</p>
                  <p className="text-xs text-slate-500">الفيزياء</p>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">١٥ أكتوبر، ٠٢:٣٠ م</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">مؤكد</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="عرض التفاصيل">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="إلغاء الحجز">
                      <span className="material-symbols-outlined text-lg">cancel</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-5 text-sm font-mono text-slate-500 dark:text-slate-400">#BK-1025</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">س</div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">سارة علي</p>
                      <p className="text-xs text-slate-500">01198765432</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">نخبة الرياضيات</p>
                  <p className="text-xs text-slate-500">الرياضيات</p>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">١٦ أكتوبر، ١٠:١٥ ص</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">قيد الانتظار</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="تأكيد الحجز">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="عرض التفاصيل">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <span className="text-sm text-slate-500">عرض ١-٢ من أصل ١٤٥ حجز</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">السابق</button>
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">التالي</button>
          </div>
        </div>
      </div>
    </div>
  );
}
