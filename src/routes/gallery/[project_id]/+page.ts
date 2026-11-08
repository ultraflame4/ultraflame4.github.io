import { render_md } from "$lib";
import { readContent } from "$lib/data";
import { projectsContent, readProject } from "$lib/projects_data";
import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = async (e) => {
    const parent = await e.parent();

    const project = await readProject(e.params.project_id);
    return {
        ...parent,
        project,
    };
};


export const entries: EntryGenerator = () => {
    return Object.keys(projectsContent).map(x => ({
        project_id: x
    }));
};