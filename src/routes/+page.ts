import { render_md } from "$lib"
import type { PageLoad } from "./$types"
const about_story = import.meta.glob('../../data/about/*.md', { eager: true, query: "raw" })

export const load: PageLoad = async (e) => {
    const parent = await e.parent()

    return {
        ...parent,
        about_story: Object.entries(about_story).map(([k, v]) => {
            const i = k.lastIndexOf('/')
            return [k.slice(i + 1), render_md((v as any).default)] as [string, any]
        })
    }
}