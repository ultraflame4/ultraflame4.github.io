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
