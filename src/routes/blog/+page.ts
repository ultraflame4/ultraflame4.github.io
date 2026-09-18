import type { PageLoad } from "./$types";



export const load: PageLoad = async (event) => {
    const parent = await event.parent()

    const queryPostId = event.url.searchParams.get("post")
    return {
        ...parent,
        queryPostId
    }
};