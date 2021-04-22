

function populateList(){
    addRepoToList("OnlineTicTacToe",true)
    addRepoToList("Rock-Paper-Scissors")
    addRepoToList("Rock-Paper-Scissors")
    addRepoToList("PythonQtBrowser")
    addRepoToList("Binosaur-game")
    addRepoToList("Better-Console-Python")
    addRepoToList("Python-Bgario")

}


function addRepoToList(name,has_page=false){

    var list = document.getElementById("project-list")



    let list_item = document.createElement("li")
    list_item.setAttribute("class","project-list-item")
    list_item.setAttribute("onclick","projectlistItemClicked(this)")
    list_item.textContent = name
    list_item.dataset.name = name
    list_item.dataset.url = "https://github.com/ultraflame4/"+name
    list_item.dataset.has_site=has_page


    list.appendChild(list_item)


}

function projectlistItemClicked(tag){
    if (tag.dataset.has_site == "true"){
        window.open("https://ultraflame4.github.io/"+tag.dataset.name)
    }else {
        window.open(tag.dataset.url)
    }
}