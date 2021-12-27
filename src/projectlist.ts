export type ProjectListItem = {
    name: string;
    desc: string;
    image_url?: string;
    // urls
    repo?: string;
    web?: string;
}


export function getProjects(): ProjectListItem[] {
    return [
        {
            name: "OnlineTicTacToe",
            desc: "A multiplayer capable tic tac toe. game",
            repo: "https://github.com/ultraflame4/OnlineTicTacToe",
            web: "https://ultraflame4.github.io/OnlineTicTacToe",
            image_url: "https://user-images.githubusercontent.com/34125174/147404403-baa8daaf-3ec9-4cf7-bcf1-711ba28dca27.png"
        },
        {
            name: "TiledImage",
            desc: "This program recreate a reference image using a set of images as pixels referred to as tiles",
            image_url: "https://user-images.githubusercontent.com/34125174/147404436-d5be34b1-4816-4005-95b6-adffdaad8307.png",
            repo: "https://github.com/ultraflame4/TiledImage"
        },
        {
            name: "Better Console",
            desc: "Tis project aims to provide a better console for logging in python",
            repo: "https://github.com/ultraflame4/Better-Console-Python",
            image_url: "https://github.com/ultraflame4/Better-Console-python/raw/master/imgs/ezgif-3-e5e15d50dcf7.gif"
        },
        {
            name: "DiscordBotClient",
            desc: "A client for discord bots.",
            repo: "https://github.com/ultraflame4/DiscordBotClient"
        },
        {
            name: "Minesweeper",
            desc: "A Minesweeper clone thrown together haphazardly in a couple of days. Written in html and javascript",
            image_url: "./minesweeper.png",
            repo: "https://github.com/ultraflame4/Minesweeper",
            web: "https://ultraflame4.github.io/Minesweeper"
        },
        {
            name: "Python Qt Browser",
            desc: "A custom browser written for fun using python and the PyQt5 library. " +
                "Features include a built-in adblocker, multiple tabs support," +
                " and not being able to log into any google account.  ¯\\_(ツ)_/¯",
            repo: "https://github.com/ultraflame4/PythonQtBrowser"
        },
        {
            name: "Python BGario",
            desc: "An amateur remake of agario written in python in 2018",
            repo: "https://github.com/ultraflame4/Python-Bgario",
            image_url: "./bgario.png"
        },
        {
            name: "Binosaur",
            desc: "Inspired by the chrome dino game, in this game, your goal is to " +
                "gain as many points as possible by jumping over obstacles to survive. " +
                "Written using Python and pygame",
            repo: "https://github.com/ultraflame4/Binosaur-game"
        },
        {
            name: "Rock Paper Scissors",
            desc: "Rock Paper Scissors written using python and pygame by a beginner in 2018",
            repo: "https://github.com/ultraflame4/Rock-Paper-Scissors"
        }
    ];
}