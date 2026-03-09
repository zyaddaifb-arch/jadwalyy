import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[2.5rem] p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-6">ابدأ الآن وامنح طلابك تجربة حجز أسهل</h2>
            <p className="text-lg lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
              انضم إلى آلاف المدرسين المتميزين واجعل إدارة دروسك أكثر احترافية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-primary hover:bg-slate-50 px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center">إنشاء حساب مجاني</Link>
              <Link href="/login" className="bg-primary-dark/20 border border-white/30 backdrop-blur-sm text-white hover:bg-white/10 px-10 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-center">تسجيل الدخول</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
