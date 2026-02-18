'use client';

interface NavLink {
    label: string;
    href: string;
    direction: 'previous' | 'next';
}

interface ModuleNavLinksProps {
    previous?: NavLink;
    next?: NavLink;
}

export default function ModuleNavLinks({ previous, next }: ModuleNavLinksProps) {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-10 border-t"
            style={{ borderColor: 'var(--border-color)' }}
        >
            {previous && (
                <a
                    href={previous.href}
                    className="module-glass-panel rounded-xl p-6 module-glass-panel-hover group relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                            background: 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), transparent)',
                        }}
                    ></div>
                    <div className="relative z-10">
                        <span
                            className="text-xs font-bold uppercase tracking-wider mb-2 block group-hover:text-indigo-400 transition-colors"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Previous
                        </span>
                        <div className="flex items-center gap-3">
                            <span
                                className="material-symbols-outlined transition-colors transform group-hover:-translate-x-1 duration-300"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                arrow_back
                            </span>
                            <span
                                className="text-lg font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {previous.label}
                            </span>
                        </div>
                    </div>
                </a>
            )}

            {next && (
                <a
                    href={next.href}
                    className={`module-glass-panel rounded-xl p-6 module-glass-panel-hover group relative overflow-hidden ${
                        !previous ? 'md:col-start-2' : ''
                    }`}
                >
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                            background: 'linear-gradient(to bottom left, rgba(99, 102, 241, 0.05), transparent)',
                        }}
                    ></div>
                    <div className="relative z-10 text-right">
                        <span
                            className="text-xs font-bold uppercase tracking-wider mb-2 block group-hover:text-indigo-400 transition-colors"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Next
                        </span>
                        <div className="flex items-center gap-3 justify-end">
                            <span
                                className="text-lg font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {next.label}
                            </span>
                            <span
                                className="material-symbols-outlined transition-colors transform group-hover:translate-x-1 duration-300"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                arrow_forward
                            </span>
                        </div>
                    </div>
                </a>
            )}
        </div>
    );
}