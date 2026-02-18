'use client';

export default function ChangelogSection() {
    return (
        <section id="changelog" className="py-20 px-6 bg-slate-50/50 dark:bg-[#13151a]">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
                            Changelog
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            The evolution of the platform
                        </p>
                    </div>
                    <a
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors"
                        href="#"
                    >
                        Full History
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                </div>

                <div className="relative pl-6 space-y-8">
                    <div className="timeline-line"></div>

                    <div className="relative">
                        <div className="timeline-dot timeline-dot-active"></div>
                        <div className="card-clean rounded-lg p-5 ml-4 border-l-4 border-l-indigo-500">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                                    v3.0.0
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                                    LATEST
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
                                    Oct 25, 2025
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                                Major architectural rebuild introducing the new Open Engine. Server speed
                                increased by 60%.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                                    Core
                                </span>
                                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                                    Performance
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="timeline-dot" style={{ background: '#cbd5e1' }}></div>
                        <div className="ml-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                                    v2.4.2
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500">
                                    Sep 22, 2025
                                </span>
                            </div>
                            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-400 dark:text-slate-500 mt-1.5">•</span>
                                    <span>Enhanced API multi-language responses</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-400 dark:text-slate-500 mt-1.5">•</span>
                                    <span>Updated dependency tree for security patches</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-400 dark:text-slate-500 mt-1.5">•</span>
                                    <span>Improved mobile navigation improvements</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}