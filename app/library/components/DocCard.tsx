'use client';

import Link from 'next/link';
import { DocCard as DocCardType, ViewMode } from '../types';
import { getStatusColor, getCategoryProgressColor } from '../utils';

interface DocCardProps {
    card: DocCardType;
    viewMode: ViewMode;
}

export function DocCardComponent({ card, viewMode }: DocCardProps) {
    const statusColors = getStatusColor(card.status);
    const progressColor = getCategoryProgressColor(card.category);
    const href = `/content/module/${card.slug}`;

    // Icon component - renders external image or material icon
    const CardIcon = () => {
        if (card.iconUrl) {
            return (
                <img 
                    src={card.iconUrl} 
                    alt={card.title}
                    className="w-8 h-8 object-contain"
                />
            );
        }
        return (
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                {card.icon}
            </span>
        );
    };

    // Category Badges component
    const CategoryBadges = () => (
        <div className="flex flex-wrap items-center gap-1">
            {card.badges.map((badge, index) => (
                <span
                    key={index}
                    className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full"
                    style={{
                        backgroundColor: `${badge.color}20`,
                        color: badge.color,
                        border: `1px solid ${badge.color}40`,
                    }}
                >
                    {badge.label}
                </span>
            ))}
        </div>
    );

    if (viewMode === 'list') {
        return (
            <Link href={href} className="block">
                <article
                    key={card.id}
                    className="glass-card rounded-2xl p-5 flex items-center gap-6 group cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center category-icon transition-all duration-300 shrink-0">
                        <CardIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-1">
                            <h3
                                className="text-lg font-semibold transition-colors duration-200 group-hover:text-[var(--accent-primary)] truncate"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {card.title}
                            </h3>
                            <div className="flex flex-wrap gap-1 shrink-0">
                                <CategoryBadges />
                            </div>
                        </div>
                        <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                            {card.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
                            style={{
                                backgroundColor: statusColors.bg,
                                color: statusColors.text,
                                borderColor: statusColors.border,
                            }}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`}></span>
                            {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                        </span>
                        <div className="text-right">
                            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                {card.articles} Articles
                            </div>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {card.progress}%
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    // Grid view
    return (
        <Link href={href} className="block h-full">
            <article
                key={card.id}
                className={`glass-card rounded-2xl p-7 flex flex-col justify-between group cursor-pointer hover:shadow-lg transition-all duration-300 h-full`}
            >
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center category-icon transition-all duration-300">
                            <CardIcon />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <CategoryBadges />
                        </div>
                    </div>
                    <h3
                        className="text-xl font-semibold mb-2 transition-colors duration-200 group-hover:text-[var(--accent-primary)]"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                        {card.description}
                    </p>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
                            style={{
                                backgroundColor: statusColors.bg,
                                color: statusColors.text,
                                borderColor: statusColors.border,
                            }}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`}></span>
                            {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                        </span>
                    </div>
                    <div
                        className="flex items-center justify-between text-xs mb-2 font-medium"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <span>{card.articles} Articles</span>
                        <span style={{ color: 'var(--text-primary)' }}>{card.progress}%</span>
                    </div>
                    <div
                        className="w-full h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--border-color)' }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${card.progress}%`, backgroundColor: progressColor }}
                        ></div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
