import Image from 'next/image';

const testimonials = [
  {
    name: 'أ/ محمد العمري',
    subject: 'معلم رياضيات',
    quote: 'جدولي وفر عليّ ساعات من التنظيم اليدوي. الطلاب بيحجزوا لوحدهم!',
    color: 'from-primary/10 to-blue-100',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSNRU7GkfWmPV2GGKDVB__g6B0Ohx9A22S7x5e0t-rTg7Zo-hG-xCbG1XbwKkGDCF5JalSGqRl2W7foaerDPtoZP6rquumlL-8uLWgwzxEAJyZYvh2SPNcWP9fxRD_Rnqz3TQgyoSBmbvk0-JcTHFuCpHSCAxoI-vAUMwN-xZ5qGPwXHfbJ2lPS5OUF4KRdC3ajpl6p7011rNUjQ_NqzKvC4aONhXNFRw0JaPs-31ho7LU1mKCJNXrGV9SghpFX1_X6figS-OdFaY',
  },
  {
    name: 'أ/ سارة الشمري',
    subject: 'مدرسة لغة عربية',
    quote: 'المنصة احترافية جداً! طلابي معجبين بسهولة الحجز وبسرعة الاستجابة.',
    color: 'from-emerald-100 to-teal-50',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp4fIOTsGJMteva4ClmlbBp2HZiINW2AiJ_JxCdC0Gop6ypdKz8X_giNroh57C0dt1MIVUOqwSDasRJ33edTkOX7iOh17ae87Spm3GNQCJKcC-5OJVvOJ59Tllu1xQzA7h_7cniU1F6KTJ4tm3WI9Mbn_AtzxO4hf1GIIiD7t8Qk6WlDu2M6A4L397acgV0KkA81-OLT40SCGlKZLyjbkWHaO6gK6PPjGlqRmQe0jZaEmyC9bWBDFDgUz5nnGZQjCPn67QObtS1rY',
  },
  {
    name: 'أ/ خالد المنصور',
    subject: 'معلم علوم',
    quote: 'بدأت استخدام جدولي وانتهت مشكلة التسجيل اليدوي للطلاب تماماً.',
    color: 'from-orange-50 to-amber-50',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl7asa8kH3ufr2ixVTtUaPTxN4hdrMvHqOem63NDdviQs2PJwmhf7g-CPSyBWFoevM9bUlLyADHyH8wECfucpFfD_CeVtINu_D960rTkIzYUmv2OMg-M64heuchfQPLAnbOAWBPBOJYlJBIvarKsVpIgDgIETkT8q6x70505ETRyUloGSpOcPecJuVfkLUBGKEj2E3CjXHNbQfln0L0HoP5QDn6jHCJHuTMNFc4Xj0rM_pvpKvQTX4bR9wAgg1c9i7pqRxisoLsUM',
  },
];

export function Benefits() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-navy-800/30" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">لماذا يستخدم المدرسون جدولي؟</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">آلاف المعلمين يثقون في جدولي لإدارة دروسهم بكل سهولة</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-6 bg-white dark:bg-navy-800 rounded-2xl border border-slate-100 dark:border-navy-700 text-center shadow-sm">
            <div className="text-primary mb-2">
              <span className="material-symbols-outlined text-5xl">timer</span>
            </div>
            <h4 className="text-xl font-bold mb-1">توفير الوقت</h4>
            <p className="text-slate-500 text-sm">وداعاً للمكالمات الطويلة ورسائل الواتساب اللانهائية.</p>
          </div>
          <div className="p-6 bg-white dark:bg-navy-800 rounded-2xl border border-slate-100 dark:border-navy-700 text-center shadow-sm">
            <div className="text-primary mb-2">
              <span className="material-symbols-outlined text-5xl">inventory</span>
            </div>
            <h4 className="text-xl font-bold mb-1">تنظيم أفضل</h4>
            <p className="text-slate-500 text-sm">كل بيانات الطلاب ومواعيدهم في ملف واحد منظم.</p>
          </div>
          <div className="p-6 bg-white dark:bg-navy-800 rounded-2xl border border-slate-100 dark:border-navy-700 text-center shadow-sm">
            <div className="text-primary mb-2">
              <span className="material-symbols-outlined text-5xl">task_alt</span>
            </div>
            <h4 className="text-xl font-bold mb-1">تقليل العشوائية</h4>
            <p className="text-slate-500 text-sm">لا مزيد من الحجوزات المتكررة أو نسيان المواعيد.</p>
          </div>
          <div className="p-6 bg-white dark:bg-navy-800 rounded-2xl border border-slate-100 dark:border-navy-700 text-center shadow-sm">
            <div className="text-primary mb-2">
              <span className="material-symbols-outlined text-5xl">mood</span>
            </div>
            <h4 className="text-xl font-bold mb-1">تجربة أسهل</h4>
            <p className="text-slate-500 text-sm">سهولة في الحجز تزيد من رضا الطلاب وأولياء الأمور.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`bg-gradient-to-br ${testimonial.color} dark:from-navy-800 dark:to-navy-900 rounded-[2rem] p-8 border border-slate-100/50 dark:border-navy-700 shadow-sm hover:shadow-md transition-all`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 border-2 border-white shadow-md">
                  <Image fill alt={testimonial.name} src={testimonial.avatar} className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-black text-slate-900 dark:text-white text-lg leading-tight">{testimonial.name}</p>
                  <p className="text-primary text-sm font-bold">{testimonial.subject}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-yellow-400 text-xl">star</span>
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
