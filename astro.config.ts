// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import remarkDirective from 'remark-directive';
import { remarkIconDirective } from './src/meta/remark-plugins';
import { prefixWithBaseUrl } from './src/meta/auto-base';
import { version } from "./package.json"
import * as childProcess from "child_process";

let commitHash = ""
try {
    commitHash = childProcess
        .execSync('git rev-parse --short HEAD')
        .toString()
        .replaceAll('\n', '');
    console.log("App at commit hash:", commitHash)
}
catch (e) {
    console.warn("Failed to fetch commit hash! Are we in a non-git environment?")
}


// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        define: {
            'import.meta.env.__APP_VERSION__': JSON.stringify(version),
            'import.meta.env.__COMMIT_HASH__': JSON.stringify(commitHash),
        }
    },
    markdown: {
        remarkPlugins: [
            remarkDirective,
            remarkIconDirective
        ]
    },
    site: "https://ultraflame4.github.io",
    base: '/v7',
    integrations: [prefixWithBaseUrl(), vue()]
});