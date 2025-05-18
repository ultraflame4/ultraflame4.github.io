// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
// import tailwindcss from '@tailwindcss/postcss';

import vue from '@astrojs/vue';


// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {

    },
    integrations: [vue()]
});