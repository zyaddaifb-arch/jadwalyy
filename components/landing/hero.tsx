import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span className="text-sm font-semibold tracking-wide">الخيار الأول للمعلمين في العالم العربي</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black leading-[1.2] text-slate-900 dark:text-white mb-6">
              نظّم مجموعاتك الدراسية واستقبل حجوزات الطلاب بسهولة
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl">
              جدولي يساعدك على إنشاء المجموعات الدراسية، تحديد عدد المقاعد، متابعة حجوزات الطلاب، ومشاركة صفحة حجز سهلة مع طلابك — كل ذلك من مكان واحد وبأقل مجهود.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl shadow-primary/25 flex items-center justify-center gap-2">
                <span>ابدأ مجانًا الآن</span>
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <button className="bg-white dark:bg-navy-800 text-slate-900 dark:text-white border border-slate-200 dark:border-navy-700 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:bg-slate-50 dark:hover:bg-navy-700 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                <span>شاهد كيف يعمل</span>
              </button>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2 space-x-reverse">
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-navy-900 bg-slate-300 overflow-hidden relative">
                  <Image fill alt="Student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSNRU7GkfWmPV2GGKDVB__g6B0Ohx9A22S7x5e0t-rTg7Zo-hG-xCbG1XbwKkGDCF5JalSGqRl2W7foaerDPtoZP6rquumlL-8uLWgwzxEAJyZYvh2SPNcWP9fxRD_Rnqz3TQgyoSBmbvk0-JcTHFuCpHSCAxoI-vAUMwN-xZ5qGPwXHfbJ2lPS5OUF4KRdC3ajpl6p7011rNUjQ_NqzKvC4aONhXNFRw0JaPs-31ho7LU1mKCJNXrGV9SghpFX1_X6figS-OdFaY" referrerPolicy="no-referrer" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-navy-900 bg-slate-400 overflow-hidden relative">
                  <Image fill alt="Student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp4fIOTsGJMteva4ClmlbBp2HZiINW2AiJ_JxCdC0Gop6ypdKz8X_giNroh57C0dt1MIVUOqwSDasRJ33edTkOX7iOh17ae87Spm3GNQCJKcC-5OJVvOJ59Tllu1xQzA7h_7cniU1F6KTJ4tm3WI9Mbn_AtzxO4hf1GIIiD7t8Qk6WlDu2M6A4L397acgV0KkA81-OLT40SCGlKZLyjbkWHaO6gK6PPjGlqRmQe0jZaEmyC9bWBDFDgUz5nnGZQjCPn67QObtS1rY" referrerPolicy="no-referrer" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-navy-900 bg-slate-500 overflow-hidden relative">
                  <Image fill alt="Student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl7asa8kH3ufr2ixVTtUaPTxN4hdrMvHqOem63NDdviQs2PJwmhf7g-CPSyBWFoevM9bUlLyADHyH8wECfucpFfD_CeVtINu_D960rTkIzYUmv2OMg-M64heuchfQPLAnbOAWBPBOJYlJBIvarKsVpIgDgIETkT8q6x70505ETRyUloGSpOcPecJuVfkLUBGKEj2E3CjXHNbQfln0L0HoP5QDn6jHCJHuTMNFc4Xj0rM_pvpKvQTX4bR9wAgg1c9i7pqRxisoLsUM" referrerPolicy="no-referrer" />
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">انضم إلى <span className="text-slate-900 dark:text-white font-bold">+5,000</span> مدرس وطالب يستخدمون المنصة</p>
            </div>
          </div>
          {/* Mockup */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-navy-800 rounded-[2rem] border border-slate-200 dark:border-navy-700 shadow-2xl overflow-hidden aspect-[4/3]">
                <div className="h-8 bg-slate-100 dark:bg-navy-700 w-full flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="p-4 sm:p-8 space-y-6 h-full bg-gradient-to-br from-white to-slate-50 dark:from-navy-800 dark:to-navy-900">
                  {/* Dashboard Mockup Inner */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-4 w-32 bg-slate-200 dark:bg-navy-700 rounded-full"></div>
                    <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white dark:bg-navy-700 rounded-2xl border border-slate-100 dark:border-navy-600 shadow-sm">
                      <div className="h-2 w-16 bg-primary/30 rounded mb-4"></div>
                      <div className="h-6 w-10 bg-slate-300 dark:bg-navy-500 rounded"></div>
                    </div>
                    <div className="p-4 bg-white dark:bg-navy-700 rounded-2xl border border-slate-100 dark:border-navy-600 shadow-sm">
                      <div className="h-2 w-16 bg-blue-400/30 rounded mb-4"></div>
                      <div className="h-6 w-10 bg-slate-300 dark:bg-navy-500 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-12 w-full bg-slate-100 dark:bg-navy-700 rounded-xl flex items-center px-4 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/20"></div>
                        <div className="h-3 w-32 bg-slate-300 dark:bg-navy-500 rounded"></div>
                      </div>
                      <div className="h-6 w-16 bg-green-500/20 rounded-full"></div>
                    </div>
                    <div className="h-12 w-full bg-slate-100 dark:bg-navy-700 rounded-xl flex items-center px-4 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/20"></div>
                        <div className="h-3 w-40 bg-slate-300 dark:bg-navy-500 rounded"></div>
                      </div>
                      <div className="h-6 w-16 bg-primary/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Student Booking Preview Float */}
              <div className="absolute -bottom-10 -right-10 hidden sm:block w-56 bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/10">
                <p className="text-[10px] text-slate-400 mb-2">معاينة الطالب</p>
                <div className="h-8 w-full bg-primary rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-xs text-white font-bold">احجز مقعدك الآن</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-slate-500/30 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-slate-500/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
