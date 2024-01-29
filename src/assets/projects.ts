import {identifyLinkName} from "@/tools/url-utils";

export namespace oldFormat{
    export interface proj_entry_link {
        name: string,
        url?: string,
        /* icons from https://icones.js.org/collection/all?s=code */
        icon?: string,

        fillColor?: string,
        filledTextColor?: string,

        filled?: boolean
    }

    export interface proj_entry {
        featured?: boolean,
        source?: string, // most commonly the github repo
        sourceLabel?: string, // defaults to github
        links?: proj_entry_link[]
        title: string,
        desc?: string,
        skillsUsed: string[],
        bannerSrc?: string
        /*Uses video tag instead of img tag*/
        bannerImgIsVideo?: boolean
    }
}
export type proj_entry_link = oldFormat.proj_entry_link;
export interface FrontmatterProjectDataSchema{
    title: string,
    image?:string,
    video?:string,
    featured?: boolean,
    source?: string | { label:string, url: string },
    links?: Array<string | { [name: string] : string }>,
    skills?: string[],
    flags: Array<"featured" >
}

export interface NormalisedProjectData{
    title: string,
    body: string,
    media: {
        url: string,
        type: "img" | "video"
    }[],
    featured: boolean,
    source?: { label:string, url: string },
    links: proj_entry_link[],
    skills?: string[],
}

import fm from "front-matter"


export function normalise_oldFormat(data: oldFormat.proj_entry): NormalisedProjectData{
    let obj: NormalisedProjectData = {links: data.links??[], body: data.desc??"", media: [] , title: data.title, featured: !!data.featured}
    if (data.bannerSrc){
        obj.media.push({
            url: data.bannerSrc,
            type: data.bannerImgIsVideo?"video": "img"
        })
    }
    if (data.source){
        obj.source = {
            label: data.sourceLabel ?? "Source",
            url : data.source
        }
    }
    obj.skills = data.skillsUsed
    return obj
}

export function normalise_FrontmatterProjectData(data: FrontmatterProjectDataSchema, body: string): NormalisedProjectData{
    let obj: NormalisedProjectData = {links: [], body: body, media: [] , title: data.title, featured: !!data.featured}
    if (data.video) obj.media.push({url:data.video,type:"video"})
    if (data.image) obj.media.push({url:data.image,type:"img"})
    obj.featured = !!data.featured
    if (data.source){
        if (typeof data.source == "string"){
            obj.source = {
                label: "github",
                url: data.source
            }
        }
        else if (data.source.url && data.source.label){
            obj.source = {
                label:  data.source.label,
                url: data.source.url
            }
        }
    }
    if (data.links)
    {
        obj.links = []
        data.links.forEach((x) => {
            if (typeof x == "string"){
                obj.links?.push({
                    name: identifyLinkName(x),
                    url: x
                })
                return;
            }
            Object.entries(x).map(([name,url])=>{
                obj.links?.push({
                    name,
                    url
                })
            })

        })
    }

    if (data.skills){
        obj.skills = data.skills;
    }
    return obj
}






import * as _allProjects from "./projects.json"
export const allProjects: NormalisedProjectData[] = []
function importProjectsFromJson(){
    console.log("Converting project json data");
    (_allProjects.items as oldFormat.proj_entry[]).forEach(x=>{
        allProjects.push(normalise_oldFormat(x))
    })
}
function importProjectsFromDataDir(){
    const data_projects_import= import.meta.glob('/data/projects/*' , {eager: true, as: "raw"})
    const project_data_filepaths = Object.keys(data_projects_import)
    console.log("Found project data files: ", project_data_filepaths)

    const frontmatter = project_data_filepaths.map(x=>fm<FrontmatterProjectDataSchema>(data_projects_import[x]))
    console.log(frontmatter)
    frontmatter.forEach(x=>{
        allProjects.push(normalise_FrontmatterProjectData(x.attributes,x.body))
    })
}
importProjectsFromJson()
importProjectsFromDataDir()

console.log(allProjects)