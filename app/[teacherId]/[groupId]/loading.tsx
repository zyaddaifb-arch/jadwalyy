export default function Loading() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12 text-center animate-pulse">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl mx-auto mb-8"></div>
                <div className="h-8 w-48 bg-slate-100 dark:bg-slate-800 rounded-xl mx-auto mb-4"></div>
                <div className="h-4 w-64 bg-slate-50 dark:bg-slate-800/50 rounded-lg mx-auto mb-12"></div>

                <div className="space-y-6">
                    <div className="h-20 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-14 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl"></div>
                        <div className="h-14 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl"></div>
                    </div>
                    <div className="h-14 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl"></div>
                    <div className="h-16 w-full bg-primary/10 rounded-2xl mt-8"></div>
                </div>
            </div>
        </div>
    );
}
