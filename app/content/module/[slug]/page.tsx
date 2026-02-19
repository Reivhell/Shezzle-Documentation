import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ModuleLayout from '@/components/module/ModuleLayout';
import ModuleHeader from '@/components/module/ModuleHeader';
import { useMDXComponents } from '@/components/module/mdx-components';

interface ModuleFrontmatter {
    title: string;
    description: string;
    category: string;
    tags: string[];
    order: number;
}

// Map of slug to folder name - MUST be defined before use
const slugToFolderMap: Record<string, string> = {
    'laravel': 'laravel',
};

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Files to skip due to MDX parsing issues
const SKIP_FILES = ['la27.mdx', 'la35.mdx', 'a8.mdx'];

async function getModuleContents(folderName: string) {
    try {
        const folderPath = path.join(process.cwd(), 'content', 'module', folderName);
        const files = await fs.readdir(folderPath);
        
        const mdxFiles = files.filter(file => file.endsWith('.mdx') && !SKIP_FILES.includes(file));
        
        const contents: {
            slug: string;
            content: any;
            frontmatter: ModuleFrontmatter;
        }[] = [];

        for (const file of mdxFiles) {
            try {
                const filePath = path.join(folderPath, file);
                const fileContent = await fs.readFile(filePath, 'utf8');
                
                const { content, frontmatter } = await compileMDX<ModuleFrontmatter>({
                    source: fileContent,
                    options: { parseFrontmatter: true },
                    components: useMDXComponents({}),
                });
                
                contents.push({
                    slug: file.replace('.mdx', ''),
                    content,
                    frontmatter: frontmatter || { title: file.replace('.mdx', ''), description: '', category: '', tags: [], order: 0 },
                });
            } catch (fileError) {
                console.warn(`Skipping file ${file} due to compilation error:`, fileError);
            }
        }
        
        if (contents.length === 0) return null;
        
        return contents.sort((a, b) => {
            const orderA = a.frontmatter?.order ?? 0;
            const orderB = b.frontmatter?.order ?? 0;
            return orderA - orderB;
        });
    } catch (error) {
        console.error('Error reading module contents:', error);
        return null;
    }
}

async function getSidebarItems(folderName: string) {
    try {
        const folderPath = path.join(process.cwd(), 'content', 'module', folderName);
        const files = await fs.readdir(folderPath);
        
        const items: {
            label: string;
            href: string;
            icon: string;
            order: number;
        }[] = [];

        for (const file of files) {
            if (!file.endsWith('.mdx') || SKIP_FILES.includes(file)) continue;
            
            try {
                const filePath = path.join(folderPath, file);
                const content = await fs.readFile(filePath, 'utf8');
                const { frontmatter } = await compileMDX<ModuleFrontmatter>({
                    source: content,
                    options: { parseFrontmatter: true },
                });
                
                items.push({
                    label: frontmatter?.title || file.replace('.mdx', ''),
                    href: `#${file.replace('.mdx', '')}`,
                    icon: 'article',
                    order: frontmatter?.order || 0,
                });
            } catch {
                // Skip files that fail to compile
            }
        }
        
        return items.sort((a, b) => {
            const orderA = a.order ?? 0;
            const orderB = b.order ?? 0;
            return orderA - orderB;
        });
    } catch (error) {
        console.error('Error reading sidebar items:', error);
        return [];
    }
}

export default async function ContentModulePage({ params }: PageProps) {
    const { slug } = await params;
    const folderName = slugToFolderMap[slug] || slug;
    
    const contents = await getModuleContents(folderName);
    
    if (!contents || contents.length === 0) {
        notFound();
    }
    
    const sidebarItems = await getSidebarItems(folderName);
    const firstContent = contents[0];
    
    return (
        <ModuleLayout
            sidebarItems={[
                {
                    title: folderName.charAt(0).toUpperCase() + folderName.slice(1),
                    items: sidebarItems.map(item => ({
                        ...item,
                        isActive: false,
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
            <div className="mb-6">
                <Link 
                    href="/library"
                    className="text-sm hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
                    Back to Library
                </Link>
            </div>
            
            <ModuleHeader
                title={firstContent.frontmatter.title || folderName}
                breadcrumbs={[
                    { label: 'Library', href: '/library' },
                    { label: folderName.charAt(0).toUpperCase() + folderName.slice(1), isActive: true },
                ]}
                author={{ name: 'DevPortal Team', initials: 'DP' }}
                readTime="5 min read"
                version="v1.0.0"
                status="stable"
            />
            
            <div className="space-y-12">
                {contents.map((item, index) => (
                    <article 
                        key={item.slug} 
                        id={item.slug}
                        className="module-prose" 
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {index > 0 && (
                            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                                {item.frontmatter.title || item.slug}
                            </h2>
                        )}
                        {item.content}
                    </article>
                ))}
            </div>
            
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

// Generate static params for all supported modules
export async function generateStaticParams() {
    return Object.keys(slugToFolderMap).map(slug => ({ slug }));
}
