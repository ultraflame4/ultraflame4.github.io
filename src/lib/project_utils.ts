import { identifyLinkName } from "./tools/url-utils";

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


export interface NormalisedProjectData {
    // anchor_id: string;
    title: string;
    body: string;
    media: {
        url: string;
        type: "img" | "video";
    }[];
    featured: boolean;
    status: "completed" | "in dev" | "inactive";
    links: proj_entry_link[];
    source?: { label: string; url: string };
    skills?: string[];
    start_date?: Date;
    end_date?: Date;
}


export function normalise_FrontmatterProjectData(data: FrontmatterProjectDataSchema, body: string, filepath?:string): NormalisedProjectData {
    let obj: NormalisedProjectData = {
        // anchor_id: path.basename(filepath).split(".")[0],
        links: [],
        body: body,
        media: [],
        status: data.status ?? "in dev",
        title: data.title,
        featured: !!data.flags?.includes("featured")
    }
    if (data.video) obj.media.push({url: data.video, type: "video"})
    if (data.image) obj.media.push({url: data.image, type: "img"})
    if (data.source) {
        if (typeof data.source == "string") {
            obj.source = {
                label: "github",
                url: data.source
            }
        } else if (data.source.url && data.source.label) {
            obj.source = {
                label: data.source.label,
                url: data.source.url
            }
        }
    }
    if (data.links) {
        obj.links = []
        data.links.forEach((x) => {
            if (typeof x == "string") {
                obj.links?.push({
                    name: identifyLinkName(x),
                    url: x
                })
                return;
            }
            Object.entries(x).map(([name, url]) => {
                obj.links?.push({
                    name,
                    url
                })
            })

        })
    }

    if (data.skills) {
        obj.skills = data.skills;
    }
    if (data.start) obj.start_date = new Date(data.start)
    if (data.end) obj.end_date = new Date(data.end)
    return obj
}