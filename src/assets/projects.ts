import proj_entry = oldFormat.proj_entry;

namespace oldFormat{
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

export interface FrontmatterProjectDataSchema{
    title: string,
    body?: string,
    banner?:string
    featured?: boolean,
    source?: string | { sourceLabel:string, url: string },
    links?: proj_entry_link,
    skills?: string[],
}

export interface NormalisedProjectData{

}


export type proj_entry_link = oldFormat.proj_entry_link;

import * as _allProjects from "./projects.json"
import fm from "front-matter"


export const allProjects: proj_entry[] = <proj_entry[]>_allProjects.items


function importProjectsFromDataDir(){
    const data_projects_import= import.meta.glob('/data/projects/*' , {eager: true, as: "raw"})
    const project_data_filepaths = Object.keys(data_projects_import)
    console.log("Found project data files: ", project_data_filepaths)

    const parsedContent : object[] = []
    for (let f of project_data_filepaths) {
        parsedContent.push(fm(data_projects_import[f]))
    }
    console.log(parsedContent)
}

importProjectsFromDataDir()

