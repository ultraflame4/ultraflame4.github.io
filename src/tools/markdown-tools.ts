import {Marked} from "marked";

export const mdRenderer = new Marked({
gfm: true
})


export const link_expression = /\[(.*)\]\(([^#].*\..*)\)/g

export function extractLinksFromMd(markdown: string) {
    let matches = [...markdown.matchAll(link_expression)]
    return matches.map(([_, name, url]) => ({name, url}))
}

