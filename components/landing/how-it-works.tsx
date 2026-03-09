export function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-navy-800/30" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">كيف يعمل جدولي؟</h2>
          <p className="text-slate-600 dark:text-slate-400">ثلاث خطوات بسيطة تبدأ بها تنظيم عملك الدراسي</p>
        </div>
        <div className="relative">
          {/* Line background */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-navy-700 -translate-y-1/2 -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-white dark:ring-navy-900">1</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">أنشئ مجموعة جديدة</h3>
              <p className="text-slate-600 dark:text-slate-400">حدد المادة والوقت المتاح لطلابك</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-white dark:ring-navy-900">2</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">شارك رابط الحجز</h3>
              <p className="text-slate-600 dark:text-slate-400">أرسل الرابط لطلابك في مجموعات الواتساب</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-white dark:ring-navy-900">3</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">تابع الحجوزات</h3>
              <p className="text-slate-600 dark:text-slate-400">استقبل الحجوزات وقم بتأكيدها في لحظات</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
