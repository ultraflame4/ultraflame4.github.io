import { render_md } from "$lib";
import { readContent } from "$lib/data";
import { readProjectsData } from "$lib/projects_data";
import type { PageLoad } from "./$types";
const about_content = readContent("about");
const projects_content = readContent("projects");

export const load: PageLoad = async (e) => {
    const parent = await e.parent();
    const promises = Object.entries(about_content).map(async ([k, v]) => {
        return [k, (await render_md(v)).value] as [string, string];
    })
    const about_story = await Promise.all(promises)
    const recent_works = readProjectsData(6);

    return {
        ...parent,
        about_story,
        recent_works,
    };
};
