'use client';

export function EmptyState() {
    return (
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
    );
}
