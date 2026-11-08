
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
import rehypeShiki from '@shikijs/rehype'
import { createHighlighter } from 'shiki';
import { iconToDataURI } from './icons';




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
                const icon_image = iconToDataURI(value)
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


export const remarkCodeblock: unified.Plugin<void[], mdast.Root> = () => {
    return (tree, file) => {
        visit(tree, "code", (node) => {
            console.log(node.lang, node.meta)
            node.meta
            node.data = {
                hProperties: {
                    "data-lang": node.lang
                }
            }
        })
    }
}




export async function render_md(content: string) {
    const processor = unified.unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml', 'toml'])
        .use(remarkExtractFrontmatter)
        .use(remarkCodeblock)
        .use(remarkDirective)
        .use(remarkIconDirective)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeShiki, {
            // or `theme` for a single theme
            theme: 'github-dark'
        })
        .use(rehypeStringify, { allowDangerousHtml: true })
    return await processor.process(content);
}
