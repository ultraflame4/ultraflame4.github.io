import {allProjects, featuredProjects, type proj_entry} from "@/assets/projects";
import {ref} from "vue";
import type {GetDatabaseResponse, PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

const apiServerDomain = import.meta.env.DEV ? (import.meta.env.LOCAL_API_SERVER ?? "http://localhost:3000") : (import.meta.env.PRODUCTION_API_SERVER ?? "https://ultraflame4-github-io-backendapi.vercel.app")
console.log("Using api server at:", apiServerDomain)

export const AllProjects = ref<proj_entry[]>(allProjects)
export const FeaturedProjects = ref<proj_entry[]>(featuredProjects)


interface ProjectsApiJson{
    time_ms: string,
    schema: GetDatabaseResponse,
    items: Array<{
        cover:string,
        properties: PageObjectResponse["properties"],
        content_md: string
    }>

}

export async function LoadAllProjects(): Promise<void> {
    const url_path = new URL("/api/projects",apiServerDomain).toString()
    console.log("Requesting projects at path",url_path)

    let res = await fetch(url_path)
    let json = await res.json()
    console.log(json)

    AllProjects.value = allProjects
    FeaturedProjects.value = featuredProjects
}