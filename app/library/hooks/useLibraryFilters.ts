'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { DocCard, SortOption } from '../types';
import { docCards, ITEMS_PER_PAGE } from '../data';

interface UseLibraryFiltersReturn {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    debouncedSearch: string;
    selectedCategories: string[];
    handleCategoryChange: (categoryName: string) => void;
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    filteredAndSortedCards: DocCard[];
    categoryCounts: Record<string, number>;
    clearFilters: () => void;
    hasActiveFilters: boolean;
    pagination: {
        currentPage: number;
        totalPages: number;
        paginatedItems: DocCard[];
        goToPage: (page: number) => void;
        goToNextPage: () => void;
        goToPreviousPage: () => void;
        canGoNext: boolean;
        canGoPrevious: boolean;
        pageNumbers: (number | string)[];
        totalItems: number;
    };
}

export function useLibraryFilters(): UseLibraryFiltersReturn {
    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Modules']);
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    // Sort state
    const [sortBy, setSortBy] = useState<SortOption>('newest');

    // View mode state
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Calculate dynamic category counts
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { 'All Modules': docCards.length };
        const categories = ['Backend', 'Frontend', 'Database', 'DevOps', 'Mobile', 'Security'];
        categories.forEach(cat => {
            counts[cat] = docCards.filter(card => card.categoryLabel === cat).length;
        });
        return counts;
    }, []);

    // Filter and sort logic
    const filteredAndSortedCards = useMemo(() => {
        let filtered = [...docCards];

        // Search filter
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
                filtered.sort((a, b) => b.progress - a.progress);
                break;
        }

        return filtered;
    }, [debouncedSearch, selectedCategories, selectedStatus, sortBy]);

    // Pagination
    const pagination = usePagination({
        items: filteredAndSortedCards,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    // Reset to page 1 when filters change
    useEffect(() => {
        pagination.goToPage(1);
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

    // Check if any filters are active
    const hasActiveFilters = searchQuery !== '' ||
        !selectedCategories.includes('All Modules') ||
        selectedStatus !== '';

    return {
        searchQuery,
        setSearchQuery,
        debouncedSearch,
        selectedCategories,
        handleCategoryChange,
        selectedStatus,
        setSelectedStatus,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        filteredAndSortedCards,
        categoryCounts,
        clearFilters,
        hasActiveFilters,
        pagination,
    };
}
