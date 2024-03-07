import fm from "front-matter"
import * as _allProjects from "./projects.json"
import {normalise_FrontmatterProjectData, normalise_oldFormat} from "@/assets/projects_utils";

export namespace oldFormat {
    export interface proj_entry_link {
        name: string,
        url?: string,
        /** icons from https://icones.js.org/collection/all?s=code */
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

/**
 * @TJS-format uri
 */
export type URIStringType = string

export interface SourceObj {
    label: string,
    url: URIStringType
}

/**
 * @maxItems 1
 */
export interface LinkObject {
    [name: string]: URIStringType
}

export interface FrontmatterProjectDataSchema {
    /**
     * The title of the project
     */
    title: URIStringType,
    /**
     * Relevant cover image of the project
     */
    image?: URIStringType,
    /**
     * Relevant cover image of the project
     */
    video?: URIStringType,
    /**
     * Relevant cover image of the project
     */
    source?: URIStringType | SourceObj,
    /**
     * Relevant project links
     * @items {
     *     "anyOf": [
     *          {
     *              "$ref": "#/definitions/LinkObject"
     *          },
     *          {
     *              "format": "tag",
     *              "type": "string"
     *          }
     *     ]
     * }
     */
    links?: Array<URIStringType | LinkObject>,
    /**
     * Relevant skills used in the project
     * @items.format tag
     */
    skills?: string[],
    /**
     * Start date of the project.
     * @TJS-format date
     */
    start?: string,
    /**
     * Start date of the project.
     * @TJS-format date
     */
    end?: string,
    /**
     * Suggests the index / order of the project. May be superseded by other parameters
     * @TJS-format date
     */
    index_hint?: number

    /**
     * The current project status
     * @TJS-default in dev
     */
    status?: "completed" | "in dev" | "inactive"

    /**
     * Project flags
     * @items {
     *     "format": "tag",
     *     "enum" : [
     *         "featured"
     *     ]
     * }
     */
    flags?: Array<"featured">
}

export interface NormalisedProjectData {
    title: string,
    body: string,
    media: {
        url: string,
        type: "img" | "video"
    }[],
    featured: boolean,
    status: "completed" | "in dev" | "inactive"
    links: proj_entry_link[],
    source?: { label: string, url: string },
    skills?: string[],
    start_date?: Date
    end_date?: Date

}


export const allProjects: NormalisedProjectData[] = []

function importProjectsFromJson() {
    console.log("Importing project json data");

    (_allProjects.items as oldFormat.proj_entry[]).forEach(x => {
        allProjects.push(normalise_oldFormat(x))
    })
}

function importProjectsFromDataDir() {
    const data_projects_import = import.meta.glob('/data/projects/*', {eager: true, as: "raw"})
    const project_data_filepaths = Object.keys(data_projects_import);
    console.log("Importing project frontmatter files");
    console.log("Found project data files: ", project_data_filepaths)

    const frontmatter = project_data_filepaths.map(x => fm<FrontmatterProjectDataSchema>(data_projects_import[x]))
    // console.log(frontmatter)
    frontmatter.sort((a, b) => {
        const aHint = a.attributes.index_hint ?? -1;
        const bHint = b.attributes.index_hint ?? -1;
        return aHint > bHint ? 1 : -1
    })
    frontmatter.forEach(x => {
        allProjects.push(normalise_FrontmatterProjectData(x.attributes, x.body.replace("\r", "")))
    })
}

importProjectsFromJson()
importProjectsFromDataDir()

console.log("Loaded projects: ", allProjects)