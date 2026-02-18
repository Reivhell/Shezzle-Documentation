'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';

interface DocCard {
    id: string;
    title: string;
    description: string;
    category: 'frontend' | 'backend' | 'devops' | 'mobile' | 'security' | 'integration';
    categoryLabel: string;
    icon: string;
    status: 'stable' | 'beta' | 'deprecated';
    articles: number;
    progress: number;
    createdAt: string;
    popularity: number;
}

interface Bookmark {
    title: string;
    category: string;
    href: string;
}

// Extended data with createdAt and popularity for sorting
const docCards: DocCard[] = [
    {
        id: '1',
        title: 'UI Component Library',
        description: 'Comprehensive collection of React components with accessibility built-in.',
        category: 'frontend',
        categoryLabel: 'Frontend',
        icon: 'view_quilt',
        status: 'stable',
        articles: 42,
        progress: 95,
        createdAt: '2024-01-15',
        popularity: 1250,
    },
    {
        id: '2',
        title: 'Database Connectors',
        description: 'Standardized drivers for PostgreSQL, Redis, and MongoDB integration.',
        category: 'backend',
        categoryLabel: 'Backend',
        icon: 'database',
        status: 'beta',
        articles: 18,
        progress: 60,
        createdAt: '2024-02-20',
        popularity: 890,
    },
    {
        id: '3',
        title: 'Cloud Infrastructure',
        description: 'Terraform modules and Docker containers for rapid deployment.',
        category: 'devops',
        categoryLabel: 'DevOps',
        icon: 'cloud',
        status: 'stable',
        articles: 24,
        progress: 80,
        createdAt: '2023-11-10',
        popularity: 1100,
    },
    {
        id: '4',
        title: 'React Native SDK',
        description: 'Cross-platform mobile development kit with native module bridges.',
        category: 'mobile',
        categoryLabel: 'Mobile',
        icon: 'smartphone',
        status: 'stable',
        articles: 36,
        progress: 100,
        createdAt: '2023-09-05',
        popularity: 2100,
    },
    {
        id: '5',
        title: 'Auth & Identity',
        description: 'User authentication flows, OAuth2 providers, and session management.',
        category: 'security',
        categoryLabel: 'Security',
        icon: 'lock',
        status: 'beta',
        articles: 15,
        progress: 45,
        createdAt: '2024-03-01',
        popularity: 750,
    },
    {
        id: '6',
        title: 'Legacy API Wrapper',
        description: 'Tools for migrating from v1 to v2 architecture with backward compatibility.',
        category: 'integration',
        categoryLabel: 'Integration',
        icon: 'api',
        status: 'deprecated',
        articles: 10,
        progress: 100,
        createdAt: '2023-06-15',
        popularity: 320,
    },
    {
        id: '7',
        title: 'GraphQL Gateway',
        description: 'Unified GraphQL API gateway with caching and rate limiting.',
        category: 'backend',
        categoryLabel: 'Backend',
        icon: 'hub',
        status: 'stable',
        articles: 28,
        progress: 90,
        createdAt: '2024-01-08',
        popularity: 980,
    },
    {
        id: '8',
        title: 'Design System',
        description: 'Complete design system with tokens, components, and guidelines.',
        category: 'frontend',
        categoryLabel: 'Frontend',
        icon: 'palette',
        status: 'stable',
        articles: 56,
        progress: 100,
        createdAt: '2023-10-20',
        popularity: 1450,
    },
    {
        id: '9',
        title: 'Kubernetes Operator',
        description: 'Custom Kubernetes operators for automated deployment and scaling.',
        category: 'devops',
        categoryLabel: 'DevOps',
        icon: 'settings',
        status: 'beta',
        articles: 22,
        progress: 70,
        createdAt: '2024-02-15',
        popularity: 620,
    },
    {
        id: '10',
        title: 'Flutter SDK',
        description: 'Cross-platform mobile SDK for iOS and Android development.',
        category: 'mobile',
        categoryLabel: 'Mobile',
        icon: 'phone_iphone',
        status: 'stable',
        articles: 31,
        progress: 85,
        createdAt: '2023-12-01',
        popularity: 1680,
    },
    {
        id: '11',
        title: 'Encryption Service',
        description: 'End-to-end encryption service for secure data transmission.',
        category: 'security',
        categoryLabel: 'Security',
        icon: 'shield',
        status: 'stable',
        articles: 19,
        progress: 95,
        createdAt: '2024-01-25',
        popularity: 890,
    },
    {
        id: '12',
        title: 'Webhook Manager',
        description: 'Manage and monitor webhooks with retry logic and analytics.',
        category: 'integration',
        categoryLabel: 'Integration',
        icon: 'webhook',
        status: 'stable',
        articles: 14,
        progress: 88,
        createdAt: '2023-11-30',
        popularity: 540,
    },
];

