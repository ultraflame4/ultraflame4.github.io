import type {Ref} from "vue";
import {ref} from "vue";

export interface SkillItem{
    name:string,
    image:string,
    level:number,
    invert?:boolean
}

export interface SkillListJsonConfig{
    $schema:string
    skills:SkillItem[]
}


export const AllSkills: Ref<SkillItem[]> = ref([])
export async function LoadAllSkills(){
    const res = await fetch("skills.json")
    AllSkills.value = (await res.json())?.skills ?? null
}


