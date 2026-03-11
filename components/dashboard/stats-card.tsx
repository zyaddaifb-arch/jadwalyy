
import React from 'react';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: string;
    description?: string;
    color: 'blue' | 'emerald' | 'orange' | 'purple' | 'red';
}

const colorMap = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-500',
        border: 'hover:border-blue-200 dark:hover:border-blue-900/40'
    },
    emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-500',
        border: 'hover:border-emerald-200 dark:hover:border-emerald-900/40'
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        text: 'text-orange-500',
        border: 'hover:border-orange-200 dark:hover:border-orange-900/40'
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-500',
        border: 'hover:border-purple-200 dark:hover:border-purple-900/40'
    },
    red: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-500',
        border: 'hover:border-red-200 dark:hover:border-red-900/40'
    }
};

export function StatsCard({ label, value, icon, description, color }: StatsCardProps) {
    const styles = colorMap[color];

    return (
        <div className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md ${styles.border} group`}>
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl ${styles.bg} ${styles.text} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <span className="material-symbols-outlined text-2xl font-light">{icon}</span>
                </div>
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{label}</p>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{value}</h4>
                </div>
            </div>
            {description && (
                <p className="text-[11px] text-slate-400 font-medium">{description}</p>
            )}
        </div>
    );
}
