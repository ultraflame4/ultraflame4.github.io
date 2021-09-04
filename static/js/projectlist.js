

function populateList(){
    addRepoToList("OnlineTicTacToe",true)
    addRepoToList("Minesweeper",true)
    addRepoToList("DiscordBotClient")
    addRepoToList("TiledImage")
    addRepoToList("Rock-Paper-Scissors")
    addRepoToList("PythonQtBrowser")
    addRepoToList("Binosaur-game")
    addRepoToList("Better-Console-Python")
    addRepoToList("Python-Bgario")

}


function addRepoToList(name,has_page=false){

    var list = document.getElementById("project-list")



    let list_item = document.createElement("div")
    list_item.className="project-list-item row"
    list_item.setAttribute("onclick","projectlistItemClicked(this)")
    list_item.dataset.name = name
    list_item.textContent = name
    list_item.dataset.url = "https://github.com/ultraflame4/"+name
    list_item.dataset.has_site=has_page
    if (has_page){

    }


    list.appendChild(list_item)


}


function openProjectSite(tag){
    window.open("https://ultraflame4.github.io/"+tag.dataset.name)
}

function projectlistItemClicked(tag){
    if (tag.dataset.has_site == "true"){
        window.open("https://ultraflame4.github.io/"+tag.dataset.name)
    }else {
        window.open(tag.dataset.url)
    }
}
