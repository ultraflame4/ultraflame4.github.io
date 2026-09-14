import { render_md } from "$lib";
import { readContent } from "$lib/data";
import { readProjectsData } from "$lib/projects_data";
import type { PageLoad } from "./$types";
const about_content = readContent("about");
const projects_content = readContent("projects");

export const load: PageLoad = async (e) => {
    const parent = await e.parent();
    const about_story = Object.entries(about_content).map(([k, v]) => {
        return [k, render_md(v).value] as [string, string];
    });

    const recent_works = readProjectsData(6);

    return {
        ...parent,
        about_story,
        recent_works,
    };
};
