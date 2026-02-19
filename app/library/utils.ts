import { Status, Category, StatusColors } from './types';

export const getStatusColor = (status: Status | string): StatusColors => {
    switch (status) {
        case 'stable':
            return { 
                bg: 'rgba(16, 185, 129, 0.1)', 
                text: '#10b981', 
                border: 'rgba(16, 185, 129, 0.2)', 
                dot: 'bg-green-500' 
            };
        case 'beta':
            return { 
                bg: 'rgba(245, 158, 11, 0.1)', 
                text: '#f59e0b', 
                border: 'rgba(245, 158, 11, 0.2)', 
                dot: 'bg-amber-500' 
            };
        case 'deprecated':
            return { 
                bg: 'rgba(239, 68, 68, 0.1)', 
                text: '#ef4444', 
                border: 'rgba(239, 68, 68, 0.2)', 
                dot: 'bg-red-500' 
            };
        default:
            return { 
                bg: 'rgba(16, 185, 129, 0.1)', 
                text: '#10b981', 
                border: 'rgba(16, 185, 129, 0.2)', 
                dot: 'bg-green-500' 
            };
    }
};

export const getCategoryProgressColor = (category: Category | string): string => {
    switch (category) {
        case 'Programming Language':
            return '#3b82f6';
        case 'Framework':
            return '#f59e0b';
        case 'Database':
            return '#8b5cf6';
        case 'Mobile':
            return '#ec4899';
        case 'Security':
            return '#ef4444';
        case 'DevOps':
            return '#06b6d4';
        default:
            return '#6366f1';
    }
};

export const getCategoryIcon = (categoryName: string): string => {
    switch (categoryName) {
        case 'All Modules':
            return 'apps';
        case 'Backend':
            return 'storage';
        case 'Frontend':
            return 'web';
        case 'Database':
            return 'database';
        case 'DevOps':
            return 'settings';
        case 'Mobile':
            return 'smartphone';
        case 'Security':
            return 'security';
        default:
            return 'folder';
    }
};

export const getMenuIcon = (item: string): string => {
    switch (item) {
        case 'Library':
            return 'collections_bookmark';
        case 'About':
            return 'info';
        case 'Changelog':
            return 'history';
        case 'Contact':
            return 'mail';
        default:
            return 'circle';
    }
};
