import { render_md } from "$lib";
import { readContent } from "$lib/data";
import { readProjectsData } from "$lib/projects_data";
import type { PageLoad } from "./$types";

const projects_content = readContent("projects");

export const load: PageLoad = async (e) => {
    const parent = await e.parent();


    const projects = await readProjectsData();

    return {
        ...parent,
        projects,
    };
};
