// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import wikiLinkPlugin from 'remark-wiki-link'; 
import mermaid from 'astro-mermaid';

export default defineConfig({
    markdown: {
        remarkPlugins: [
            [ wikiLinkPlugin, { 
                // This tells the plugin where to look for files so it can resolve the links
                // It maps the [[slug]] to /slug
                hrefTemplate: (permalink) => `/${permalink}`
            }]
        ],
    },
    integrations: [
        starlight({
            customCss: ['./src/styles/custom.css'],
            title: 'PandeAkshat - Wiki',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/pandeakshat' }],
            sidebar: [
                {
                    label: 'WIKI | HOME', // The Homepage
                    link: '/',
                },
                {
                    label: 'Projects', // Active Missions
                    items: [
                        { label: 'Structure', link: '/projects/project-structure' },
                        { label: 'Customer Intelligence', link: '/projects/customer-intelligence' }
                    ]
                },
                {
                    label: 'Learnings', // "The Output"
                    items: [
                        { label: 'Python', link: '/learnings/python' },
                        { label: 'SQL', link: '/learnings/sql' },
                        { label: 'Data Analysis', link: '/learnings/data-analysis' },
                        { label: 'Excel', link: '/learnings/excel' }
                    ]
                },
                                {
                    label: 'CheatSheet', // "The Output"
                    items: [
                        { label: 'Python', link: '/cheatbook/python' },
                        { label: 'SQL', link: '/cheatbook/sql' }
                    ]
                },
                {
                    label: 'INTEL', // "The Input"
                    items: [
                        { label: 'Intel Item 1', link: '/intel/item-1' },
                        { label: 'Intel Item 2', link: '/intel/item-2' }
                    ]
                },
                ],
        }), 
        react(),
        mermaid({
        theme: 'forest',
        autoTheme: true
        })
    ],
});