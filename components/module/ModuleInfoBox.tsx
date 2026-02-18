'use client';

import { ReactNode } from 'react';

interface ModuleInfoBoxProps {
    title: string;
    children: ReactNode;
    icon?: string;
    variant?: 'info' | 'warning' | 'tip' | 'danger';
}

export default function ModuleInfoBox({
    title,
    children,
    icon = 'info',
    variant = 'info',
}: ModuleInfoBoxProps) {
    const getVariantStyles = (variant: string) => {
        switch (variant) {
            case 'info':
                return {
                    border: '#3b82f6',
                    bg: 'rgba(59, 130, 246, 0.1)',
                    icon: 'text-blue-400',
                    title: 'text-blue-200',
                    text: 'text-blue-200/70',
                };
            case 'warning':
                return {
                    border: '#f59e0b',
                    bg: 'rgba(245, 158, 11, 0.1)',
                    icon: 'text-amber-400',
                    title: 'text-amber-200',
                    text: 'text-amber-200/70',
                };
            case 'tip':
                return {
                    border: '#10b981',
                    bg: 'rgba(16, 185, 129, 0.1)',
                    icon: 'text-emerald-400',
                    title: 'text-emerald-200',
                    text: 'text-emerald-200/70',
                };
            case 'danger':
                return {
                    border: '#ef4444',
                    bg: 'rgba(239, 68, 68, 0.1)',
                    icon: 'text-red-400',
                    title: 'text-red-200',
                    text: 'text-red-200/70',
                };
            default:
                return {
                    border: '#3b82f6',
                    bg: 'rgba(59, 130, 246, 0.1)',
                    icon: 'text-blue-400',
                    title: 'text-blue-200',
                    text: 'text-blue-200/70',
                };
        }
    };

    const styles = getVariantStyles(variant);

    return (
        <div
            className="rounded-lg p-5 my-8 flex items-start gap-4 module-info-box"
            style={{
                borderLeftWidth: '3px',
                borderLeftColor: styles.border,
                backgroundColor: styles.bg,
            }}
        >
            <span className={`material-symbols-outlined mt-0.5 ${styles.icon}`}>{icon}</span>
            <div>
                <h4 className={`font-semibold mb-1 text-sm ${styles.title}`}>{title}</h4>
                <div className={`text-sm ${styles.text}`}>{children}</div>
            </div>
        </div>
    );
}