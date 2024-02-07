import fm from "front-matter"
import * as _allProjects from "./projects.json"
import {normalise_FrontmatterProjectData, normalise_oldFormat} from "@/assets/projects_utils";

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
    source?: string | { label:string, url: string },
    links?: Array<string | { [name: string] : string }>,
    skills?: string[],
    start?: string,
    end?: string,
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
    links: proj_entry_link[],
    source?: { label:string, url: string },
    skills?: string[],
    start_date?: string
    end_date?: string
}


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
        allProjects.push(normalise_FrontmatterProjectData(x.attributes,x.body.replace("\r","")))
    })
}
importProjectsFromJson()
importProjectsFromDataDir()

console.log(allProjects)