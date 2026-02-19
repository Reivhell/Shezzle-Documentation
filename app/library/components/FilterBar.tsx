'use client';

import { SortOption, ViewMode } from '../types';

interface FilterBarProps {
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

export function FilterBar({ sortBy, onSortChange, viewMode, onViewModeChange }: FilterBarProps) {
    return (
        <div className="flex gap-4">
            {/* Sort Dropdown */}
            <div className="relative group">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
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

            {/* View Mode Toggle */}
            <div
                className="flex rounded-xl border p-1 h-[50px] items-center"
                style={{
                    backgroundColor: 'var(--input-bg)',
                    borderColor: 'var(--border-color)',
                }}
            >
                <button
                    onClick={() => onViewModeChange('grid')}
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
                    onClick={() => onViewModeChange('list')}
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
    );
}
