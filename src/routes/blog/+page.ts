import type { PageLoad } from "./$types";



export const load: PageLoad = async (event) => {
    const parent = await event.parent()


    return parent
};