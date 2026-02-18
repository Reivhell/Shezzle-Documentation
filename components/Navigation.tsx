'use client';

import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearchOpen = useCallback(() => {
        setIsSearchOpen(true);
    }, []);

    const handleSearchClose = useCallback(() => {
        setIsSearchOpen(false);
        setSearchQuery('');
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                } else {
                    handleSearchClose();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSearchClose, isMobileMenuOpen, closeMobileMenu]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <nav className="nav-clean fixed top-0 w-full z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link className="flex items-center gap-2 group" href="/">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors dark:bg-indigo-900/30 dark:text-indigo-400">
                            <span className="material-symbols-outlined text-[20px]">terminal</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                            DevPortal
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            href="/library"
                        >
                            Library
                        </Link>
                        <a
                            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            href="#about"
                        >
                            About
                        </a>
                        <a
                            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            href="#changelog"
                        >
                            Changelog
                        </a>
                        <a
                            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            href="#contact"
                        >
                            Contact
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleSearchOpen}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-slate-500 dark:text-slate-400 text-sm w-48"
                    >
                        <span className="material-symbols-outlined text-[18px]">search</span>
                        <span className="text-xs">Search docs...</span>
                        <span className="ml-auto text-[10px] border border-slate-200 dark:border-slate-600 rounded px-1.5 py-0.5 bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-500">
                            Ctrl+K
                        </span>
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle theme"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 z-50"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="material-symbols-outlined text-[24px] transition-transform duration-200">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Search Modal */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh] px-4">
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleSearchClose}
                    />
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 dark:border-slate-800">
                            <span className="material-symbols-outlined text-slate-400 text-[24px]">search</span>
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400"
                                autoFocus
                            />
                            <kbd className="px-2 py-1 text-xs rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                ESC
                            </kbd>
                        </div>
                        <div className="px-4 py-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                            <p>Start typing to search documentation</p>
                            <p className="mt-2 text-xs opacity-60">Search functionality coming soon...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            <div 
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                    onClick={closeMobileMenu}
                />
                {/* Menu Panel */}
                <div 
                    className={`absolute right-0 top-0 h-full w-[280px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-700 flex flex-col transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">Menu</span>
                        <button
                            onClick={closeMobileMenu}
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Close menu"
                        >
                            <span className="material-symbols-outlined text-[24px]">close</span>
                        </button>
                    </div>
                    
                    {/* Mobile Search Button */}
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                        <button 
                            onClick={() => {
                                closeMobileMenu();
                                handleSearchOpen();
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">search</span>
                            <span className="text-sm">Search docs...</span>
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex-1 px-6 py-4 space-y-1 overflow-y-auto">
                        <Link
                            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            href="/library"
                            onClick={closeMobileMenu}
                        >
                            <span className="material-symbols-outlined text-[20px]">folder</span>
                            <span className="font-medium">Library</span>
                        </Link>
                        <a
                            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            href="#about"
                            onClick={closeMobileMenu}
                        >
                            <span className="material-symbols-outlined text-[20px]">info</span>
                            <span className="font-medium">About</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            href="#changelog"
                            onClick={closeMobileMenu}
                        >
                            <span className="material-symbols-outlined text-[20px]">history</span>
                            <span className="font-medium">Changelog</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            href="#contact"
                            onClick={closeMobileMenu}
                        >
                            <span className="material-symbols-outlined text-[20px]">mail</span>
                            <span className="font-medium">Contact</span>
                        </a>
                    </div>

                    {/* Mobile Footer */}
                    <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Theme</span>
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                                </span>
                                <span className="text-sm">
                                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
