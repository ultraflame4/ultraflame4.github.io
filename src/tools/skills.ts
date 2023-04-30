export interface SkillItem{
    name:string,
    image:string,
    level:number,
}

export interface SkillListJsonConfig{
    $schema:string
    skills:SkillItem[]
}
