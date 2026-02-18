'use client';

import { useState, useMemo, useCallback } from 'react';

interface UsePaginationProps<T> {
    items: T[];
    itemsPerPage: number;
    initialPage?: number;
}

interface UsePaginationReturn<T> {
    currentPage: number;
    totalPages: number;
    paginatedItems: T[];
    goToPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    canGoNext: boolean;
    canGoPrevious: boolean;
    pageNumbers: (number | string)[];
    startIndex: number;
    endIndex: number;
    totalItems: number;
}

export function usePagination<T>({
    items,
    itemsPerPage,
    initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
    const [currentPage, setCurrentPage] = useState(initialPage);

    // Reset to page 1 when items change
    const resetPage = useCallback(() => {
        setCurrentPage(1);
    }, []);

    const totalPages = useMemo(() => {
        return Math.ceil(items.length / itemsPerPage);
    }, [items.length, itemsPerPage]);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return items.slice(start, end);
    }, [items, currentPage, itemsPerPage]);

    const goToPage = useCallback((page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    }, [currentPage, totalPages]);

    const goToPreviousPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }, [currentPage]);

    const canGoNext = currentPage < totalPages;
    const canGoPrevious = currentPage > 1;

    // Generate page numbers with ellipsis
    const pageNumbers = useMemo<(number | string)[]>(() => {
        const pages: (number | string)[] = [];
        
        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first, last, current, and neighbors with ellipsis
            if (currentPage <= 3) {
                // Near start
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near end
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Middle
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    }, [currentPage, totalPages]);

    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, items.length);

    return {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        goToNextPage,
        goToPreviousPage,
        canGoNext,
        canGoPrevious,
        pageNumbers,
        startIndex,
        endIndex,
        totalItems: items.length,
    };
}
