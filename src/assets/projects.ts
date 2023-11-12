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

import * as _allProjects from "./projects.json"

export const allProjects: proj_entry[] = <proj_entry[]>_allProjects.items