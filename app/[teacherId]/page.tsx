import Link from 'next/link';

export default async function TeacherPublicPage({ params }: { params: Promise<{ teacherId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Profile */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-primary/20 to-primary/5"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden mb-6 bg-slate-100 dark:bg-slate-700">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZhlc6ZhtncXZYX5__tXjJFO6F7bXWwY7OTB67tJxdWWF4mxSU2vgFAVA1RHKKGeBylZ5M2MFfd73X5SPsG-sx6KuspesT8ebHfhfH91SdtEVaa6X8LGmM7xbwFNaC9s2LW16m_Wqe-umVr4aAoEq170O8shNo5QvjH6fuQ1ZzceKC0Cod63xOPIcpDJkLn9NdtpikOFdo_vyy2kDr765nmdah4Q7TobIvN5LIRj2LeAAouSaM99FGse5uM5e9OMs5SncAUO6LmM" alt="أ. أحمد العتيبي" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">أ. أحمد العتيبي</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-4">معلم خبير في مادة الفيزياء</p>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            أهلاً بك في منصة حجز الدروس الخاصة بي. يمكنك من خلال هذه الصفحة استعراض المجموعات المتاحة وحجز مقعدك بكل سهولة.
          </p>
        </div>
      </div>

      {/* Available Groups */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">event_available</span>
          المجموعات المتاحة للحجز
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group Card 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">science</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">مجموعة التفوق (فيزياء)</h3>
                  <p className="text-sm text-slate-500">الصف الثالث الثانوي</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs font-bold rounded-full">متاح</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                <span className="material-symbols-outlined text-slate-400">calendar_month</span>
                <span>الأحد والثلاثاء</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                <span className="material-symbols-outlined text-slate-400">schedule</span>
                <span>٠٤:٠٠ م - ٠٦:٠٠ م</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                <span className="material-symbols-outlined text-slate-400">chair</span>
                <span>متبقي ٥ مقاعد</span>
              </div>
            </div>
            <Link href={`/${resolvedParams.teacherId}/1`} className="w-full block text-center bg-slate-50 dark:bg-slate-700/50 hover:bg-primary hover:text-white text-primary font-bold py-3 rounded-xl transition-all border border-slate-200 dark:border-slate-600 hover:border-primary">
              عرض التفاصيل والحجز
            </Link>
          </div>

          {/* Group Card 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">science</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">مراجعة ليلة الامتحان</h3>
                  <p className="text-sm text-slate-500">الصف الثالث الثانوي</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 text-xs font-bold rounded-full">شبه مكتمل</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                <span className="material-symbols-outlined text-slate-400">calendar_month</span>
                <span>الخميس (مكثف)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                <span className="material-symbols-outlined text-slate-400">schedule</span>
                <span>٠٢:٠٠ م - ٠٦:٠٠ م</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                <span className="material-symbols-outlined text-slate-400">chair</span>
                <span>متبقي مقعدين</span>
              </div>
            </div>
            <Link href={`/${resolvedParams.teacherId}/2`} className="w-full block text-center bg-slate-50 dark:bg-slate-700/50 hover:bg-primary hover:text-white text-primary font-bold py-3 rounded-xl transition-all border border-slate-200 dark:border-slate-600 hover:border-primary">
              عرض التفاصيل والحجز
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
