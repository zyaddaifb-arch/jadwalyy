
import React from 'react';

interface DashboardHeaderProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export function DashboardHeader({ title, description, children }: DashboardHeaderProps) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
            <div className="max-w-2xl">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                    {title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                {children}
            </div>
        </header>
    );
}
