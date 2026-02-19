# MDX Content Generation Rules

## 1. File Structure

```
content/module/{module-name}/
├── a1.mdx
├── a2.mdx
└── ...
```

- Use simple numeric naming: `a1.mdx`, `a2.mdx` or `la1.mdx`, `la2.mdx`
- Each module gets its own folder under `content/module/`

---

## 2. Required Frontmatter

Every MDX file **MUST** have this frontmatter:

```yaml
---
title: "Sesi 1: Topic Title"
description: "Brief description of this session"
category: "python"
tags: ["python", "basics"]
order: 1
---
```

**Fields:**
- `title` - Display title (required)
- `description` - Brief summary (required)
- `category` - Module identifier (required)
- `tags` - Array of tags (optional)
- `order` - Sort order number (required for proper sequencing)

---

## 3. Patterns That Cause MDX Errors

### ❌ Avoid These Patterns

| Pattern | Problem | Solution |
|---------|---------|----------|
| `@props([...])` | MDX treats `@` as JSX | Use in code blocks only with backticks |
| `@auth`, `@guest`, `@env` | Blade directives conflict | Put in code blocks |
| `<div class="...">` | HTML-like tags conflict | Use only in code blocks |
| `<InfoBox>` | Unregistered component | Don't use custom components |

### ✅ Good Code Block Examples

```mdx
// ✅ GOOD
```php
@props(['name' => 'Guest'])
```

// ✅ GOOD
```python
def hello():
    pass
```

### ❌ Bad Examples

```mdx
// ❌ BAD - Will cause parse error
@props(['name' => 'Guest'])

// ❌ BAD  
<div class="tabs-container">
Content
</div>
```

---

## 4. Adding a New Module Card

In `app/library/data.ts`, add:

```typescript
{
    id: '9',
    title: 'Python',
    description: 'Python programming guide for beginners',
    category: 'Programming Language',
    categoryLabel: 'Backend',
    icon: 'code',
    iconUrl: 'https://example.com/python-logo.png',  // Optional: external icon URL
    status: 'beta',
    articles: 10,
    progress: 20,
    createdAt: '2024-01-01',
    popularity: 1000,
    badges: [
        { label: 'Python', color: '#3776ab' },
        { label: 'Backend', color: '#10b981' }
    ],
    slug: 'python',
},
```

**Note:** 
- `icon` - Material Symbols icon name (fallback if no iconUrl)
- `iconUrl` - Optional external image URL for custom logos (recommended size: 48x48px)

---

## 5. Route Configuration

In `app/content/module/[slug]/page.tsx`, add to `slugToFolderMap`:

```typescript
const slugToFolderMap: Record<string, string> = {
    'laravel': 'laravel',
    'astro': 'astrojs',
    'python': 'python',  // ← Add new module here
};
```

---

## 6. Files to Skip (Known Issues)

Some files may cause build errors due to complex syntax. These are handled automatically:

- `la27.mdx`
- `la35.mdx`  
- `a8.mdx`

If a new file causes similar errors, add it to the `SKIP_FILES` array in `app/content/module/[slug]/page.tsx`.

---

## 7. Using Reusable Components

The following components are available for use in MDX files:

### 7.1 InfoBox Component

Use `<InfoBox>` for highlighting important information:

```mdx
<InfoBox title="💡 Tip Title" variant="tip">
Your helpful content here...
</InfoBox>
```

**Available Variants:**
| Variant | Color | Use Case |
|---------|-------|----------|
| `info` (default) | Blue | General information |
| `tip` | Green | Tips and best practices |
| `warning` | Amber | Warnings and cautions |
| `danger` | Red | Errors and critical alerts |

**Example:**
```mdx
<InfoBox title="Important Note" variant="warning">
This is a warning message for users.
</InfoBox>

<InfoBox title="💡 Pro Tip" variant="tip">
Use this pattern for better performance.
</InfoBox>

<InfoBox title="Error" variant="danger">
This action cannot be undone.
</InfoBox>
```

### 7.2 CodeBlock Component

Use `<CodeBlock>` for displaying code with syntax highlighting:

```mdx
<CodeBlock 
    filename="example.py" 
    language="python"
    code={`def hello():
    print("Hello, World!")`}
/>
```

**Props:**
- `filename` - Display name for the file (required)
- `language` - Programming language for syntax highlighting (required)
- `code` - The code content (required)
- `showLineNumbers` - Show line numbers (optional, default: true)
- `showCopy` - Show copy button (optional, default: true)
- `showRun` - Show run button (optional, default: true)

### 7.3 Built-in HTML Elements

These HTML elements are automatically styled:

| Element | Usage |
|---------|-------|
| `h1`, `h2`, `h3` | Headings |
| `p` | Paragraphs |
| `ul`, `ol`, `li` | Lists |
| `code` | Inline code |
| `pre` | Code blocks (automatic with triple backticks) |
| `a` | Links |
| `blockquote` | Blockquotes |
| `table`, `thead`, `tbody`, `tr`, `th`, `td` | Tables |
| `strong`, `em` | Text emphasis |
| `hr` | Horizontal rule |

### ❌ Avoid Custom HTML Tags

Do NOT use raw HTML like `<div>`, `<span>`, `<section>` outside of code blocks - they may cause MDX parsing errors.

---

## 8. Testing Checklist

Before deploying:
- [ ] Run `npm run build` to check for errors
- [ ] Check that module card appears in library
- [ ] Verify clicking card loads content
- [ ] Check all MDX files compile without errors

---

## Summary

1. Create folder: `content/module/{slug}/`
2. Add MDX files with proper frontmatter
3. Avoid `@` at start of lines (except in code blocks)
4. Use `<InfoBox>` and `<CodeBlock>` components for rich content
5. Add card to `app/library/data.ts`
6. Add route mapping in `app/content/module/[slug]/page.tsx`
7. Test with `npm run build`
