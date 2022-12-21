export interface proj_entry {
    featured?: boolean,
    source?: string, // most commonly the github repo
    sourceLabel?: string, // defaults to github
    links?: {
        name: string,
        url?: string,
        /* icons from https://icones.js.org/collection/all?s=code */
        icon?: string,

        fillColor?: string,
        filledTextColor?: string,

        filled?: boolean

    }[]
    title: string,
    desc?: string,
    skillsUsed: string[],
    bannerImg?: string
}


export const allProjects:proj_entry[] = [
    {
        featured: true,
        title: "TilImg (TiledImage)",
        skillsUsed: ["python","numpy","numba"],
        desc:"This program stitches or \"Tiles\" a set of images (called tiles) together into one large composite image with likeness to a reference image.",
        source:"https://github.com/ultraflame4/TiledImage",
        bannerImg:"https://user-images.githubusercontent.com/34125174/208235487-44f5e641-e6eb-453a-a9db-25d93a093782.png"
    },
    {
        featured: true,
        title: "WebDevCreate",
        skillsUsed: ["typescript","scss","html","python"],
        desc: "A website builder I made for myself to eventually build websites with.\nIt is designed for people who already know HTML and CSS." +
            "\nFor those who want a more simple and lightweight tool to make websites with.",
        source: "https://github.com/ultraflame4/WebDevCreate",
        bannerImg: "https://user-images.githubusercontent.com/34125174/208923192-e1c40736-54e0-46a4-895f-8b0a30bd89bc.png",
        links:[
            {
                name:"Webapp",
                url:"https://ultraflame4.github.io/WebDevCreate"
            }
        ]
    }
]

export const featuredProjects = allProjects.filter(value => value.featured)
