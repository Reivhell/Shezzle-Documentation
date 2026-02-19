'use client';

import { useState } from 'react';
import { useLibraryFilters } from './hooks';
import {
    Navbar,
    MobileMenu,
    Sidebar,
    DocCard,
    Pagination,
    SearchBar,
    FilterBar,
    EmptyState,
} from './components';

export default function LibraryPage() {
    const [activeMenu, setActiveMenu] = useState('Library');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {
        searchQuery,
        setSearchQuery,
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
    } = useLibraryFilters();

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
    } = pagination;

    return (
        <>
            {/* Navigation */}
            <Navbar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                isMobileMenuOpen={isMobileMenuOpen}
            />

            {/* Mobile Menu Drawer */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                categoryCounts={categoryCounts}
            />

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto pt-24 pb-12 px-6 flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <Sidebar
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    categoryCounts={categoryCounts}
                />

                {/* Main */}
                <main className="flex-1 w-full min-w-0">
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Documentation <span className="gradient-text">Library</span>
                        </h1>
                        <p className="text-lg max-w-2xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Browse our complete collection of SDKs, APIs, and developer tools. Use the filters to narrow down by technology or platform.
                        </p>

                        {/* Search and Filter Bar */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                            <FilterBar
                                sortBy={sortBy}
                                onSortChange={setSortBy}
                                viewMode={viewMode}
                                onViewModeChange={setViewMode}
                            />
                        </div>

                        {/* Results count and clear filters */}
                        {hasActiveFilters && (
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
                        <EmptyState />
                    ) : (
                        <div
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12'
                                    : 'flex flex-col gap-4 mb-12'
                            }
                        >
                            {paginatedItems.map((card) => (
                                <DocCard key={card.id} card={card} viewMode={viewMode} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageNumbers={pageNumbers}
                        canGoPrevious={canGoPrevious}
                        canGoNext={canGoNext}
                        onPageChange={goToPage}
                        onPrevious={goToPreviousPage}
                        onNext={goToNextPage}
                    />

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
