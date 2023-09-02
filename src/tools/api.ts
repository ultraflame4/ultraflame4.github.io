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
        title: string
        cover:string,
        properties: PageObjectResponse["properties"],
        content_md: string
    }>

}

export async function LoadAllProjects(): Promise<void> {
    const url_path = new URL("/api/projects",apiServerDomain).toString()
    console.log("Requesting projects at path",url_path)

    let res = await fetch(url_path)
    let json: ProjectsApiJson = await res.json()
    console.log(json)
    AllProjects.value = json.items.map(item=>{
        let title_property = item.properties["Name"]
        const title = title_property.type == "title" ? title_property.title.join(" ") : "UnNamed - Could not get title"
        let tags_property = item.properties["Tags"]
        const tags = tags_property.type == "multi_select" ? tags_property.multi_select.map(x=>x.name) : ["untagged"]

        return {
            title,
            bannerSrc: item.cover,
            desc: item.content_md,
            skillsUsed: tags
        };
    })


    FeaturedProjects.value = featuredProjects
}