import Link from 'next/link';

export default function BookingPageManagement() {
  return (
    <div className="p-10 pb-20">
      <header className="flex flex-wrap justify-between items-start gap-6 mb-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3">إدارة صفحة الحجز</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">قم بتخصيص صفحة الحجز الخاصة بك، وإدارة المجموعات المعروضة للطلاب.</p>
        </div>
        <div className="flex items-center gap-3 sticky top-8 z-40">
          <Link href="/teacher-123" target="_blank" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-xl">open_in_new</span>
            <span>معاينة الصفحة</span>
          </Link>
          <button className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">save</span>
            <span>حفظ التغييرات</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              المعلومات الشخصية
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZhlc6ZhtncXZYX5__tXjJFO6F7bXWwY7OTB67tJxdWWF4mxSU2vgFAVA1RHKKGeBylZ5M2MFfd73X5SPsG-sx6KuspesT8ebHfhfH91SdtEVaa6X8LGmM7xbwFNaC9s2LW16m_Wqe-umVr4aAoEq170O8shNo5QvjH6fuQ1ZzceKC0Cod63xOPIcpDJkLn9NdtpikOFdo_vyy2kDr765nmdah4Q7TobIvN5LIRj2LeAAouSaM99FGse5uM5e9OMs5SncAUO6LmM" alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">الاسم المعروض</label>
                  <input type="text" defaultValue="أ. أحمد محمد" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">نبذة تعريفية</label>
                <textarea rows={3} defaultValue="معلم خبير في مادة الفيزياء بخبرة تزيد عن 10 سنوات في تدريس المرحلة الثانوية." className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Displayed Groups */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">view_list</span>
                المجموعات المعروضة
              </h3>
              <button className="text-sm font-medium text-primary hover:underline">تحديد الكل</button>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">مجموعة التفوق</p>
                    <p className="text-xs text-slate-500">الفيزياء • الأربعاء ٤:٠٠ م</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">متاح للحجز</span>
              </label>
              <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">نخبة الرياضيات</p>
                    <p className="text-xs text-slate-500">الرياضيات • الخميس ٢:٠٠ م</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">مكتمل</span>
              </label>
              <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors opacity-60">
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">مراجعة ليلة الامتحان</p>
                    <p className="text-xs text-slate-500">الفيزياء • السبت ١٠:٠٠ ص</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">مخفي</span>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">link</span>
              رابط الصفحة
            </h3>
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-sm text-slate-500 truncate flex-1" dir="ltr">jadwaly.com/t/ahmed-mohamed</span>
              <button className="p-1.5 text-slate-400 hover:text-primary transition-colors" title="نسخ الرابط">
                <span className="material-symbols-outlined text-lg">content_copy</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">palette</span>
              المظهر
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">اللون الأساسي</label>
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900"></button>
                  <button className="w-8 h-8 rounded-full bg-emerald-500"></button>
                  <button className="w-8 h-8 rounded-full bg-purple-500"></button>
                  <button className="w-8 h-8 rounded-full bg-orange-500"></button>
                  <button className="w-8 h-8 rounded-full bg-slate-800 border border-slate-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
