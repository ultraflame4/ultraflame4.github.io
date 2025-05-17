import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";




const about_story = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./data/about" })
})



export const collections = {
    about_story
}