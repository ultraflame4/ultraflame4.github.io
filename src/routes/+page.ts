import { render_md } from "$lib"
import { readContent } from "$lib/data"
import type { PageLoad } from "./$types"
const about_content = readContent("about")
const projects_content = readContent("projects")

export const load: PageLoad = async (e) => {
    const parent = await e.parent()
    const about_story = Object.entries(about_content).map(([k, v]) => {
        return [k, render_md(v)]
    })

    const recent_works = Object.entries(projects_content).map(([k, v]) => {
        return [k, render_md(v)]
    })


    return {
        ...parent,
        about_story,
        recent_works
    }
}
