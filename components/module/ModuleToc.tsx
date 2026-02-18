'use client';

import { ReactNode } from 'react';

interface TocItem {
    label: string;
    href: string;
    isActive?: boolean;
}

interface ModuleTocProps {
    items: TocItem[];
    cta?: {
        title: string;
        description: string;
        buttonText: string;
        onClick?: () => void;
    };
}

export default function ModuleToc({ items, cta }: ModuleTocProps) {
    return (
        <aside className="hidden xl:block w-64 p-10">
            <div className="sticky top-28">
                <h5
                    className="text-xs font-bold uppercase tracking-wider mb-4 pl-3"
                    style={{ color: 'var(--text-primary)' }}
                >
                    On This Page
                </h5>
                <nav className="relative">
                    <div
                        className="absolute left-0 top-0 bottom-0 w-[1px]"
                        style={{ backgroundColor: 'var(--border-color)' }}
                    ></div>
                    <div
                        className="absolute left-0 top-0 h-8 w-[2px] rounded-full"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                    ></div>
                    <ul className="space-y-1">
                        {items.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className={`block pl-4 py-1.5 text-sm border-l-2 border-transparent -ml-[2px] transition-colors ${
                                        item.isActive
                                            ? 'module-toc-active'
                                            : 'hover:text-[var(--text-primary)]'
                                    }`}
                                    style={{
                                        color: item.isActive ? undefined : 'var(--text-secondary)',
                                    }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {cta && (
                    <div
                        className="mt-8 p-4 rounded-xl border"
                        style={{
                            background: 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                            borderColor: 'rgba(99, 102, 241, 0.2)',
                        }}
                    >
                        <p
                            className="text-xs font-medium mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {cta.title}
                        </p>
                        <p
                            className="text-xs mb-3"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {cta.description}
                        </p>
                        <button
                            onClick={cta.onClick}
                            className="w-full py-1.5 text-xs font-semibold text-white rounded-lg transition-colors"
                            style={{ backgroundColor: 'var(--accent-primary)' }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = 'var(--accent-secondary)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')
                            }
                        >
                            {cta.buttonText}
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}