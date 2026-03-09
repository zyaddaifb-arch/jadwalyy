import Link from 'next/link';

export default async function GroupBookingDetails({ params }: { params: Promise<{ teacherId: string, groupId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link href={`/${resolvedParams.teacherId}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-medium bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <span className="material-symbols-outlined text-xl">arrow_forward</span>
        العودة لقائمة المجموعات
      </Link>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-primary to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Content Body */}
        <div className="p-8 relative">
          {/* Group Icon */}
          <div className="absolute -top-12 right-8 w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-4 border-white dark:border-slate-800 flex items-center justify-center">
            <div className="w-full h-full bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-4xl">science</span>
            </div>
          </div>

          <div className="mt-12 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs font-bold rounded-full">متاح للحجز</span>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">الصف الثالث الثانوي</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">مجموعة التفوق (فيزياء)</h1>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              مجموعة مخصصة لطلاب الصف الثالث الثانوي، نركز فيها على شرح المنهج بالتفصيل وحل تدريبات مكثفة على كل فصل مع امتحانات دورية.
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-600 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
                <span className="material-symbols-outlined text-2xl">calendar_month</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">الأيام</h4>
                <p className="text-slate-600 dark:text-slate-300">الأحد والثلاثاء من كل أسبوع</p>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-600 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
                <span className="material-symbols-outlined text-2xl">schedule</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">الوقت</h4>
                <p className="text-slate-600 dark:text-slate-300">٠٤:٠٠ م إلى ٠٦:٠٠ م</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-600 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">المكان</h4>
                <p className="text-slate-600 dark:text-slate-300">سنتر الأوائل - قاعة ب</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-600 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
                <span className="material-symbols-outlined text-2xl">payments</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">الرسوم</h4>
                <p className="text-slate-600 dark:text-slate-300">٢٥٠ جنيه / شهرياً</p>
              </div>
            </div>
          </div>

          {/* Teacher Info */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-10 bg-white dark:bg-slate-800">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZhlc6ZhtncXZYX5__tXjJFO6F7bXWwY7OTB67tJxdWWF4mxSU2vgFAVA1RHKKGeBylZ5M2MFfd73X5SPsG-sx6KuspesT8ebHfhfH91SdtEVaa6X8LGmM7xbwFNaC9s2LW16m_Wqe-umVr4aAoEq170O8shNo5QvjH6fuQ1ZzceKC0Cod63xOPIcpDJkLn9NdtpikOFdo_vyy2kDr765nmdah4Q7TobIvN5LIRj2LeAAouSaM99FGse5uM5e9OMs5SncAUO6LmM" alt="Teacher" className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">مقدمة بواسطة</p>
              <p className="font-bold text-slate-900 dark:text-white text-lg">أ. أحمد العتيبي</p>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
            <div>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">حالة المقاعد</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <p className="font-black text-xl text-slate-900 dark:text-white">متبقي ٥ مقاعد فقط</p>
              </div>
            </div>
            <Link href={`/${resolvedParams.teacherId}/${resolvedParams.groupId}/book`} className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all text-center text-lg active:scale-95 flex items-center justify-center gap-2">
              <span>احجز مقعدك الآن</span>
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
