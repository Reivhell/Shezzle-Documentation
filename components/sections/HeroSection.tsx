'use client';

import { useState } from 'react';

export default function HeroSection() {
    const [copied, setCopied] = useState(false);

    const codeContent = `import { defineConfig } from '@devportal/core';

export default defineConfig({
  theme: {
    mode: 'light',
    glassmorphism: true,
    colors: {
      primary: '#6366f1', // Indigo 500
      background: '#ffffff'
   }
  },
  plugins: [search(), analytics()]
});`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wider mb-6 animate-fade-in-up">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
                    v3.0 DOCUMENTATION RELEASED
                </div>

                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight text-slate-900 dark:text-white">
                    Build darker,
                    <br />
                    <span className="gradient-text">deeper</span>, and faster.
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-8 leading-relaxed">
                    The next generation developer portal. Minimalist design, maximal utility.
                    Access 500+ API references, and integration guides in a unified glass ecosystem.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 mb-12">
                    <a
                        className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
                        href="/library"
                    >
                        Browse Library
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                    <a
                        className="btn-secondary px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
                        href="/docs"
                    >
                        <span className="material-symbols-outlined text-[18px]">menu_book</span>
                        Documentation
                    </a>
                </div>

                <div className="w-full max-w-2xl code-block relative group">
                    <div className="code-header">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                            example.config.ts
                        </span>
                        <button 
                            onClick={handleCopy}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            aria-label={copied ? 'Copied!' : 'Copy code'}
                        >
                            <span className="material-symbols-outlined text-[16px]">
                                {copied ? 'check' : 'content_copy'}
                            </span>
                        </button>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <pre className="font-code text-[13px] leading-relaxed">
                            <code>
                                <span className="code-number select-none mr-3">1</span>
                                <span className="code-keyword">import</span> {'{ '}<span className="code-func">defineConfig</span>{' }'}{' '}
                                <span className="code-keyword">from</span> <span className="code-string">&apos;@devportal/core&apos;</span>;{'\n'}
                                <span className="code-number select-none mr-3">2</span>
                                {'\n'}
                                <span className="code-number select-none mr-3">3</span>
                                <span className="code-keyword">export default</span>{' '}
                                <span className="code-func">defineConfig</span>({'{'}{'\n'}
                                <span className="code-number select-none mr-3">4</span>
                                {'  '}<span className="code-plain">theme:</span> {'{'}{'\n'}
                                <span className="code-number select-none mr-3">5</span>
                                {'    '}<span className="code-plain">mode:</span>{' '}
                                <span className="code-string">&apos;light&apos;</span>,{'\n'}
                                <span className="code-number select-none mr-3">6</span>
                                {'    '}<span className="code-plain">glassmorphism:</span>{' '}
                                <span className="code-keyword">true</span>,{'\n'}
                                <span className="code-number select-none mr-3">7</span>
                                {'    '}<span className="code-plain">colors:</span> {'{'}{'\n'}
                                <span className="code-number select-none mr-3">8</span>
                                {'      '}<span className="code-plain">primary:</span>{' '}
                                <span className="code-string">&apos;#6366f1&apos;</span>{' '}
                                <span className="code-comment">, // Indigo 500</span>
                                {'\n'}
                                <span className="code-number select-none mr-3">9</span>
                                {'      '}<span className="code-plain">background:</span>{' '}
                                <span className="code-string">&apos;#ffffff&apos;</span>
                                {'\n'}
                                <span className="code-number select-none mr-3">10</span>
                                {'   }'}{'\n'}
                                <span className="code-number select-none mr-3">11</span>
                                {'  }'},{'\n'}
                                <span className="code-number select-none mr-3">12</span>
                                {'  '}<span className="code-plain">plugins:</span> [
                                <span className="code-func">search</span>(),{' '}
                                <span className="code-func">analytics</span>()]{'\n'}
                                <span className="code-number select-none mr-3">13</span>
                                {'}'});{'\n'}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}