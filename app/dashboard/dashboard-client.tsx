'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { StatsCard } from '@/components/dashboard/stats-card';

interface Group {
  id: string;
  name: string;
  subject: string;
  time: string;
  seats_total: number;
  seats_reserved: number;
  status: string;
  color: string;
}

interface Profile {
  id: string;
  full_name: string;
}

interface DashboardClientProps {
  initialGroups: Group[];
  profile: Profile | null;
}

export function DashboardClient({ initialGroups, profile }: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredGroups = initialGroups.filter((group) => {
    const name = group.name || "";
    const subject = group.subject || "";
    const status = group.status || "";
    const query = searchQuery.toLowerCase();

    return name.toLowerCase().includes(query) ||
      subject.toLowerCase().includes(query) ||
      status.toLowerCase().includes(query);
  });

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const paginatedGroups = filteredGroups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalReservations = initialGroups.reduce((acc, g) => acc + g.seats_reserved, 0);
  const totalSeats = initialGroups.reduce((acc, g) => acc + g.seats_total, 0);
  const remainingSeats = totalSeats - totalReservations;
  const completedGroups = initialGroups.filter(g => g.status === 'مكتمل' || g.seats_reserved >= g.seats_total).length;

  return (
    <div className="p-8">
      {/* Search and Quick Actions Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
             أهلاً بك، أ/ {profile?.full_name || ''} 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">إليك ملخص سريع لنشاطك اليوم في جدولي</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="بحث سريع..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pr-11 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none shadow-sm group-hover:border-slate-300 dark:group-hover:border-slate-700"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl transition-colors group-focus-within:text-primary">search</span>
          </div>

          <Link href="/dashboard/groups/create" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95">
            <span className="material-symbols-outlined text-xl">add_box</span>
            <span>إنشاء مجموعة</span>
          </Link>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Quick Actions Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Link href="/dashboard/groups/create" className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all hover:shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined">add_circle</span>
          </div>
          <span className="text-sm font-black text-slate-700 dark:text-slate-300">مجموعة جديدة</span>
        </Link>
        <Link href="/dashboard/bookings" className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-300/30 transition-all hover:shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <span className="material-symbols-outlined">how_to_reg</span>
          </div>
          <span className="text-sm font-black text-slate-700 dark:text-slate-300">إدارة الحجوزات</span>
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-300/30 transition-all hover:shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all">
            <span className="material-symbols-outlined">settings_account_box</span>
          </div>
          <span className="text-sm font-black text-slate-700 dark:text-slate-300">تعديل الملف</span>
        </Link>
        <Link href={`/${profile?.id}`} target="_blank" className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300/30 transition-all hover:shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
            <span className="material-symbols-outlined">visibility</span>
          </div>
          <span className="text-sm font-black text-slate-700 dark:text-slate-300">معاينة الصفحة</span>
        </Link>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard
          label="المجموعات"
          value={initialGroups.length}
          icon="folder_open"
          description="مجموع المجموعات الدراسية المضافة"
          color="blue"
        />
        <StatsCard
          label="إجمالي الحجوزات"
          value={totalReservations}
          icon="confirmation_number"
          description="عدد الطلاب المشتركين حالياً"
          color="emerald"
        />
        <StatsCard
          label="المقاعد المتاحة"
          value={remainingSeats}
          icon="event_seat"
          description="إجمالي المقاعد الشاغرة حالياً"
          color="orange"
        />
        <StatsCard
          label="المكتملة"
          value={completedGroups}
          icon="verified"
          description="المجموعات التي استنفدت مقاعدها"
          color="purple"
        />
      </section>

      {/* Overview */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">نظرة عامة على المجموعات</h3>
          <Link href="/dashboard/groups" className="text-primary text-sm font-medium hover:underline">عرض الكل</Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {initialGroups.slice(0, 2).length > 0 ? (
            initialGroups.slice(0, 2).map((group, index) => {
              const percent = group.seats_total > 0 ? Math.round((group.seats_reserved / group.seats_total) * 100) : 0;
              const circumference = 213.6;
              const offset = circumference - (percent / 100) * circumference;
              return (
                <div key={group.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                  <div className="relative flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 ${index % 2 === 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'} text-[11px] font-bold rounded-lg border border-current/10`}>
                        {group.subject}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">schedule</span>
                        {group.time}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{group.name}</h4>
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                        <span>نسبة الإشغال</span>
                        <span>{group.seats_reserved} / {group.seats_total} طالب</span>
                      </p>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${index % 2 === 0 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-20 h-20 transform -rotate-90 drop-shadow-sm">
                      <circle cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-slate-100 dark:text-slate-800"></circle>
                      <circle cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={`${index % 2 === 0 ? "text-emerald-500" : "text-blue-500"} transition-all duration-1000 ease-out`}></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-black text-slate-900 dark:text-white">{percent}٪</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 lg:col-span-2 text-center py-12 px-6 flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-3xl text-slate-300">group_add</span>
              </div>
              <div>
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">لا توجد مجموعات حتى الآن</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">ابدأ بإنشاء مجموعتك الأولى لتبدأ باستقبال الطلاب وتنظيم مواعيدك بذكاء.</p>
              </div>
              <Link href="/dashboard/groups/create" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                <span>اضغط هنا لإنشاء مجموعة</span>
                <span className="material-symbols-outlined text-lg">arrow_left</span>
              </Link>
            </div>
          )}
        </div>
      </section>


      {/* Upcoming Groups Table */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">المجموعات القادمة</h3>
          <Link href="/dashboard/groups" className="text-primary text-sm font-medium hover:underline">عرض الكل</Link>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">المجموعة</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">المادة</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">الموعد</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">المقاعد</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedGroups.length > 0 ? (
                paginatedGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${group.seats_reserved >= group.seats_total ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'} flex items-center justify-center`}>
                          <span className="material-symbols-outlined text-2xl font-light">science</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white leading-tight">{group.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">ID: {group.id.split('-')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg">{group.subject}</span>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-600 dark:text-slate-400">{group.time}</td>
                    <td className="px-6 py-5 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 dark:text-white">{group.seats_reserved}</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-500">{group.seats_total}</span>
                        <span className="text-[10px] text-slate-400 mr-1">طالب</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black rounded-full ${group.seats_reserved >= group.seats_total
                        ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${group.seats_reserved >= group.seats_total ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                        {group.seats_reserved >= group.seats_total ? 'مكتملة' : 'متاحة'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Link href={`/dashboard/groups/${group.id}`} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all mx-auto">
                        <span className="material-symbols-outlined text-xl italic">edit_note</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="material-symbols-outlined text-4xl text-slate-200">folder_off</span>
                      <p className="text-sm font-medium text-slate-500">لا توجد لديك أي مجموعات حالياً تطابق البحث</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                إظهار <span className="font-medium text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> إلى <span className="font-medium text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredGroups.length)}</span> من أصل <span className="font-medium text-slate-900 dark:text-white">{filteredGroups.length}</span> نتائج
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === idx + 1
                      ? 'bg-primary text-white'
                      : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
