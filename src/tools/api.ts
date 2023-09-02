import {allProjects, featuredProjects, type proj_entry} from "@/assets/projects";
import {ref} from "vue";


export const AllProjects = ref<proj_entry[]>([])
export const FeaturedProjects = ref<proj_entry[]>([])

export async function LoadAllProjects():Promise<void> {
    AllProjects.value = allProjects
    FeaturedProjects.value = featuredProjects
}