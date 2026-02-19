export type Category = 'Programming Language' | 'Framework' | 'Database' | 'Mobile' | 'Security' | 'DevOps';

export type SortOption = 'newest' | 'alphabetical' | 'popular' | 'difficulty';

export type ViewMode = 'grid' | 'list';

export type Status = 'stable' | 'beta' | 'deprecated';

export interface Badge {
    label: string;
    color: string;
}

export interface DocCard {
    id: string;
    title: string;
    description: string;
    category: Category | string;
    categoryLabel: string;
    icon: string;
    iconUrl?: string;
    status: Status;
    articles: number;
    progress: number;
    createdAt: string;
    popularity: number;
    badges: Badge[];
    slug: string;
}

export interface Bookmark {
    title: string;
    category: string;
    href: string;
}

export interface CategoryItem {
    name: string;
    count: number;
}

export interface StatusOption {
    label: string;
    color: string;
    ring: string;
    value: Status;
}

export interface StatusColors {
    bg: string;
    text: string;
    border: string;
    dot: string;
}
