export interface proj_entry {
    featured?: boolean,
    source?: string, // most commonly the github repo
    sourceLabel?: string, // defaults to github
    links?: {
        name: string,
        url?: string,
        /* icons from https://icones.js.org/collection/all?s=code */
        icon?: string,

        fillColor?: string,
        filledTextColor?: string,

        filled?: boolean

    }[]
    title: string,
    desc?: string,
    skillsUsed: string[],
    bannerSrc?: string
    /*Uses video tag instead of img tag*/
    bannerImgIsVideo?: boolean
}

import * as _allProjects from "./projects.json"
export const allProjects:proj_entry[] = _allProjects.items