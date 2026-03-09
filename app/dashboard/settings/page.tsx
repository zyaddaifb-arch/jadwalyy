export default function SettingsPage() {
  return (
    <div className="p-10 pb-20">
      <header className="flex flex-wrap justify-between items-start gap-6 mb-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3">الإعدادات</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">إدارة حسابك، تفضيلات الإشعارات، وإعدادات النظام.</p>
        </div>
        <div className="flex items-center gap-3 sticky top-8 z-40">
          <button className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">save</span>
            <span>حفظ التغييرات</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="flex flex-col gap-2 sticky top-24">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold text-right w-full transition-colors">
              <span className="material-symbols-outlined">person</span>
              الملف الشخصي
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium text-right w-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              الإشعارات
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium text-right w-full transition-colors">
              <span className="material-symbols-outlined">security</span>
              الأمان وكلمة المرور
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium text-right w-full transition-colors">
              <span className="material-symbols-outlined">payments</span>
              طرق الدفع
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">المعلومات الأساسية</h3>
            <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
              <div className="relative group cursor-pointer shrink-0">
                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZhlc6ZhtncXZYX5__tXjJFO6F7bXWwY7OTB67tJxdWWF4mxSU2vgFAVA1RHKKGeBylZ5M2MFfd73X5SPsG-sx6KuspesT8ebHfhfH91SdtEVaa6X8LGmM7xbwFNaC9s2LW16m_Wqe-umVr4aAoEq170O8shNo5QvjH6fuQ1ZzceKC0Cod63xOPIcpDJkLn9NdtpikOFdo_vyy2kDr765nmdah4Q7TobIvN5LIRj2LeAAouSaM99FGse5uM5e9OMs5SncAUO6LmM" alt="Profile" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white">photo_camera</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">الاسم الأول</label>
                  <input type="text" defaultValue="أحمد" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">الاسم الأخير</label>
                  <input type="text" defaultValue="محمد" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">البريد الإلكتروني</label>
                  <input type="email" defaultValue="ahmed@example.com" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all" dir="ltr" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رقم الهاتف</label>
                  <div className="flex" dir="ltr">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm">
                      +20
                    </span>
                    <input type="tel" defaultValue="1012345678" className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-r-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">التفضيلات</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">إشعارات الحجز الجديد</h4>
                  <p className="text-sm text-slate-500">تلقي بريد إلكتروني عند قيام طالب بحجز مقعد جديد.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">تذكير المجموعات</h4>
                  <p className="text-sm text-slate-500">تلقي تنبيه قبل بدء المجموعة بساعة.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">الوضع الليلي</h4>
                  <p className="text-sm text-slate-500">تفعيل المظهر الداكن للوحة التحكم.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
