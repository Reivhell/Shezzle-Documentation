'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageNumbers: (number | string)[];
    canGoPrevious: boolean;
    canGoNext: boolean;
    onPageChange: (page: number) => void;
    onPrevious: () => void;
    onNext: () => void;
}

export function Pagination({
    currentPage,
    totalPages,
    pageNumbers,
    canGoPrevious,
    canGoNext,
    onPageChange,
    onPrevious,
    onNext,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mb-12">
            <div
                className="inline-flex p-2 gap-2 rounded-xl border backdrop-blur-md"
                style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border-color)',
                }}
            >
                <button
                    onClick={onPrevious}
                    disabled={!canGoPrevious}
                    className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-[var(--accent-primary)]/10 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        chevron_left
                    </span>
                </button>
                {pageNumbers.map((page, index) =>
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
                            onClick={() => onPageChange(page as number)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105"
                            style={{
                                background:
                                    currentPage === page
                                        ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                        : 'transparent',
                                color: currentPage === page ? 'white' : 'var(--text-secondary)',
                                boxShadow: currentPage === page ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                            }}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    onClick={onNext}
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
    );
}
