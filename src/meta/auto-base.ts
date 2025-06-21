/**
 *  Plugins to automatically prefix urls in .astro files with the url.
 *  This is needed because the astro devs decided for whatever god-forsaken reason it should not be automatically done
 *  and you should hardcode the base url.
 */


/**
 * Vite plugin to rewrite urls in astro files
 * @param base 
 * @returns 
 */
export function rewriteAstroUrls(base: string) {
    return {
        name: 'astro-auto-base-rewrite',
        transform(code, id) {
            // Skip if base is root
            if (base === '/') return null;

            // Only process Astro files and HTML
            if (!id.endsWith('.astro') && !id.endsWith('.html')) {
                return null;
            }
            console.log(id)

            // Rewrite URLs that start with / but don't already include base
            const urlPattern = /(href|src|action|url)=['"]\/(?!\/|https?:|mailto:|tel:)/gi;
            const rewritten = code.replace(urlPattern, (match, attr) => {
                let url = `${attr}="${base}${match.slice(attr.length + 2)}`;
                console.log("- Rewriting", match, "to", url)
                return url;
            });

            return rewritten !== code ? rewritten : null;
        }
    }
}

/**
 * Astro integration that auto prefixes urls in the html with
 * @returns 
 */
export function prefixWithBaseUrl() {
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
            }
        }
    };
}
