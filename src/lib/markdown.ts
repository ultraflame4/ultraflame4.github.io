
import { visit } from 'unist-util-visit';
import * as unified from 'unified';
import type * as mdast from 'mdast';
// Needed for typesscript support
import type * as _ from 'remark-directive'
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import { matter } from 'vfile-matter';


import { getIconUrl } from './icons';

import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { bundledLanguages, bundledLanguagesBase, createHighlighter, type BundledLanguage, type Highlighter } from 'shiki/bundle/full';




export const remarkIconDirective: unified.Plugin<any, mdast.Root> = () => {
    return (tree) => {
        visit(tree, (node) => {
            if (
                node.type === 'textDirective' &&
                node.name === 'icon'
            ) {
                // const icon_name = node.children[0].data
                const get_text = (a?: mdast.PhrasingContent) => {
                    if (a === undefined) return ''
                    if (a.type === "text") return a.value
                    if (a.type === "textDirective") return ":" + a.name
                }
                const value = node.children.map(get_text).reduce((a, b) => (a ?? '') + (b ?? ''), '')
                if (!value && value !== "false") return
                const icon_image = getIconUrl(value)
                node.children = [
                    {
                        type: 'html',
                        value: `<span class="icon remark-icon-directive"><image src="${icon_image}"></span>`
                    },
                ]
            }
        })
    }
}


export const remarkExtractFrontmatter: unified.Plugin<void[], mdast.Root> = () => {
    return (_tree, file) => {
        matter(file, { strip: true })
    }
}


let highlighter = null as null | Highlighter

async function loadHighlighterLang(lang: string) {
    if (!highlighter)
        return
    if (!highlighter?.getLoadedLanguages().includes(lang)) {
        return
    }
    if (!Object.keys(bundledLanguages).includes(lang)) {
        return
    }
    let blang = lang as BundledLanguage
    await highlighter?.loadLanguage(blang)
}

export const remarkCodeblock: unified.Plugin<void[], mdast.Root> = () => {
    return (tree, file) => {
        visit(tree, "code", (node) => {
            if (node.lang == null) return

            loadHighlighterLang(node.lang)

            node.data = {
                hProperties: {
                    "data-lang": node.lang
                }
            }
        })
    }
}



export async function render_md(content: string) {

    if (highlighter == null) {
        highlighter = await createHighlighter({
            themes: ["github-dark"],
            langs: [],
            engine: createOnigurumaEngine(() => import('shiki/wasm'))
        })
    }

    const processor = unified.unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml', 'toml'])
        .use(remarkExtractFrontmatter)
        .use(remarkCodeblock)
        .use(remarkDirective)
        .use(remarkIconDirective)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeShikiFromHighlighter, highlighter, {
            theme: "github-dark"
        })
        .use(rehypeStringify, { allowDangerousHtml: true })
    return await processor.process(content);
}
