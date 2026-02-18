import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import ModuleLayout from '@/components/module/ModuleLayout';
import ModuleHeader from '@/components/module/ModuleHeader';
import ModuleNavLinks from '@/components/module/ModuleNavLinks';
import { useMDXComponents } from '@/components/module/mdx-components';

interface ModuleFrontmatter {
    title: string;
    description: string;
    category: string;
    tags: string[];
    order: number;
}

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

async function getModuleContent(category: string, slug: string) {
    try {
        const filePath = path.join(process.cwd(), 'content', 'module', category, `${slug}.mdx`);
        const fileContent = await fs.readFile(filePath, 'utf8');
        
        const { content, frontmatter } = await compileMDX<ModuleFrontmatter>({
            source: fileContent,
            options: { parseFrontmatter: true },
            components: useMDXComponents({}),
        });
        
        return { content, frontmatter };
    } catch (error) {
        return null;
    }
}

async function getSidebarItems(category: string) {
    try {
        const categoryPath = path.join(process.cwd(), 'content', 'module', category);
        const files = await fs.readdir(categoryPath);
        
        const items = await Promise.all(
            files
                .filter(file => file.endsWith('.mdx'))
                .map(async (file) => {
                    const filePath = path.join(categoryPath, file);
                    const content = await fs.readFile(filePath, 'utf8');
                    const { frontmatter } = await compileMDX<ModuleFrontmatter>({
                        source: content,
                        options: { parseFrontmatter: true },
                    });
                    
                    return {
                        label: frontmatter.title,
                        href: `/module/${category}/${file.replace('.mdx', '')}`,
                        icon: 'article',
                        order: frontmatter.order || 0,
                    };
                })
        );
        
        return items.sort((a, b) => a.order - b.order);
    } catch (error) {
        return [];
    }
}

export default async function ModulePage({ params }: PageProps) {
    const { category, slug } = await params;
    const data = await getModuleContent(category, slug);
    
    if (!data) {
        notFound();
    }
    
    const { content, frontmatter } = data;
    const sidebarItems = await getSidebarItems(category);
    
    const currentIndex = sidebarItems.findIndex(item => item.href.includes(slug));
    const previous = currentIndex > 0 ? {
        label: sidebarItems[currentIndex - 1].label,
        href: sidebarItems[currentIndex - 1].href,
        direction: 'previous' as const,
    } : undefined;
    
    const next = currentIndex < sidebarItems.length - 1 ? {
        label: sidebarItems[currentIndex + 1].label,
        href: sidebarItems[currentIndex + 1].href,
        direction: 'next' as const,
    } : undefined;

    return (
        <ModuleLayout
            sidebarItems={[
                {
                    title: category.charAt(0).toUpperCase() + category.slice(1),
                    items: sidebarItems.map(item => ({
                        ...item,
                        isActive: item.href.includes(slug),
                    })),
                },
            ]}
            tocItems={[
                { label: 'Introduction', href: '#', isActive: true },
                { label: 'Getting Started', href: '#getting-started' },
                { label: 'Configuration', href: '#configuration' },
                { label: 'Examples', href: '#examples' },
            ]}
        >
            <ModuleHeader
                title={frontmatter.title}
                breadcrumbs={[
                    { label: 'Guides', href: '/library' },
                    { label: category.charAt(0).toUpperCase() + category.slice(1), href: `/module/${category}` },
                    { label: frontmatter.title, isActive: true },
                ]}
                author={{ name: 'DevPortal Team', initials: 'DP' }}
                readTime="5 min read"
                version="v1.0.0"
                status="stable"
            />
            
            <article className="module-prose" style={{ color: 'var(--text-secondary)' }}>
                {content}
            </article>
            
            <ModuleNavLinks previous={previous} next={next} />
            
            <footer 
                className="mt-20 pt-8 border-t text-sm flex justify-between items-center"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
                <div>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                <div className="flex gap-4">
                    <a className="hover:text-[var(--text-primary)] transition-colors" href="#">Edit on GitHub</a>
                    <a className="hover:text-[var(--text-primary)] transition-colors" href="#">Report Issue</a>
                </div>
            </footer>
        </ModuleLayout>
    );
}

export async function generateStaticParams() {
    const contentPath = path.join(process.cwd(), 'content', 'module');
    
    try {
        const categories = await fs.readdir(contentPath);
        const params: { category: string; slug: string }[] = [];
        
        for (const category of categories) {
            const categoryPath = path.join(contentPath, category);
            const stat = await fs.stat(categoryPath);
            
            if (stat.isDirectory()) {
                const files = await fs.readdir(categoryPath);
                
                for (const file of files) {
                    if (file.endsWith('.mdx')) {
                        params.push({
                            category,
                            slug: file.replace('.mdx', ''),
                        });
                    }
                }
            }
        }
        
        return params;
    } catch (error) {
        return [];
    }
}
