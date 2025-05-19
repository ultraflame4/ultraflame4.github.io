
import { visit } from 'unist-util-visit';
import type * as unified from 'unified';
import type * as mdast from 'mdast';


export const remarkIconDirective: unified.Plugin<any, mdast.Root> = () => {
    console.log("TEST")
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
