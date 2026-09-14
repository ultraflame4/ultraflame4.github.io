import { render_md } from "$lib"
import { readContent } from "$lib/data"
import type { PageLoad } from "./$types"
const about_content = readContent("about")

export const load: PageLoad = async (e) => {
    const parent = await e.parent()
    const _data = Object.entries(about_content).map(([k, v]) => {
        return [k, render_md(v)]
    })

    return {
        ...parent,
        about_story: _data
    }
}
