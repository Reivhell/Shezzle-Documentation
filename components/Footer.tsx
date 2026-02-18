import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#0a0b0f] border-t border-slate-100 dark:border-slate-800 pt-12 pb-8 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900 dark:text-white text-sm">
                            Product
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Integrations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Changelog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900 dark:text-white text-sm">
                            Resources
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Partners
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900 dark:text-white text-sm">
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-600 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link className="flex items-center gap-2 mb-4 group" href="/">
                            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">terminal</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">DevPortal</span>
                        </Link>
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                            Designed for the modern developer. Built with care and precision for maximum scalability.
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
                    <p>&copy; 2025 DevPortal. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            GitHub
                        </a>
                        <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            Twitter
                        </a>
                        <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            Discord
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}