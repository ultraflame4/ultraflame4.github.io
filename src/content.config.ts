import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const about_story = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./data/about" })
})

const projects = defineCollection({
    loader: glob({ pattern: "*.md", base: "./data/projects" }),
})



export const collections = {
    about_story,
    projects
}