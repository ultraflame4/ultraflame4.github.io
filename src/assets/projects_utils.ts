import type {FrontmatterProjectDataSchema, NormalisedProjectData, oldFormat} from "@/assets/projects";
import {identifyLinkName} from "@/tools/url-utils";
import { toB62 } from "@/utils";
import hash from 'hash-it';
import path from "path";

export function normalise_oldFormat(data: oldFormat.proj_entry, index: number): NormalisedProjectData {
    let obj: NormalisedProjectData = {
        anchor_id: `oldformat-project-${index}`,
        links: data.links ?? [],
        body: data.desc?.replace("\n", "\n\n") ?? "",
        media: [],
        title: data.title,
        featured: !!data.featured,
        status: "in dev"
    }
    if (data.bannerSrc) {
        obj.media.push({
            url: data.bannerSrc,
            type: data.bannerImgIsVideo ? "video" : "img"
        })
    }
    if (data.source) {
        obj.source = {
            label: data.sourceLabel ?? "Source",
            url: data.source
        }
    }
    obj.skills = data.skillsUsed
    return obj
}

export function normalise_FrontmatterProjectData(data: FrontmatterProjectDataSchema, body: string, filepath:string): NormalisedProjectData {
    let obj: NormalisedProjectData = {
        anchor_id: path.basename(filepath).split(".")[0],
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