'use client';

import { useState } from 'react';

interface CodeLine {
    number: number;
    content: React.ReactNode;
}

interface ModuleCodeBlockProps {
    filename: string;
    language?: string;
    code: string;
    showLineNumbers?: boolean;
    showCopy?: boolean;
    showRun?: boolean;
}

export default function ModuleCodeBlock({
    filename,
    language = 'go',
    code,
    showLineNumbers = true,
    showCopy = true,
    showRun = true,
}: ModuleCodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Simple syntax highlighting
    const highlightCode = (code: string) => {
        const lines = code.split('\n');
        return lines.map((line, index) => {
            // This is a simplified highlighter - in production, use a proper syntax highlighter
            let highlightedLine = line
                .replace(/(\bpackage\b|\bimport\b|\bfunc\b|\bvar\b|\breturn\b)/g, '<span class="syntax-keyword">$1</span>')
                .replace(/(".*?")/g, '<span class="syntax-string">$1</span>')
                .replace(/(\bint\b|\bbool\b|\bstring\b)/g, '<span class="syntax-type">$1</span>')
                .replace(/(\/\/.*$)/g, '<span class="syntax-comment">$1</span>')
                .replace(/(\b\d+\b)/g, '<span class="syntax-number">$1</span>')
                .replace(/(\b[A-Z][a-zA-Z0-9]*\b)/g, '<span class="syntax-func">$1</span>');

            return (
                <div key={index} className="leading-6">
                    {showLineNumbers && (
                        <span className="text-white/20 select-none mr-4 w-6 inline-block text-right">
                            {index + 1}
                        </span>
                    )}
                    <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
                </div>
            );
        });
    };

    return (
        <div className="module-glass-panel rounded-xl overflow-hidden my-8 shadow-2xl ring-1 ring-white/5 group">
            <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.05)' }}
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-blue-400">description</span>
                    <span
                        className="text-xs font-bold tracking-wider"
                        style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)' }}
                    >
                        {filename.toUpperCase()}
                    </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {showCopy && (
                        <button
                            onClick={handleCopy}
                            aria-label="Copy code"
                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                            title={copied ? 'Copied!' : 'Copy'}
                        >
                            <span className="material-symbols-outlined text-[16px]">
                                {copied ? 'check' : 'content_copy'}
                            </span>
                        </button>
                    )}
                    {showRun && (
                        <button
                            aria-label="Run code"
                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors hover:text-green-400"
                            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        >
                            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="p-5 overflow-x-auto module-code-block">
                <pre
                    className="text-sm leading-6"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    <code>{highlightCode(code)}</code>
                </pre>
            </div>
        </div>
    );
}