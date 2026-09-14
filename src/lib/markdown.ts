
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
                node.children = [
                    {
                        type: 'html',
                        value: `<span class="icon remark-icon-directive"><image src="https://api.iconify.design/${value}.svg"></span>`
                    },
                ]
            }
        })
    }
}


export function render_md(content: string) {
    const processor = unified.unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml', 'toml'])
    // .use(() => )
        .use(remarkDirective)
        .use(remarkIconDirective)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
    return processor.processSync(content);
}
