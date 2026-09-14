import { readContent } from "./data";
import { render_md } from "./markdown";

export function getDomainName(url: string | undefined) {
    if (!url) return undefined
    try {
        // console.log(new URL(url),'fff')
        return new URL(url).host;
    } catch (e) {
        return new URL("https://" + url).host;
    }
}

export function isChildDomain(child_domain: string | undefined, parent_domain: string) {
    return child_domain?.endsWith(parent_domain)
}

export function isItchio(url: string | undefined): boolean {
    return !!isChildDomain(getDomainName(url), "itch.io")
}

export function isGithub(url: string | undefined): boolean {
    return !!isChildDomain(getDomainName(url), "github.com")
}

export function identifyLinkName(url: string): string {
    if (isItchio(url)) return "itch.io";
    if (isGithub(url)) return "github";
    return getDomainName(url) ?? ""
}

export function isGithubRelease(url: string | undefined): boolean {
    return !!url?.match(/https:\/\/github\.com\/.*\/releases($|\/.*)/g)
}

/**
 * @TJS-format uri
 */
export type URIStringType = string;

export interface SourceObj {
    label: string;
    url: URIStringType;
}

/**
 * @maxItems 1
 */
export interface LinkObject {
    [name: string]: URIStringType;
}


export interface FrontmatterProjectDataSchema {
    /**
     * The title of the project
     */
    title: URIStringType;
    /**
     * Relevant cover image of the project
     */
    image?: URIStringType;
    /**
     * Relevant cover image of the project
     */
    video?: URIStringType;
    /**
     * Relevant cover image of the project
     */
    source?: URIStringType | SourceObj;
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
    links?: Array<URIStringType | LinkObject>;
    /**
     * Relevant skills used in the project
     * @items.format tag
     */
    skills?: string[];
    /**
     * Start date of the project.
     * @TJS-format date
     */
    start?: string;
    /**
     * Start date of the project.
     * @TJS-format date
     */
    end?: string;
    /**
     * Suggests the index / order of the project. May be superseded by other parameters
     * @TJS-format date
     */
    index_hint?: number;

    /**
     * The current project status
     * @TJS-default in dev
     */
    status?: "completed" | "in dev" | "inactive";

    /**
     * Project flags
     * @items {
     *     "format": "tag",
     *     "enum" : [
     *         "featured"
     *     ]
     * }
     */
    flags?: Array<"featured">;
}

export interface proj_entry_link {
    name: string;
    url?: string;
    /** icons from https://icones.js.org/collection/all?s=code */
    icon?: string;

    fillColor?: string;
    filledTextColor?: string;

    filled?: boolean;
}


export type NormalisedProjectMetaMedia = {
    url: string;
    type: "img" | "video";
}

export interface NormalisedProjectMeta {
    // anchor_id: string;
    title: string;
    media: NormalisedProjectMetaMedia[];
    featured: boolean;
    status: "completed" | "in dev" | "inactive";
    links: proj_entry_link[];
    source?: { label: string; url: string };
    skills?: string[];
    start_date?: Date;
    end_date?: Date;
}


export function normaliseProjectData(data: FrontmatterProjectDataSchema): NormalisedProjectMeta {
    let meta: NormalisedProjectMeta = {
        links: [],
        media: [],
        status: data.status ?? "in dev",
        title: data.title,
        featured: !!data.flags?.includes("featured")
    }
    if (data.video) meta.media.push({url: data.video, type: "video"})
    if (data.image) meta.media.push({url: data.image, type: "img"})
    if (data.source) {
        if (typeof data.source == "string") {
            meta.source = {
                label: "github",
                url: data.source
            }
        } else if (data.source.url && data.source.label) {
            meta.source = {
                label: data.source.label,
                url: data.source.url
            }
        }
    }
    if (data.links) {
        meta.links = []
        data.links.forEach((x) => {
            if (typeof x == "string") {
                meta.links?.push({
                    name: identifyLinkName(x),
                    url: x
                })
                return;
            }
            Object.entries(x).map(([name, url]) => {
                meta.links?.push({
                    name,
                    url
                })
            })

        })
    }

    if (data.skills) {
        meta.skills = data.skills;
    }
    if (data.start) meta.start_date = new Date(data.start)
    if (data.end) meta.end_date = new Date(data.end)
    return meta
}

/**
 * Read the projects (frontmatter) in the data/projects folder.
 *
 * @param limit Limit the number of results. //TODO sort by date
 * @returns
 */
export function readProjectsData(limit?: number) {
    const projects_content = readContent("projects")

    return Object.entries(projects_content).slice(0, limit).map(([k, v]) => {
        const rendered = render_md(v)
        const meta = normaliseProjectData(rendered.data.matter as any)
        return [k, rendered.value, meta] as [string,string, NormalisedProjectMeta]
    })
}
