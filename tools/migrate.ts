
import {FrontmatterProjectDataSchema, NormalisedProjectData} from "../src/assets/projects";
import {stringify} from "yaml";
import * as fs from "fs";
import {normalise_oldFormat} from "../src/assets/projects_utils";
import path from "path";


function normalised2Frontmatter(normalised: NormalisedProjectData, index: number ) :FrontmatterProjectDataSchema{

    let flags: FrontmatterProjectDataSchema["flags"] = []
    if (normalised.featured) flags.push("featured")

    let links = {}

    let obj: FrontmatterProjectDataSchema = {
        title: normalised.title,

        flags: flags.length > 0 ? flags : undefined,
        source: normalised.source,
        image: normalised.media.find(x=>x.type=="img")?.url,
        video: normalised.media.find(x=>x.type=="video")?.url,
        skills: normalised.skills.length > 0 ? normalised.skills : undefined,
        links: normalised.links.length > 0? normalised.links.map(x=> {
            let o = {}
            o[x.name] = x.url
            return o
        }) : undefined,
        start: normalised.start_date.toString(),
        end: normalised.end_date.toString(),
        index_hint: index * 100
    }



    return obj
}

function writeFrontmatterMarkdown(normalised: NormalisedProjectData, index: number){
    const converted = normalised2Frontmatter(normalised, index);

    const yaml = stringify(converted)
    const content = `---\n${yaml.trim()}\n---\n${normalised.body.trim()}`
    const filename = ""+normalised.title.trim().replaceAll(/[^\w\d\.]/g,"_").toLowerCase()+".json.md"
    const filepath =path.join(__dirname,"../data/projects",filename)
    console.info("Writing to ",filepath)
    fs.writeFileSync(filepath,content)
}

function readJsonProjects(): NormalisedProjectData[]{
    return JSON.parse(fs.readFileSync("src/assets/projects.json").toString()).items.map(x=>normalise_oldFormat(x))
}

const jsonProjects = readJsonProjects();
jsonProjects.forEach((value, i) => writeFrontmatterMarkdown(value,i))

