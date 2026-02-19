'use client';

import { useEffect } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
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

    return (
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
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 search-shortcut">⌘K</span>
        </div>
    );
}
