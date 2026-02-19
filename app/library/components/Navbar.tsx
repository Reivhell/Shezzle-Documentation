'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { menuItems } from '../data';
import { getMenuIcon } from '../utils';

interface NavbarProps {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
    onMobileMenuToggle: () => void;
    isMobileMenuOpen: boolean;
}

export function Navbar({ activeMenu, setActiveMenu, onMobileMenuToggle, isMobileMenuOpen }: NavbarProps) {
    const { theme, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 nav-library">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 nav-library">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '28px', color: 'var(--accent-primary)' }}
                    >
                        code_blocks
                    </span>
                    <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Shezzle Docs
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {menuItems.map((item) => (
                        <a
                            key={item}
                            href={item === 'Library' ? '#' : `#${item.toLowerCase()}`}
                            onClick={() => setActiveMenu(item)}
                            style={{
                                color: activeMenu === item ? 'var(--accent-primary)' : undefined,
                                fontWeight: activeMenu === item ? 600 : undefined,
                            }}
                            className="hover:text-[var(--accent-primary)] transition-colors duration-200"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-105 active:scale-95 relative"
                        style={{
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--input-bg)',
                            color: 'var(--text-secondary)',
                        }}
                        aria-label="Toggle theme"
                    >
                        <span
                            className="material-symbols-outlined absolute transition-all duration-500"
                            style={{
                                fontSize: '20px',
                                transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
                                opacity: theme === 'dark' ? 1 : 0,
                            }}
                        >
                            light_mode
                        </span>
                        <span
                            className="material-symbols-outlined absolute transition-all duration-500"
                            style={{
                                fontSize: '20px',
                                transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
                                opacity: theme === 'light' ? 1 : 0,
                            }}
                        >
                            dark_mode
                        </span>
                    </button>

                    {/* Desktop Search */}
                    <div
                        className="hidden lg:flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-300 focus-within:ring-2 w-64"
                        style={{
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--input-bg)',
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>
                            search
                        </span>
                        <input
                            className="bg-transparent border-none text-sm focus:ring-0 w-full p-0 outline-none"
                            style={{ color: 'var(--text-primary)' }}
                            placeholder="Search..."
                            type="text"
                        />
                        <span className="search-shortcut">⌘K</span>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={onMobileMenuToggle}
                        className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-105 active:scale-95 relative"
                        style={{
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--input-bg)',
                        }}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span
                            className="material-symbols-outlined absolute transition-all duration-300"
                            style={{
                                fontSize: '24px',
                                transform: isMobileMenuOpen ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
                                opacity: isMobileMenuOpen ? 0 : 1,
                            }}
                        >
                            menu
                        </span>
                        <span
                            className="material-symbols-outlined absolute transition-all duration-300"
                            style={{
                                fontSize: '24px',
                                transform: isMobileMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
                                opacity: isMobileMenuOpen ? 1 : 0,
                            }}
                        >
                            close
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
