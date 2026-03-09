export function Benefits() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-16">لماذا يستخدم المدرسون جدولي؟</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6">
            <div className="text-primary mb-4">
              <span className="material-symbols-outlined text-5xl">timer</span>
            </div>
            <h4 className="text-xl font-bold mb-2">توفير الوقت</h4>
            <p className="text-slate-500 text-sm">وداعاً للمكالمات الطويلة ورسائل الواتساب اللانهائية.</p>
          </div>
          <div className="p-6">
            <div className="text-primary mb-4">
              <span className="material-symbols-outlined text-5xl">inventory</span>
            </div>
            <h4 className="text-xl font-bold mb-2">تنظيم أفضل</h4>
            <p className="text-slate-500 text-sm">كل بيانات الطلاب ومواعيدهم في ملف واحد منظم.</p>
          </div>
          <div className="p-6">
            <div className="text-primary mb-4">
              <span className="material-symbols-outlined text-5xl">task_alt</span>
            </div>
            <h4 className="text-xl font-bold mb-2">تقليل العشوائية</h4>
            <p className="text-slate-500 text-sm">لا مزيد من الحجوزات المتكررة أو نسيان المواعيد.</p>
          </div>
          <div className="p-6">
            <div className="text-primary mb-4">
              <span className="material-symbols-outlined text-5xl">mood</span>
            </div>
            <h4 className="text-xl font-bold mb-2">تجربة أسهل</h4>
            <p className="text-slate-500 text-sm">سهولة في الحجز تزيد من رضا الطلاب وأولياء الأمور.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
