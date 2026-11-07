import { render_md } from "$lib";
import { readContent } from "$lib/data";
import { readProject, readProjectsData } from "$lib/projects_data";
import type { PageLoad } from "./$types";


export const load: PageLoad = async (e) => {
    const parent = await e.parent();

    const project = await readProject(e.params.project_id);
    return {
        ...parent,
        project,
    };
};
