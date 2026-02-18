'use client';

import { useTheme } from '@/components/ThemeProvider';

interface SidebarItem {
    label: string;
    href: string;
    icon: string;
    isActive?: boolean;
    isFolder?: boolean;
}

interface SidebarSection {
    title: string;
    items: SidebarItem[];
}

interface ModuleSidebarProps {
    sections: SidebarSection[];
}

export default function ModuleSidebar({ sections }: ModuleSidebarProps) {
    const { theme } = useTheme();

    return (
        <aside
            className="hidden lg:block w-72 fixed h-[calc(100vh-4rem)] overflow-y-auto border-r module-sidebar-scroll pb-10"
            style={{ borderColor: 'var(--border-color)' }}
        >
            <div className="p-6">
                {sections.map((section, sectionIndex) => (
                    <div key={section.title} className={sectionIndex > 0 ? 'mb-8' : 'mb-8'}>
                        <h3
                            className="text-xs font-semibold uppercase tracking-wider mb-4 px-2"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.items.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors group ${
                                            item.isActive
                                                ? 'font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20'
                                                : 'hover:text-[var(--text-primary)] hover:bg-white/5'
                                        }`}
                                        style={{
                                            color: item.isActive ? undefined : 'var(--text-secondary)',
                                        }}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-[18px] transition-colors ${
                                                item.isActive
                                                    ? ''
                                                    : 'text-white/30 group-hover:text-indigo-400'
                                            }`}
                                        >
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
}