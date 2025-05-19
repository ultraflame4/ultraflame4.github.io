// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';
import remarkDirective from 'remark-directive';
import { remarkIconDirective } from '@/meta/remark-plugins';





// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        remarkPlugins: [
            remarkDirective,
            remarkIconDirective
        ]
    },
    integrations: [vue()]
});