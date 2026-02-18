import type { MDXComponents } from 'mdx/types';
import ModuleCodeBlock from './ModuleCodeBlock';
import ModuleInfoBox from './ModuleInfoBox';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 pl-4 border-l-4 border-indigo-500 relative">
                <div 
                    className="absolute -left-[3px] top-0 bottom-0 w-[3px] rounded-l-sm"
                    style={{ background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))' }}
                ></div>
                <span className="material-symbols-outlined text-indigo-400">tag</span>
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold mb-4 mt-8" style={{ color: 'var(--text-primary)' }}>
                {children}
            </h3>
        ),
        p: ({ children }) => (
            <p className="mb-6 leading-8" style={{ color: 'var(--text-secondary)' }}>
                {children}
            </p>
        ),
        code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
                return (
                    <code 
                        className="px-1.5 py-0.5 rounded text-sm"
                        style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#818cf8',
                            fontFamily: 'var(--font-mono)'
                        }}
                    >
                        {children}
                    </code>
                );
            }
            // For code blocks, we'll use the pre component
            return <code className={className}>{children}</code>;
        },
        pre: ({ children }) => {
            // Extract code content and language from children
            const codeElement = children as React.ReactElement<{ className?: string; children?: string }>;
            const className = codeElement?.props?.className || '';
            const language = className.replace('language-', '') || 'bash';
            const code = codeElement?.props?.children || '';
            
            return (
                <ModuleCodeBlock
                    filename={`example.${language}`}
                    language={language}
                    code={code}
                />
            );
        },
        ul: ({ children }) => (
            <ul className="mb-6 space-y-2 ml-6" style={{ color: 'var(--text-secondary)' }}>
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="mb-6 space-y-2 ml-6 list-decimal" style={{ color: 'var(--text-secondary)' }}>
                {children}
            </ol>
        ),
        li: ({ children }) => (
            <li className="leading-7">{children}</li>
        ),
        a: ({ children, href }) => (
            <a 
                href={href} 
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
                {children}
            </a>
        ),
        blockquote: ({ children }) => (
            <blockquote 
                className="border-l-4 border-indigo-500 pl-4 py-2 my-6 italic"
                style={{ 
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--text-secondary)'
                }}
            >
                {children}
            </blockquote>
        ),
        table: ({ children }) => (
            <div className="overflow-x-auto my-8">
                <table className="w-full border-collapse">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }) => (
            <thead style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                {children}
            </thead>
        ),
        th: ({ children }) => (
            <th 
                className="text-left p-4 font-semibold border-b"
                style={{ 
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                }}
            >
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td 
                className="p-4 border-b"
                style={{ 
                    color: 'var(--text-secondary)',
                    borderColor: 'var(--border-color)'
                }}
            >
                {children}
            </td>
        ),
        hr: () => (
            <hr className="my-8" style={{ borderColor: 'var(--border-color)' }} />
        ),
        strong: ({ children }) => (
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {children}
            </strong>
        ),
        em: ({ children }) => (
            <em className="italic" style={{ color: 'var(--text-primary)' }}>
                {children}
            </em>
        ),
        // Custom components
        InfoBox: ModuleInfoBox,
        CodeBlock: ModuleCodeBlock,
        ...components,
    };
}
