'use client';

import { bookmarks, statusOptions, getCategories } from '../data';
import { getCategoryIcon } from '../utils';

interface SidebarProps {
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    selectedStatus: string;
    onStatusChange: (status: string) => void;
    categoryCounts: Record<string, number>;
}

export function Sidebar({
    selectedCategories,
    onCategoryChange,
    selectedStatus,
    onStatusChange,
    categoryCounts,
}: SidebarProps) {
    const categories = getCategories(categoryCounts);

    return (
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
                                        onChange={() => onCategoryChange(category.name)}
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
                                    onChange={() => onStatusChange(status.value)}
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
                            onClick={() => onStatusChange('')}
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
    );
}
