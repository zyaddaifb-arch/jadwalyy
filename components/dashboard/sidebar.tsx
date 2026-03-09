'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'لوحة التحكم', href: '/dashboard', icon: 'dashboard' },
    { name: 'المجموعات', href: '/dashboard/groups', icon: 'groups' },
    { name: 'الحجوزات', href: '/dashboard/bookings', icon: 'event_available' },
    { name: 'صفحة الحجز', href: '/dashboard/booking-page', icon: 'public' },
    { name: 'الإعدادات', href: '/dashboard/settings', icon: 'settings' },
  ];

  return (
    <aside className="w-64 bg-sidebar-dark text-white hidden lg:flex flex-col fixed inset-y-0 right-0 z-50 border-l border-slate-800">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-white text-2xl">calendar_month</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">جدولي</h1>
          <p className="text-slate-400 text-xs font-medium">نظام الإدارة الذكي</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:scale-[1.02] hover:shadow-sm'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-2xl border border-slate-700/50">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZhlc6ZhtncXZYX5__tXjJFO6F7bXWwY7OTB67tJxdWWF4mxSU2vgFAVA1RHKKGeBylZ5M2MFfd73X5SPsG-sx6KuspesT8ebHfhfH91SdtEVaa6X8LGmM7xbwFNaC9s2LW16m_Wqe-umVr4aAoEq170O8shNo5QvjH6fuQ1ZzceKC0Cod63xOPIcpDJkLn9NdtpikOFdo_vyy2kDr765nmdah4Q7TobIvN5LIRj2LeAAouSaM99FGse5uM5e9OMs5SncAUO6LmM" 
            alt="أ. أحمد محمد" 
            className="w-10 h-10 rounded-full bg-slate-700 ring-2 ring-slate-700 object-cover"
          />
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold truncate text-white">أ. أحمد محمد</p>
            <p className="text-[10px] text-slate-400 truncate uppercase tracking-wider">معلم فيزياء</p>
          </div>
          <button className="text-slate-500 hover:text-red-400 transition-colors">
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
