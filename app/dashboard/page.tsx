"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const initialGroups = [
  {
    id: 1,
    name: "المجموعة المكثفة أ",
    subject: "اللغة العربية",
    time: "الأحد، ٠٤:٠٠ م",
    seats: "١٨ / ٢٠",
    status: "نشط",
    color: "bg-primary",
    statusColor: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
  },
  {
    id: 2,
    name: "مراجعة ليلة الامتحان",
    subject: "الأدب والنحو",
    time: "الثلاثاء، ٠٦:٠٠ م",
    seats: "٤٥ / ٥٠",
    status: "شبه مكتمل",
    color: "bg-purple-500",
    statusColor: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
  },
  {
    id: 3,
    name: "تأسيس البلاغة",
    subject: "البلاغة",
    time: "الأربعاء، ٠٨:٠٠ م",
    seats: "٠٥ / ٢٠",
    status: "متاح",
    color: "bg-slate-300",
    statusColor: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
  },
  {
    id: 4,
    name: "الدفعة المتميزة ج",
    subject: "اللغة العربية",
    time: "السبت، ٠١:٠٠ م",
    seats: "٢٠ / ٢٠",
    status: "مكتمل",
    color: "bg-red-400",
    statusColor: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
  },
  {
    id: 5,
    name: "مجموعة المراجعة النهائية",
    subject: "النصوص",
    time: "الخميس، ٠٥:٠٠ م",
    seats: "٠ / ٣٠",
    status: "قيد المراجعة",
    color: "bg-yellow-500",
    statusColor: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
  }
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredGroups = initialGroups.filter(group => 
    group.name.includes(searchQuery) || 
    group.subject.includes(searchQuery) ||
    group.status.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const paginatedGroups = filteredGroups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-8">
      {/* Top Bar */}
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">مرحباً بك مجدداً</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <input 
              type="text" 
              placeholder="بحث عن طالب أو مجموعة..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="peer w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pr-11 focus:pr-4 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none shadow-sm hover:border-slate-300 dark:hover:border-slate-600"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl peer-focus:opacity-0 peer-focus:invisible pointer-events-none transition-all duration-200">search</span>
          </div>
          <Link href="/dashboard/groups/create" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">add_circle</span>
            <span>إنشاء مجموعة</span>
          </Link>
          <ThemeToggle />
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-orange-50/30 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/50 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200 dark:shadow-none">
              <span className="material-symbols-outlined text-white">folder</span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">إجمالي المجموعات</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">١٢</h4>
        </div>
        <div className="bg-blue-50/30 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
              <span className="material-symbols-outlined text-white">confirmation_number</span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">إجمالي الحجوزات</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">١٤٥</h4>
        </div>
        <div className="bg-purple-50/30 dark:bg-purple-900/10 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-200 dark:shadow-none">
              <span className="material-symbols-outlined text-white">chair</span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">المقاعد المتبقية</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">٢٨</h4>
        </div>
        <div className="bg-green-50/30 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-800/50 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
              <span className="material-symbols-outlined text-white">verified</span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">المجموعات المكتملة</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">٨</h4>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">نظرة عامة على المجموعات</h3>
          <Link href="/dashboard/groups" className="text-primary text-sm font-medium hover:underline">عرض الكل</Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full">المستوى ١</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">أساسيات القراءة والكتابة</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">الإثنين والأربعاء | ٥:٣٠ مساءً</p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">سعة المجموعة: ١٠ / ٢٥</p>
            </div>
            <div className="relative flex items-center justify-center w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-slate-100 dark:text-slate-800"></circle>
                <circle cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray="213.6" strokeDashoffset="128.16" strokeLinecap="round" className="text-emerald-500"></circle>
              </svg>
              <span className="absolute text-xs font-bold text-slate-700 dark:text-white">٤٠٪</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded-full">المستوى ٥</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">مجموعة النحو العربي</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">الأحد والثلاثاء | ٤:٠٠ عصراً</p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">سعة المجموعة: ١٥ / ٢٠</p>
            </div>
            <div className="relative flex items-center justify-center w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-slate-100 dark:text-slate-800"></circle>
                <circle cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray="213.6" strokeDashoffset="53.4" strokeLinecap="round" className="text-blue-500"></circle>
              </svg>
              <span className="absolute text-xs font-bold text-slate-700 dark:text-white">٧٥٪</span>
            </div>
          </div>
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
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {paginatedGroups.length > 0 ? (
                paginatedGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="group relative flex items-center justify-center">
                          <div className={`w-2.5 h-2.5 rounded-full ${group.color} cursor-help`}></div>
                          <div className="absolute bottom-full mb-2 hidden group-hover:block w-max bg-slate-800 dark:bg-slate-700 text-white text-[10px] rounded px-2 py-1 shadow-lg z-10">
                            {group.status}
                          </div>
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{group.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">{group.subject}</td>
                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">{group.time}</td>
                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">{group.seats}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${group.statusColor}`}>
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    لا توجد مجموعات مطابقة للبحث
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
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === idx + 1 
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
