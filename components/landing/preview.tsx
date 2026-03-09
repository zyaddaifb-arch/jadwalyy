import Image from 'next/image';

export function Preview() {
  return (
    <section className="py-24 bg-white dark:bg-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">واجهة بسيطة للمدرس وتجربة حجز سهلة للطالب</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex-shrink-0 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">dashboard</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">لوحة تحكم المدرس</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">تابع المجموعات والحجوزات والمقاعد من مكان واحد، مع إحصائيات دقيقة عن عدد المشتركين في كل حصة.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex-shrink-0 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">touch_app</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">صفحة الحجز للطلاب</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">صفحة واضحة وسهلة تساعد الطلاب على الحجز خلال أقل من دقيقة، متوافقة تماماً مع جميع الهواتف الذكية.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-slate-100 dark:bg-navy-800 rounded-3xl p-4 shadow-2xl overflow-hidden relative aspect-[4/3]">
              <Image fill alt="Dashboard Preview" className="rounded-2xl w-full h-auto grayscale-[0.2] hover:grayscale-0 transition-all duration-500 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6qCa81meECSf0WRUSe5ZKgkR4aAFSjNLwjbpB_GJEzNZQiYvd_xvuupVIDs4pGPWp6FCHdTUeckq7mtactMpEUNPUK_Z7ANnoSpybVrZIyQ9JiCvNXEgsMfAz1bgicZ9XPuwESVb_dhOzPRZUc1nVcbItwn5jLLtQDfc1fzfRDV2iFMJzKxg7UUDc4f5vl57X7PLSlr5LSE5eFns6aPkJp5yFfmveXx-uJ7vYvXPfqEkgwRgT7dGokRY7k3_pyWsezOygoPTLCiQ" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
