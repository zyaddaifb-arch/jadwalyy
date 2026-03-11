import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-20" id="cta">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Free Plan Banner */}
        <div className="mb-10 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-[2rem] p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-full text-sm font-black mb-4">
            <span className="material-symbols-outlined text-base">star</span>
            <span>مجاني 100% الآن</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">لا تحتاج إلى بطاقة ائتمانية</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
            جدولي مجانية بالكامل الآن — أنشئ حسابك واستخدم جميع المميزات بلا قيود.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-bold">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <span className="material-symbols-outlined text-xl">check_circle</span>
              <span>مجموعات غير محدودة</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <span className="material-symbols-outlined text-xl">check_circle</span>
              <span>حجوزات غير محدودة</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <span className="material-symbols-outlined text-xl">check_circle</span>
              <span>صفحة حجز عامة</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <span className="material-symbols-outlined text-xl">check_circle</span>
              <span>لوحة تحكم كاملة</span>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-primary rounded-[2.5rem] p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-6">ابدأ الآن وامنح طلابك تجربة حجز أسهل</h2>
            <p className="text-lg lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
              انضم إلى آلاف المدرسين المتميزين واجعل إدارة دروسك أكثر احترافية. مجانًا وبدون أي التزامات.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-primary hover:bg-slate-50 px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">rocket_launch</span>
                <span>إنشاء حساب مجاني</span>
              </Link>
              <Link href="/login" className="bg-primary-dark/20 border border-white/30 backdrop-blur-sm text-white hover:bg-white/10 px-10 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-center">تسجيل الدخول</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
