import type {FrontmatterProjectDataSchema, NormalisedProjectData, oldFormat} from "@/assets/projects";
import {identifyLinkName} from "@/tools/url-utils";

export function normalise_oldFormat(data: oldFormat.proj_entry): NormalisedProjectData {
    let obj: NormalisedProjectData = {
        links: data.links ?? [],
        body: data.desc?.replace("\n", "\n\n") ?? "",
        media: [],
        title: data.title,
        featured: !!data.featured
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

export function normalise_FrontmatterProjectData(data: FrontmatterProjectDataSchema, body: string): NormalisedProjectData {
    let obj: NormalisedProjectData = {
        links: [],
        body: body,
        media: [],
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
    return obj
}