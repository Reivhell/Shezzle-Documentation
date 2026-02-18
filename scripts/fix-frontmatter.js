const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content', 'module');

const sessionTitles = {
    'la2': 'Sesi 2: Instalasi & Environment Setup',
    'la3': 'Sesi 3: Struktur Direktori Laravel 12',
    'la4': 'Sesi 4: Request Lifecycle & Kernel',
    'la5': 'Sesi 5: Routing System',
    'la6': 'Sesi 6: Controller Patterns',
    'la7': 'Sesi 7: Request Handling & Validation',
    'la8': 'Sesi 8: Response & Views',
    'la9': 'Sesi 9: Blade Templating Advanced',
    'la10': 'Sesi 10: Asset Management & Vite',
    'la11': 'Sesi 11: Service Container Deep Dive',
    'la12': 'Sesi 12: Service Providers',
    'la13': 'Sesi 13: Facades & Contracts',
    'la26': 'Sesi 26: Database Configuration & Migrations',
    'la27': 'Sesi 27: Advanced Migrations & Schema Design',
    'la28': 'Sesi 28: Eloquent Model Fundamentals',
    'la29': 'Sesi 29: Eloquent Relationships (One-to-One & One-to-Many)',
    'la30': 'Sesi 30: Eloquent Relationships (Many-to-Many & Polymorphic)',
    'la31': 'Sesi 31: Eloquent Query Builder & Collections',
    'la32': 'Sesi 32: Advanced Eloquent Patterns',
    'la33': 'Sesi 33: Database Transactions',
    'la34': 'Sesi 34: Seeding & Model Factories',
    'la35': 'Sesi 35: Database Optimization',
    'la36': 'Sesi 36: Authentication Architecture',
    'la37': 'Sesi 37: Laravel Breeze (Starter Kit)',
    'la38': 'Sesi 38: Laravel Jetstream (Advanced Starter Kit)',
    'la39': 'Sesi 39: Laravel Fortify (Headless Authentication)',
    'la40': 'Sesi 40: API Authentication dengan Sanctum',
    'la41': 'Sesi 41: OAuth & Social Authentication (Socialite)',
    'la42': 'Sesi 42: Authorization: Gates & Policies',
    'la43': 'Sesi 43: Advanced Authorization Patterns',
    'la44': 'Sesi 44: Security Hardening',
    'la45': 'Sesi 45: Rate Limiting & Throttling',
    'la47': 'Sesi 47: Laravel Horizon (Queue Monitoring)',
    'la48': 'Sesi 48: Laravel Telescope (Debugging)',
    'la49': 'Sesi 49: Laravel Scout (Search)',
    'la50': 'Sesi 50: Laravel Cashier (Payments)',
    'la51': 'Sesi 51: Laravel Dusk (Browser Testing)',
    'la52': 'Sesi 52: Laravel Echo & Broadcasting',
    'la53': 'Sesi 53: Laravel Reverb (Real-time WebSockets)',
    'la54': 'Sesi 54: Laravel Pennant (Feature Flags)',
    'la55': 'Sesi 55: Laravel Pulse (Application Monitoring)',
    'la56': 'Sesi 56: Laravel Prompts (CLI UX)',
    'la57': 'Sesi 57: Laravel Pail (Log Monitoring)',
    'la58': 'Sesi 58: Laravel Folio (Page-based Routing)',
    'la59': 'Sesi 59: Laravel Pint (Code Style)',
    'la60': 'Sesi 60: Laravel Sail (Docker Development)',
    'la61': 'Sesi 61: Filament (Admin Panel)',
    'la62': 'Sesi 62: Livewire (Full-stack Framework)',
    'la63': 'Sesi 63: Inertia.js Integration',
    'la64': 'Sesi 64: Alpine.js Essentials',
    'la72': 'Sesi 72: Logging & Monitoring Production',
    'la73': 'Sesi 73: Queue Architecture di Scale',
    'la74': 'Sesi 74: Multi-tenancy Strategies',
    'la75': 'Sesi 75: Microservices & Distributed Systems',
    'la76': 'Sesi 76: Domain-Driven Design (DDD) dalam Laravel',
    'la77': 'Sesi 77: Hexagonal Architecture / Clean Architecture',
    'la78': 'Sesi 78: Event Sourcing & CQRS',
    'a1': 'Sesi 1: Pendahuluan & Konsep Inti Astro Framework',
    'a2': 'Sesi 2: Instalasi & Setup Project',
    'a3': 'Sesi 3: Sintaks Dasar Astro Components',
    'a4': 'Sesi 4: Routing & Halaman',
    'a5': 'Sesi 5: Components & Framework Integration',
    'a6': 'Sesi 6: Client Directives',
    'a7': 'Sesi 7: Layout Components',
    'a8': 'Sesi 8: Content Management',
    'a9': 'Sesi 9: Images & Assets',
    'a10': 'Sesi 10: Styling & CSS',
    'a11': 'Sesi 11: JavaScript & Interaktivitas',
    'a12': 'Sesi 12: Performance Optimization',
    'a13': 'Sesi 13: SSR, SSG & Hybrid Rendering',
    'a14': 'Sesi 14: Middleware & Server-Side Features',
    'a15': 'Sesi 15: Actions & Form Handling',
    'a16': 'Sesi 16: Server Islands',
    'a17': 'Sesi 17: Environment Variables & Configuration',
    'a18': 'Sesi 18: Official Integrations',
    'a19': 'Sesi 19: Adapters & Deployment',
    'a20': 'Sesi 20: Security Features',
    'a21': 'Sesi 21: Accessibility (A11y)',
    'a22': 'Sesi 22: Internationalization (i18n)',
    'a23': 'Sesi 23: View Transitions',
    'a24': 'Sesi 24: Testing dan Debugging',
    'a25': 'Sesi 25: Build dan Optimization',
};

