export function Features() {
  return (
    <section className="py-24 bg-white dark:bg-navy-900/50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">كل ما تحتاجه لإدارة الحجز بسهولة</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="group p-8 rounded-3xl border border-slate-100 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 hover:border-primary/50 dark:hover:border-primary transition-all duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">add_box</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">إنشاء مجموعات دراسية بسهولة</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">أنشئ مجموعة جديدة وحدد المادة والموعد وعدد المقاعد خلال دقائق معدودة.</p>
          </div>
          {/* Feature 2 */}
          <div className="group p-8 rounded-3xl border border-slate-100 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 hover:border-primary/50 dark:hover:border-primary transition-all duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">monitoring</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">متابعة حجوزات الطلاب</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">راقب جميع الحجوزات من لوحة تحكم واضحة ومنظمة، واعرف من دفع ومن ينتظر.</p>
          </div>
          {/* Feature 3 */}
          <div className="group p-8 rounded-3xl border border-slate-100 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 hover:border-primary/50 dark:hover:border-primary transition-all duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">share</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">مشاركة صفحة حجز عامة</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">أرسل رابط الحجز لطلابك عبر واتساب ليتمكنوا من اختيار المجموعة المناسبة بأنفسهم.</p>
          </div>
          {/* Feature 4 */}
          <div className="group p-8 rounded-3xl border border-slate-100 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 hover:border-primary/50 dark:hover:border-primary transition-all duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">event_seat</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">إدارة المقاعد وحالة الحجز</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">اعرف عدد المقاعد المتبقية وأغلق الحجز تلقائياً عند اكتمال المجموعة.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