const bookmarks: Bookmark[] = [
    { title: 'Payment Gateway', category: 'Integration', href: '#' },
    { title: 'User Auth V2', category: 'Security', href: '#' },
    { title: 'Analytics API', category: 'Backend', href: '#' },
];

type SortOption = 'newest' | 'alphabetical' | 'popular' | 'difficulty';
type ViewMode = 'grid' | 'list';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'stable':
            return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: 'rgba(16, 185, 129, 0.2)', dot: 'bg-green-500' };
        case 'beta':
            return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.2)', dot: 'bg-amber-500' };
        case 'deprecated':
            return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.2)', dot: 'bg-red-500' };
        default:
            return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: 'rgba(16, 185, 129, 0.2)', dot: 'bg-green-500' };
    }
};

const getCategoryProgressColor = (category: string) => {
    switch (category) {
        case 'frontend':
            return '#3b82f6';
        case 'backend':
            return '#f59e0b';
        case 'devops':
            return '#8b5cf6';
        case 'mobile':
            return '#ec4899';
        case 'security':
            return '#ef4444';
        case 'integration':
            return '#10b981';
        default:
            return '#6366f1';
    }
};

const ITEMS_PER_PAGE = 6;

export default function LibraryPage() {
    const { theme, toggleTheme, mounted } = useTheme();
    
    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    
    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Modules']);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    
    // Sort state
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    
    // View mode state
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    
    // Menu active state
    const [activeMenu, setActiveMenu] = useState('Library');
    
    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Calculate dynamic category counts based on filtered data
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { 'All Modules': docCards.length };
        
        const categories = ['Backend', 'Frontend', 'DevOps', 'Mobile', 'Security', 'Integration'];
        categories.forEach(cat => {
            counts[cat] = docCards.filter(card => card.categoryLabel === cat).length;
        });
        
        return counts;
    }, []);

    // Filter and sort logic
    const filteredAndSortedCards = useMemo(() => {
        let filtered = [...docCards];
        
        // Search filter (title, description, category)
        if (debouncedSearch.trim()) {
            const query = debouncedSearch.toLowerCase();
            filtered = filtered.filter(card => 
                card.title.toLowerCase().includes(query) ||
                card.description.toLowerCase().includes(query) ||
                card.categoryLabel.toLowerCase().includes(query)
            );
        }
        
        // Category filter
        if (!selectedCategories.includes('All Modules')) {
            filtered = filtered.filter(card => 
                selectedCategories.includes(card.categoryLabel)
            );
        }
        
        // Status filter
        if (selectedStatus) {
            filtered = filtered.filter(card => 
                card.status.toLowerCase() === selectedStatus.toLowerCase()
            );
        }
        
        // Sort
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'alphabetical':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'popular':
                filtered.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'difficulty':
                // Sort by progress (higher progress = easier/complete)
                filtered.sort((a, b) => b.progress - a.progress);
                break;
        }
        
        return filtered;
    }, [debouncedSearch, selectedCategories, selectedStatus, sortBy]);

    // Pagination
    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        goToNextPage,
        goToPreviousPage,
        canGoNext,
        canGoPrevious,
        pageNumbers,
        totalItems,
    } = usePagination({
        items: filteredAndSortedCards,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    // Reset to page 1 when filters change
    useEffect(() => {
        goToPage(1);
    }, [debouncedSearch, selectedCategories, selectedStatus, sortBy]);

    // Category filter handler
    const handleCategoryChange = useCallback((categoryName: string) => {
        if (categoryName === 'All Modules') {
            setSelectedCategories(['All Modules']);
        } else {
            setSelectedCategories(prev => {
                if (prev.includes(categoryName)) {
                    const newCategories = prev.filter(c => c !== categoryName);
                    return newCategories.length === 0 ? ['All Modules'] : newCategories;
                } else {
                    return [...prev.filter(c => c !== 'All Modules'), categoryName];
                }
            });
        }
    }, []);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedCategories(['All Modules']);
        setSelectedStatus('');
        setSortBy('newest');
    }, []);

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[placeholder="Search documentation modules..."]') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent scrolling when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Menu items
    const menuItems = ['Library', 'About', 'Changelog', 'Contact'];

    // Category list with dynamic counts
    const categories = [
        { name: 'All Modules', count: categoryCounts['All Modules'] },
        { name: 'Backend', count: categoryCounts['Backend'] },
        { name: 'Frontend', count: categoryCounts['Frontend'] },
        { name: 'DevOps', count: categoryCounts['DevOps'] },
        { name: 'Mobile', count: categoryCounts['Mobile'] },
        { name: 'Security', count: categoryCounts['Security'] },
    ];

    // Status options
    const statusOptions = [
        { label: 'Stable', color: 'bg-green-500', ring: 'ring-green-500/20', value: 'stable' },
        { label: 'Beta', color: 'bg-amber-500', ring: 'ring-amber-500/20', value: 'beta' },
        { label: 'Deprecated', color: 'bg-red-500', ring: 'ring-red-500/20', value: 'deprecated' },
    ];

    // Show loading state while theme is mounting
    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 nav-library">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '28px', color: 'var(--accent-primary)' }}
                        >
                            code_blocks
                        </span>
                        <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            DevPortal
                        </span>
                    </div>

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

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Button */}
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

                        {/* Mobile Menu Toggle Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
                        style={{
                            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    
                    {/* Drawer */}
                    <div
                        ref={mobileMenuRef}
                        className="fixed top-0 right-0 h-full w-[280px] z-50 md:hidden transform transition-transform duration-300 ease-out"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderLeft: '1px solid var(--border-color)',
                            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
                            animation: 'slideInFromRight 0.3s ease-out',
                        }}
                    >
                        {/* Drawer Header */}
                        <div
                            className="flex items-center justify-between px-6 py-4 border-b"
                            style={{ borderColor: 'var(--border-color)' }}
                        >
                            <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                                Menu
                            </span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
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

                        {/* Drawer Content */}
                        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
                            {/* Mobile Navigation Links */}
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
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
                                        style={{
                                            backgroundColor: activeMenu === item ? 'var(--accent-primary)' : 'transparent',
                                            color: activeMenu === item ? 'white' : 'var(--text-primary)',
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                            {item === 'Library' ? 'collections_bookmark' : 
                                             item === 'About' ? 'info' : 
                                             item === 'Changelog' ? 'history' : 'mail'}
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

                            {/* Mobile Categories */}
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
                                                handleCategoryChange(category.name);
                                                setIsMobileMenuOpen(false);
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
                                                    {category.name === 'All Modules' ? 'apps' :
                                                     category.name === 'Backend' ? 'storage' :
                                                     category.name === 'Frontend' ? 'web' :
                                                     category.name === 'DevOps' ? 'settings' :
                                                     category.name === 'Mobile' ? 'smartphone' : 'security'}
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

                            {/* Mobile Status Filter */}
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
                                                setSelectedStatus(selectedStatus === status.value ? '' : status.value);
                                                setIsMobileMenuOpen(false);
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

                            {/* Mobile Bookmarks */}
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
                                            onClick={() => setIsMobileMenuOpen(false)}
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

                            {/* Close button at bottom */}
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
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
            )}

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto pt-24 pb-12 px-6 flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside
                    className="hidden lg:block w-[280px] shrink-0 sticky top-24 h-[calc(100vh-120px)] sidebar-scroll overflow-y-auto pr-4 border-r transition-colors duration-300 rounded-xl p-4 sidebar-bg"
                    style={{ borderColor: 'var(--border-color)' }}
                >
                    <div className="space-y-8">
                        {/* Categories */}
                        <div>
                            <h3 className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>
                                Categories
                            </h3>
                            <div className="space-y-3">
                                {categories.map((category) => (
                                    <label
                                        key={category.name}
                                        className="flex items-center justify-between group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                className="custom-checkbox"
                                                checked={selectedCategories.includes(category.name)}
                                                onChange={() => handleCategoryChange(category.name)}
                                            />
                                            <span
                                                className={`text-sm font-medium transition-colors duration-200 ${
                                                    selectedCategories.includes(category.name)
                                                        ? ''
                                                        : 'hover:text-[var(--accent-primary)]'
                                                }`}
                                                style={{
                                                    color: selectedCategories.includes(category.name)
                                                        ? 'var(--text-primary)'
                                                        : 'var(--text-secondary)',
                                                }}
                                            >
                                                {category.name}
                                            </span>
                                        </div>
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                                            style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-tertiary)' }}
                                        >
                                            {category.count}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="h-px w-full" style={{ backgroundColor: 'var(--border-color)' }}></div>

                        {/* Status */}
                        <div>
                            <h3 className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>
                                Status
                            </h3>
                            <div className="space-y-3">
                                {statusOptions.map((status) => (
                                    <label key={status.label} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="status"
                                            className="custom-radio"
                                            checked={selectedStatus === status.value}
                                            onChange={() => setSelectedStatus(status.value)}
                                        />
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${status.color} ring-2 ${status.ring}`}></span>
                                            <span className="text-sm transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
                                                {status.label}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {selectedStatus && (
                                <button
                                    onClick={() => setSelectedStatus('')}
                                    className="mt-3 text-xs hover:text-[var(--accent-primary)] transition-colors"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    Clear status filter
                                </button>
                            )}
                        </div>

                        <div className="h-px w-full" style={{ backgroundColor: 'var(--border-color)' }}></div>

                        {/* Bookmarks */}
                        <div>
                            <h3
                                className="text-xs font-bold tracking-wider uppercase mb-4 flex items-center gap-2"
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
                                        className="block p-3 rounded-lg border transition-all duration-200 hover:border-[var(--accent-primary)] hover:shadow-md group"
                                        style={{
                                            backgroundColor: 'var(--card-bg)',
                                            borderColor: 'var(--border-color)',
                                        }}
                                    >
                                        <div
                                            className="text-sm font-medium mb-1 transition-colors duration-200 group-hover:text-[var(--accent-primary)]"
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
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 w-full min-w-0">
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Documentation <span className="gradient-text">Library</span>
                        </h1>
                        <p className="text-lg max-w-2xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Browse our complete collection of SDKs, APIs, and developer tools. Use the filters to narrow down by technology or platform.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <div className="relative flex-1 max-w-[600px]">
                                <span
                                    className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    search
                                </span>
                                <input
                                    className="w-full rounded-xl py-3.5 pl-12 pr-4 transition-all duration-300 focus:ring-2 border outline-none"
                                    style={{
                                        backgroundColor: 'var(--input-bg)',
                                        borderColor: 'var(--border-color)',
                                        color: 'var(--text-primary)',
                                    }}
                                    placeholder="Search documentation modules..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 search-shortcut">⌘K</span>
                            </div>

                            <div className="flex gap-4">
                                <div className="relative group">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                                        className="appearance-none rounded-xl py-3.5 pl-4 pr-10 focus:ring-2 focus:border-transparent cursor-pointer min-w-[160px] transition-all duration-200 border hover:border-[var(--accent-primary)] outline-none"
                                        style={{
                                            backgroundColor: 'var(--input-bg)',
                                            borderColor: 'var(--border-color)',
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="alphabetical">Alphabetical</option>
                                        <option value="popular">Most Popular</option>
                                        <option value="difficulty">Difficulty</option>
                                    </select>
                                    <span
                                        className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        expand_more
                                    </span>
                                </div>

                                <div
                                    className="flex rounded-xl border p-1 h-[50px] items-center"
                                    style={{
                                        backgroundColor: 'var(--input-bg)',
                                        borderColor: 'var(--border-color)',
                                    }}
                                >
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className="w-10 h-full rounded-lg flex items-center justify-center transition-all duration-200"
                                        style={{
                                            backgroundColor: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
                                            color: viewMode === 'grid' ? 'white' : 'var(--text-secondary)',
                                            boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(99, 102, 241, 0.3)' : 'none',
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                            grid_view
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className="w-10 h-full rounded-lg flex items-center justify-center transition-all duration-200"
                                        style={{
                                            color: viewMode === 'list' ? 'white' : 'var(--text-secondary)',
                                            backgroundColor: viewMode === 'list' ? 'var(--accent-primary)' : 'transparent',
                                            boxShadow: viewMode === 'list' ? '0 2px 8px rgba(99, 102, 241, 0.3)' : 'none',
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                            view_list
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results count and clear filters */}
                        {(searchQuery || !selectedCategories.includes('All Modules') || selectedStatus) && (
                            <div className="flex items-center gap-4 mb-6">
                                <span style={{ color: 'var(--text-secondary)' }}>
                                    Showing {totalItems} result{totalItems !== 1 ? 's' : ''}
                                </span>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm hover:text-[var(--accent-primary)] transition-colors"
                                    style={{ color: 'var(--accent-primary)' }}
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Cards Grid/List */}
                    {paginatedItems.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl mb-4" style={{ color: 'var(--text-muted)' }}>
                                search_off
                            </span>
                            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                No results found
                            </h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Try adjusting your search or filters
                            </p>
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12"
                            : "flex flex-col gap-4 mb-12"
                        }>
                            {paginatedItems.map((card) => {
                                const statusColors = getStatusColor(card.status);
                                const progressColor = getCategoryProgressColor(card.category);
                                
                                if (viewMode === 'list') {
                                    return (
                                        <article
                                            key={card.id}
                                            className="glass-card rounded-2xl p-5 flex items-center gap-6 group cat-${card.category}"
                                        >
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center category-icon transition-all duration-300 shrink-0">
                                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                                                    {card.icon}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3
                                                        className="text-lg font-semibold transition-colors duration-200 group-hover:text-[var(--accent-primary)] truncate"
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        {card.title}
                                                    </h3>
                                                    <span className="text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full category-badge shrink-0">
                                                        {card.categoryLabel}
                                                    </span>
                                                </div>
                                                <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                                                    {card.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 shrink-0">
                                                <span
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
                                                    style={{
                                                        backgroundColor: statusColors.bg,
                                                        color: statusColors.text,
                                                        borderColor: statusColors.border,
                                                    }}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`}></span>
                                                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                                                </span>
                                                <div className="text-right">
                                                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                        {card.articles} Articles
                                                    </div>
                                                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                                        {card.progress}%
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                }
                                
                                return (
                                    <article
                                        key={card.id}
                                        className={`glass-card rounded-2xl p-7 flex flex-col justify-between group cat-${card.category}`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-12 h-12 rounded-xl flex items-center justify-center category-icon transition-all duration-300">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                                                        {card.icon}
                                                    </span>
                                                </div>
                                                <span className="text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full category-badge">
                                                    {card.categoryLabel}
                                                </span>
                                            </div>
                                            <h3
                                                className="text-xl font-semibold mb-2 transition-colors duration-200 group-hover:text-[var(--accent-primary)]"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {card.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                                                {card.description}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
                                                    style={{
                                                        backgroundColor: statusColors.bg,
                                                        color: statusColors.text,
                                                        borderColor: statusColors.border,
                                                    }}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`}></span>
                                                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                                                </span>
                                            </div>
                                            <div
                                                className="flex items-center justify-between text-xs mb-2 font-medium"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                <span>{card.articles} Articles</span>
                                                <span style={{ color: 'var(--text-primary)' }}>{card.progress}%</span>
                                            </div>
                                            <div
                                                className="w-full h-1.5 rounded-full overflow-hidden"
                                                style={{ backgroundColor: 'var(--border-color)' }}
                                            >
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{ width: `${card.progress}%`, backgroundColor: progressColor }}
                                                ></div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mb-12">
                            <div
                                className="inline-flex p-2 gap-2 rounded-xl border backdrop-blur-md"
                                style={{
                                    backgroundColor: 'var(--card-bg)',
                                    borderColor: 'var(--border-color)',
                                }}
                            >
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={!canGoPrevious}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-[var(--accent-primary)]/10 disabled:opacity-30 disabled:cursor-not-allowed"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                        chevron_left
                                    </span>
                                </button>
                                {pageNumbers.map((page, index) => (
                                    page === '...' ? (
                                        <span
                                            key={`ellipsis-${index}`}
                                            className="w-10 h-10 flex items-center justify-center"
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page as number)}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105"
                                            style={{
                                                background: currentPage === page 
                                                    ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                                    : 'transparent',
                                                color: currentPage === page ? 'white' : 'var(--text-secondary)',
                                                boxShadow: currentPage === page ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                                            }}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}
                                <button
                                    onClick={goToNextPage}
                                    disabled={!canGoNext}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-[var(--accent-primary)]/10 disabled:opacity-30 disabled:cursor-not-allowed"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                        chevron_right
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Results info footer */}
                    {totalItems > 0 && (
                        <div className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Showing {paginatedItems.length} of {totalItems} modules
                            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
