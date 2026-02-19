'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { bookmarks, menuItems, statusOptions, getCategories } from '../data';
import { getMenuIcon, getCategoryIcon } from '../utils';
import { CategoryItem } from '../types';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    selectedStatus: string;
    onStatusChange: (status: string) => void;
    categoryCounts: Record<string, number>;
}

export function MobileMenu({
    isOpen,
    onClose,
    activeMenu,
    setActiveMenu,
    selectedCategories,
    onCategoryChange,
    selectedStatus,
    onStatusChange,
    categoryCounts,
}: MobileMenuProps) {
    const { theme } = useTheme();
    const menuRef = useRef<HTMLDivElement>(null);
    const categories = getCategories(categoryCounts);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
                style={{
                    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                }}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 h-full w-[280px] z-50 md:hidden transform transition-transform duration-300 ease-out"
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '1px solid var(--border-color)',
                    boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
                    animation: 'slideInFromRight 0.3s ease-out',
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-4 border-b"
                    style={{ borderColor: 'var(--border-color)' }}
                >
                    <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                        Menu
                    </span>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                        style={{
                            color: 'var(--text-secondary)',
                            backgroundColor: 'var(--input-bg)',
                        }}
                        aria-label="Close menu"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                            close
                        </span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
                    {/* Navigation */}
                    <div className="space-y-2">
                        <h3
                            className="text-xs font-bold tracking-wider uppercase mb-3"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Navigation
                        </h3>
                        {menuItems.map((item) => (
                            <a
                                key={item}
                                href={item === 'Library' ? '#' : `#${item.toLowerCase()}`}
                                onClick={() => {
                                    setActiveMenu(item);
                                    onClose();
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
                                style={{
                                    backgroundColor: activeMenu === item ? 'var(--accent-primary)' : 'transparent',
                                    color: activeMenu === item ? 'white' : 'var(--text-primary)',
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                    {getMenuIcon(item)}
                                </span>
                                <span className="font-medium">{item}</span>
                                {activeMenu === item && (
                                    <span className="material-symbols-outlined ml-auto" style={{ fontSize: '18px' }}>
                                        check
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Categories */}
                    <div>
                        <h3
                            className="text-xs font-bold tracking-wider uppercase mb-3"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Categories
                        </h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => {
                                        onCategoryChange(category.name);
                                        onClose();
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200"
                                    style={{
                                        backgroundColor: selectedCategories.includes(category.name)
                                            ? 'rgba(99, 102, 241, 0.1)'
                                            : 'transparent',
                                        border: selectedCategories.includes(category.name)
                                            ? '1px solid var(--accent-primary)'
                                            : '1px solid transparent',
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="material-symbols-outlined"
                                            style={{
                                                fontSize: '20px',
                                                color: selectedCategories.includes(category.name)
                                                    ? 'var(--accent-primary)'
                                                    : 'var(--text-secondary)',
                                            }}
                                        >
                                            {getCategoryIcon(category.name)}
                                        </span>
                                        <span
                                            style={{
                                                color: selectedCategories.includes(category.name)
                                                    ? 'var(--text-primary)'
                                                    : 'var(--text-secondary)',
                                                fontWeight: selectedCategories.includes(category.name) ? 600 : 400,
                                            }}
                                        >
                                            {category.name}
                                        </span>
                                    </div>
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full"
                                        style={{
                                            backgroundColor: 'var(--bg-tertiary)',
                                            color: 'var(--text-secondary)',
                                        }}
                                    >
                                        {category.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <h3
                            className="text-xs font-bold tracking-wider uppercase mb-3"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Status
                        </h3>
                        <div className="space-y-2">
                            {statusOptions.map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => {
                                        onStatusChange(selectedStatus === status.value ? '' : status.value);
                                        onClose();
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
                                    style={{
                                        backgroundColor: selectedStatus === status.value
                                            ? 'rgba(99, 102, 241, 0.1)'
                                            : 'transparent',
                                        border: selectedStatus === status.value
                                            ? '1px solid var(--accent-primary)'
                                            : '1px solid transparent',
                                    }}
                                >
                                    <span className={`w-2.5 h-2.5 rounded-full ${status.color} ring-2 ${status.ring}`}></span>
                                    <span
                                        style={{
                                            color: selectedStatus === status.value
                                                ? 'var(--text-primary)'
                                                : 'var(--text-secondary)',
                                            fontWeight: selectedStatus === status.value ? 600 : 400,
                                        }}
                                    >
                                        {status.label}
                                    </span>
                                    {selectedStatus === status.value && (
                                        <span className="material-symbols-outlined ml-auto text-sm" style={{ color: 'var(--accent-primary)' }}>
                                            check
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bookmarks */}
                    <div>
                        <h3
                            className="text-xs font-bold tracking-wider uppercase mb-3 flex items-center gap-2"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                                bookmark
                            </span>
                            Bookmarks
                        </h3>
                        <div className="space-y-2">
                            {bookmarks.map((bookmark) => (
                                <a
                                    key={bookmark.title}
                                    href={bookmark.href}
                                    onClick={onClose}
                                    className="block p-3 rounded-lg border transition-all duration-200"
                                    style={{
                                        backgroundColor: 'var(--card-bg)',
                                        borderColor: 'var(--border-color)',
                                    }}
                                >
                                    <div
                                        className="text-sm font-medium mb-1"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {bookmark.title}
                                    </div>
                                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        {bookmark.category}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-lg font-medium transition-all duration-200"
                        style={{
                            backgroundColor: 'var(--accent-primary)',
                            color: 'white',
                        }}
                    >
                        Close Menu
                    </button>
                </div>
            </div>
        </>
    );
}
