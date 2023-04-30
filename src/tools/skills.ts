export interface skillItem{
    name:string,
    image:string,
    level:string,
}

export interface SkillListJsonConfig{
    $schema:string
    skills:SkillListJsonConfig[]
}
