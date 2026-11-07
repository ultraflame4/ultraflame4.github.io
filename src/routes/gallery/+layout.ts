import type { LayoutLoad } from "./$types";
export const load: LayoutLoad = async (e) => {
    const parent = await e.parent();
    return {
        project_id: e.params.project_id,
        ...parent,
    }
}