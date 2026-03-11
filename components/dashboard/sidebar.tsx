'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function Sidebar({ profile }: { profile: any }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

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

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative group overflow-hidden ${isActive
                ? 'bg-primary/10 text-primary'
                : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <span className={`material-symbols-outlined transition-transform duration-300 group-hover:scale-110 ${isActive ? 'fill-current' : ''}`}>{item.icon}</span>
              <span className={`text-sm tracking-tight transition-all duration-300 ${isActive ? 'font-black' : 'font-semibold opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5'}`}>{item.name}</span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(60,131,246,0.6)]"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 bg-slate-900/50">
        <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-2xl border border-slate-700/30 shadow-inner group hover:border-slate-600/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-slate-700 ring-2 ring-slate-800/50 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-slate-400 text-2xl">person</span>
            )}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-black truncate text-white leading-tight">{profile?.full_name || 'جاري التحميل...'}</p>
            <p className="text-[10px] text-slate-500 truncate font-black uppercase tracking-widest mt-0.5">{profile?.subject || 'معلم'}</p>
          </div>
          <button onClick={handleLogout} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all active:scale-90">
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
