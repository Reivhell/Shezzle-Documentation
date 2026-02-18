'use client';

import { ReactNode } from 'react';

interface BreadcrumbItem {
    label: string;
    href?: string;
    isActive?: boolean;
}

interface ModuleHeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    author: {
        name: string;
        initials: string;
    };
    readTime: string;
    version: string;
    status: 'stable' | 'beta' | 'deprecated';
    children?: ReactNode;
}

export default function ModuleHeader({
    title,
    breadcrumbs,
    author,
    readTime,
    version,
    status,
    children,
}: ModuleHeaderProps) {
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'stable':
                return {
                    bg: 'rgba(16, 185, 129, 0.1)',
                    text: '#10b981',
                    border: 'rgba(16, 185, 129, 0.2)',
                };
            case 'beta':
                return {
                    bg: 'rgba(245, 158, 11, 0.1)',
                    text: '#f59e0b',
                    border: 'rgba(245, 158, 11, 0.2)',
                };
            case 'deprecated':
                return {
                    bg: 'rgba(239, 68, 68, 0.1)',
                    text: '#ef4444',
                    border: 'rgba(239, 68, 68, 0.2)',
                };
            default:
                return {
                    bg: 'rgba(16, 185, 129, 0.1)',
                    text: '#10b981',
                    border: 'rgba(16, 185, 129, 0.2)',
                };
        }
    };

    const statusStyles = getStatusStyles(status);

    return (
        <>
            {/* Breadcrumbs */}
            <nav
                className="flex items-center gap-2 text-sm mb-8"
                style={{ color: 'var(--text-secondary)', opacity: 0.7 }}
            >
                {breadcrumbs.map((crumb, index) => (
                    <span key={crumb.label} className="flex items-center gap-2">
                        {index > 0 && (
                            <span style={{ color: 'var(--text-primary)', opacity: 0.2 }}>&gt;</span>
                        )}
                        {crumb.isActive ? (
                            <span className="text-indigo-400 font-medium">{crumb.label}</span>
                        ) : (
                            <a
                                href={crumb.href || '#'}
                                className="hover:text-[var(--text-primary)] transition-colors"
                            >
                                {crumb.label}
                            </a>
                        )}
                    </span>
                ))}
            </nav>

            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)]/70 glow-text">
                    {title}
                </h1>
                <div
                    className="flex items-center gap-6 text-sm border-b pb-8"
                    style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                            {author.initials}
                        </div>
                        <span>{author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] opacity-70">schedule</span>
                        <span>{readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                            style={{
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                color: '#6366f1',
                                borderColor: 'rgba(99, 102, 241, 0.2)',
                            }}
                        >
                            {version}
                        </span>
                        <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                            style={{
                                backgroundColor: statusStyles.bg,
                                color: statusStyles.text,
                                borderColor: statusStyles.border,
                            }}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    </div>
                </div>
            </header>

            {children}
        </>
    );
}