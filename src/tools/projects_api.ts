import {allProjects, featuredProjects, type proj_entry} from "@/assets/projects";
import {ref} from "vue";
import type {GetDatabaseResponse, PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";
import type {MdStringObject} from "notion-to-md/build/types";
import {extractLinksFromMd} from "@/tools/markdown-tools";

const apiServerDomain = import.meta.env.DEV ? (import.meta.env.LOCAL_API_SERVER ?? "http://localhost:3000") : (import.meta.env.PRODUCTION_API_SERVER ?? "https://ultraflame4-github-io-backendapi.vercel.app")
console.log("Using api server at:", apiServerDomain)

export const AllProjects = ref<proj_entry[]>([])
export const FeaturedProjects = ref<proj_entry[]>(featuredProjects)


interface ProjectsApiJson{
    time_ms: string,
    schema: GetDatabaseResponse,
    items: Array<{
        title: string
        cover:string,
        properties: PageObjectResponse["properties"],
        content_md: MdStringObject
    }>

}
export const ProjectDataStatus = {
    loading: ref(false),
    isfallback: false
}
async function _LoadAllProjects(): Promise<void> {
    ProjectDataStatus.loading.value=true
    const url_path = new URL("/api/projects",apiServerDomain).toString()
    console.log("Requesting projects at path",url_path)

    let res = await fetch(url_path)
    let json: ProjectsApiJson = await res.json()
    console.log(json)
    AllProjects.value = json.items.map(item=>{
        let title_property = item.properties["Name"]
        const title = title_property.type == "title" ? title_property.title.map(x=>x.plain_text).join(" ") : "UnNamed - Could not get title"
        let tags_property = item.properties["Tags"]
        const tags = tags_property.type == "multi_select" ? tags_property.multi_select.map(x=>x.name) : ["untagged"]
        let source_property = item.properties["Source"]
        const source = source_property.type == "url" ? source_property.url : null
        let featured_property = item.properties["Featured"]
        const featured = featured_property.type == "checkbox" ? featured_property.checkbox : false

        const content =  Object.values(item.content_md).join("\n")


        return {
            title,
            source:source??undefined,
            bannerSrc: item.cover,
            desc:content,
            skillsUsed: tags,
            featured,
            links: extractLinksFromMd(content).map(x=>({
                name: x.name,
                url: x.url
            }))
        };
    })


    FeaturedProjects.value = featuredProjects
}

export async function LoadAllProjects() {
    try{
        await _LoadAllProjects()
    }
    catch (e) {
        console.error(e)
        console.warn("UNABLE TO LOAD PROJECTS. USING FALLBACK!")
        ProjectDataStatus.isfallback=true
        AllProjects.value = allProjects
    }
    ProjectDataStatus.loading.value=false
}