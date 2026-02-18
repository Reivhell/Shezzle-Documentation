'use client';

import { ReactNode } from 'react';
import ModuleSidebar from './ModuleSidebar';
import ModuleToc from './ModuleToc';

interface ModuleLayoutProps {
    children: ReactNode;
    sidebarItems?: {
        title: string;
        items: {
            label: string;
            href: string;
            icon: string;
            isActive?: boolean;
            isFolder?: boolean;
        }[];
    }[];
    tocItems?: {
        label: string;
        href: string;
        isActive?: boolean;
    }[];
    showToc?: boolean;
}

export default function ModuleLayout({
    children,
    sidebarItems,
    tocItems,
    showToc = true,
}: ModuleLayoutProps) {
    return (
        <div className="flex flex-1 pt-16 max-w-[1600px] mx-auto w-full">
            {sidebarItems && <ModuleSidebar sections={sidebarItems} />}
            <main className="flex-1 lg:ml-72 flex min-h-[calc(100vh-4rem)]">
                <div className="flex-1 max-w-4xl px-6 py-10 lg:px-12 lg:py-16">
                    {children}
                </div>
                {showToc && tocItems && <ModuleToc items={tocItems} />}
            </main>
        </div>
    );
}