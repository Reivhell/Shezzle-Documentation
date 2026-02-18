const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content', 'module');

function fixFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    const frontmatterRegex = /^---\n[\s\S]*?\n---\n/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
        const frontmatter = match[0];
        let rest = content.slice(match[0].length);
        
        rest = rest.replace(/^\n*---\n*/, '');
        
        content = frontmatter + rest;
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Fixed: ${path.basename(filepath)}`);
    }
}

function walkDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            walkDirectory(fullPath);
        } else if (entry.name.endsWith('.mdx')) {
            fixFile(fullPath);
        }
    }
}

console.log('Fixing extra --- in MDX files...');
walkDirectory(contentDir);
console.log('Done!');
