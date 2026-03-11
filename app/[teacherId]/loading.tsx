export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Skeleton for Header Profile */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 mb-12 animate-pulse">
                <div className="flex flex-col items-center">
                    <div className="w-36 h-36 rounded-3xl bg-slate-100 dark:bg-slate-800 mb-8"></div>
                    <div className="h-10 w-64 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3"></div>
                    <div className="h-8 w-40 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6"></div>
                    <div className="h-4 w-full max-w-lg bg-slate-50 dark:bg-slate-800/50 rounded-lg mb-2"></div>
                    <div className="h-4 w-3/4 max-w-lg bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div>
                </div>
            </div>

            {/* Skeleton for Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 animate-pulse h-64">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800"></div>
                            <div className="space-y-2">
                                <div className="h-6 w-32 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
                                <div className="h-3 w-16 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="h-12 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl"></div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