function extractDescriptionFromContent(content) {
    const lines = content.split('\n');
    
    const paragraphs = [];
    let inCodeBlock = false;
    
    for (const line of lines) {
        if (line.includes('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        
        if (!inCodeBlock && line.trim().length > 50 && !line.startsWith('#') && !line.startsWith('|') && !line.startsWith('-') && !line.startsWith('>') && !line.startsWith('<')) {
            paragraphs.push(line.trim());
            if (paragraphs.length >= 2) break;
        }
    }
    
    if (paragraphs.length > 0) {
        return paragraphs[0].substring(0, 150) + (paragraphs[0].length > 150 ? '...' : '');
    }
    
    return '';
}

function extractOrderFromFilename(filename) {
    const match = filename.match(/(?:la|a)(\d+)/);
    if (match) {
        return parseInt(match[1], 10);
    }
    return 999;
}

function getCategoryFromFilepath(filepath) {
    if (filepath.includes('laravel')) return 'laravel';
    if (filepath.includes('astrojs')) return 'astrojs';
    return 'general';
}

function generateTags(category, title) {
    const baseTags = [category];
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('routing') || titleLower.includes('route')) baseTags.push('routing');
    if (titleLower.includes('controller')) baseTags.push('controller');
    if (titleLower.includes('database') || titleLower.includes('migration')) baseTags.push('database');
    if (titleLower.includes('authentication') || titleLower.includes('auth')) baseTags.push('authentication');
    if (titleLower.includes('api')) baseTags.push('api');
    if (titleLower.includes('middleware')) baseTags.push('middleware');
    if (titleLower.includes('blade') || titleLower.includes('view')) baseTags.push('frontend');
    if (titleLower.includes('testing') || titleLower.includes('test')) baseTags.push('testing');
    if (titleLower.includes('performance') || titleLower.includes('optimization')) baseTags.push('performance');
    if (titleLower.includes('security')) baseTags.push('security');
    if (titleLower.includes('deploy')) baseTags.push('deployment');
    if (titleLower.includes('instalasi') || titleLower.includes('setup') || titleLower.includes('environment')) baseTags.push('setup');
    if (titleLower.includes('component')) baseTags.push('components');
    if (titleLower.includes('build')) baseTags.push('build');
    if (titleLower.includes('request') || titleLower.includes('validation')) baseTags.push('request');
    if (titleLower.includes('service') || titleLower.includes('container')) baseTags.push('architecture');
    if (titleLower.includes('eloquent') || titleLower.includes('model')) baseTags.push('eloquent');
    
    return [...new Set(baseTags)];
}

function cleanContent(content) {
    let result = content;
    
    while (result.trimStart().startsWith('---')) {
        result = result.replace(/^---\n[\s\S]*?\n---\n*/, '');
    }
    
    result = result.split('\n').filter(line => {
        const trimmed = line.trim();
        if (trimmed === 'title:' || trimmed.startsWith('title: ') && !trimmed.startsWith('title: "')) {
            return false;
        }
        if (trimmed === 'description:' || trimmed.startsWith('description: ') && !trimmed.startsWith('description: "')) {
            return false;
        }
        if (trimmed === 'sidebar:') {
            return false;
        }
        if (trimmed.startsWith('order:') && !trimmed.includes('##')) {
            return false;
        }
        return !line.includes("@astrojs/starlight/components");
    }).join('\n');
    
    result = result.replace(/<Tabs>/g, '<div class="tabs-container">');
    result = result.replace(/<\/Tabs>/g, '</div>');
    result = result.replace(/<TabItem label="([^"]+)">/g, '\n### $1\n\n');
    result = result.replace(/<\/TabItem>/g, '\n');
    result = result.replace(/<Aside type="([^"]+)"[^>]*>/g, '> **$1**\n>');
    result = result.replace(/<Aside type="([^"]+)" title="([^"]+)">/g, '> **$2** ($1)\n>');
    result = result.replace(/<\/Aside>/g, '');
    result = result.replace(/<Steps>/g, '');
    result = result.replace(/<\/Steps>/g, '');
    result = result.replace(/<FileTree>/g, '```\n');
    result = result.replace(/<\/FileTree>/g, '```\n');
    result = result.replace(/<Diagram[^>]*>/g, '');
    result = result.replace(/<\/Diagram>/g, '');
    
    result = result.replace(/\n{3,}/g, '\n\n');
    result = result.trim();
    
    return result;
}

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    const filename = path.basename(filepath);
    const category = getCategoryFromFilepath(filepath);
    
    const cleanContentResult = cleanContent(content);
    
    const basename = filename.replace('.mdx', '');
    const title = sessionTitles[basename] || 'Untitled';
    const description = extractDescriptionFromContent(cleanContentResult) || `Materi ${title}`;
    const order = extractOrderFromFilename(filename);
    const tags = generateTags(category, title);
    
    const newFrontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
category: "${category}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
order: ${order}
---

`;

    const newContent = newFrontmatter + cleanContentResult + '\n';
    
    fs.writeFileSync(filepath, newContent, 'utf-8');
    console.log(`Processed: ${filename} - ${title}`);
}

function walkDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            walkDirectory(fullPath);
        } else if (entry.name.endsWith('.mdx')) {
            processFile(fullPath);
        }
    }
}

console.log('Processing MDX files...');
walkDirectory(contentDir);
console.log('Done!');
