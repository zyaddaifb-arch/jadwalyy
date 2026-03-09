export function Footer() {
  return (
    <footer className="bg-white dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1 rounded-lg">
                <span className="material-symbols-outlined text-white">calendar_month</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">جدولي</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
              منصة تساعد المدرسين على تنظيم المجموعات وحجوزات الطلاب بسهولة واحترافية. نحن هنا لنوفر وقتك ونقلل مجهودك الإداري.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">عن المنصة</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">المميزات</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">الأسعار</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">المدونة</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">الدعم والمساعدة</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">مركز المساعدة</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">تواصل معنا</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">الشروط والأحكام</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">سياسة الخصوصية</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-navy-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2024 جدولي. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span>صنع بكل حب لدعم التعليم في العالم العربي</span>
            <span className="material-symbols-outlined text-red-500 text-sm">favorite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
