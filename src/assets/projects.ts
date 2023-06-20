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
    bannerSrc?: string
    /*Uses video tag instead of img tag*/
    bannerImgIsVideo?: boolean
}


export const allProjects: proj_entry[] = [
    {
        featured:true,
        title: "CliRenderer",
        desc: "This commandline programs takes in image and renders it into the terminal using braille and other unicode characters.\n\n" +
            "Use terminals with 256 color support for best experience (eg. Windows Terminal)",
        skillsUsed: ["python", "numpy"],
        source: "https://github.com/ultraflame4/CliR",
        sourceLabel: "Github",
        bannerSrc:"https://github.com/ultraflame4/CliR/raw/main/resources/img.png"
    },
    {
        featured: true,
        title: "TilImg (TiledImage)",
        skillsUsed: ["python", "numpy", "numba"],
        desc: "This program stitches or \"Tiles\" a set of images (called tiles) together into one large composite image with likeness to a reference image.\n" +
            "This uses the python 'rich' library for fancy command-line (cli) interfaces",
        source: "https://github.com/ultraflame4/TiledImage",
        bannerSrc: "https://user-images.githubusercontent.com/34125174/208235487-44f5e641-e6eb-453a-a9db-25d93a093782.png"
    },
    {
        // featured: true,
        title: "WebDevCreate",
        skillsUsed: ["typescript", "scss", "html", "python"],
        desc: "A website builder I made for myself to eventually build websites with.\nIt is designed for people who already know HTML and CSS." +
            "\nFor those who want a more simple and lightweight tool to make websites with.",
        source: "https://github.com/ultraflame4/WebDevCreate",
        bannerSrc: "https://user-images.githubusercontent.com/34125174/208923192-e1c40736-54e0-46a4-895f-8b0a30bd89bc.png",
        links: [
            {
                name: "Webapp",
                url: "https://ultraflame4.github.io/WebDevCreate"
            }
        ]
    },

    {
        featured: true,
        title: "RestauRant",
        desc: "A website listing various restaurants and reviews for them.\nRestaurants are dynamically loaded as the user scrolls and can be sorted & filtered" +
            "\n\nThis was done as part of a school final project (for the year).",
        skillsUsed: ["express.js","fuse.js", "js", "html", "css", "mysql"],
        source:"https://github.com/ultraflame4/CDEVRestaurantReview",
        bannerSrc:"https://user-images.githubusercontent.com/34125174/231458566-f7089fa4-9f4f-44ce-93c7-30b9dc3a14c2.png",
        links:[{
            name: "Project Site",
            url: "https://sites.google.com/view/restau-rant/home?authuser=0"
        }]
    },
    {
        featured: true,
        title: "Moosic App Electric Boogalo",
        skillsUsed: ["java", "android", "android studio"],
        desc: "An android music app done for a school project. Features include account login, google login, playlists etc.",
        source: "https://github.com/ultraflame4/MoosicElectricBoogaloo",
        bannerSrc: "https://user-images.githubusercontent.com/34125174/209052797-04de64b1-5645-4b96-a1a0-75f40a411bd2.mov",
        bannerImgIsVideo: true
    },
    {
        // featured: true,
        title: "Online Tic Tac Toe",
        bannerSrc: "https://user-images.githubusercontent.com/34125174/147404403-baa8daaf-3ec9-4cf7-bcf1-711ba28dca27.png",
        skillsUsed: ["html", "css", "javascript"],
        desc: "A simple multiplayer Tic Tac Toe game playable on the browser. This taught me about how multiplayer and networking works in games and some of the troubles associated with it.",
        source: "https://github.com/ultraflame4/OnlineTicTacToe",
        links: [
            {
                name: "Game",
                url: "https://ultraflame4.github.io/OnlineTicTacToe"
            }
        ]
    },
    {
        // featured: true,
        title: "PythonQtBrowser",
        bannerSrc: "https://user-images.githubusercontent.com/34125174/208937208-571d4934-cb2b-455d-879b-f8422ef2aa62.png",
        skillsUsed: ["python"],
        desc: "This was my attempt at creating a browser using python (and initially pygame). However i very quickly realised that I underestimated this huge task, " +
            "and promptly decided to use the WebView component from the Qt library to do the heavy lifting (rendering the actual page)",
        source: "https://github.com/ultraflame4/PythonQtBrowser"
    },
    {
        // featured: true,
        title: "Better Console",
        bannerSrc: "https://github.com/ultraflame4/Better-Console-python/raw/master/imgs/ezgif-3-e5e15d50dcf7.gif",
        skillsUsed: ["Python"],
        desc: "This was created when I was still learning python and got frustrated with logging in it." +
            "\nThis features an input box that allows you to enter in commands whilst the program is running.\nThis library is also non-blocking.",
        source: "https://github.com/ultraflame4/Better-Console-python"
    }
]

export const featuredProjects = allProjects.filter(value => value.featured)
