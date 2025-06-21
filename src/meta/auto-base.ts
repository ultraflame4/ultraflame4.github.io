/**
 *  Plugins to automatically prefix urls in .astro files with the url.
 *  This is needed because the astro devs decided for whatever god-forsaken reason it should not be automatically done
 *  and you should hardcode the base url.
 * 
 *  Note that this does not work for CSS styles
 */

import type { AstroIntegration } from "astro";
import type { PluginOption } from "vite"

/**
 * Vite plugin to rewrite urls in astro files
 * @param base 
 * @returns 
 */
export function rewriteAstroUrls(base: string): PluginOption {
    return {
        name: 'astro-auto-base-rewrite',
        enforce: "pre",
        transform(code, id) {
            // Skip if base is root
            if (base === '/') return null;


            // Only process Astro files 
            if (id.endsWith('.astro')) {
                let rewritten = code as string;

                // Rewrite URLs that start with / but don't already include base
                console.log("::::", id)
                const urlPattern = /(href|src|action|url)=['"]\/(?!\/|https?:|mailto:|tel:)/gi;
                rewritten = rewritten.replace(urlPattern, (match, attr) => {
                    let url = `${attr}="${base}${match.slice(attr.length + 2)}`;
                    console.log("- Rewriting", match, "to", url)
                    return url;
                });

                return rewritten !== code ? rewritten : null;
            }

            return null
        },

    }
}

/**
 * Astro integration that auto prefixes urls in the html with
 * @returns 
 */
export function prefixWithBaseUrl(): AstroIntegration {
    return {
        name: 'auto-base-urls',
        hooks: {
            'astro:config:setup': ({ config, updateConfig }) => {
                // Store the base URL for later use
                const base = config.base || '/';

                updateConfig({
                    vite: {
                        plugins: [
                            rewriteAstroUrls(base)
                        ]
                    }
                });
            },
        }
    };
}
