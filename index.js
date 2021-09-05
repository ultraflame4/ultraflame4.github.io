

function createElement(tagName, className="", id=""){
    let tag = document.createElement(tagName);
    tag.className = className;
    if (id!==""){tag.id=id}
    return tag;

}


function constructProjectItem(title,name,description="description",hasApp=false) {

    let projectItem = createElement("div", "project-item");
    let projectItemContent = createElement("div", "project-item-content column");
    let projectItemContentText = createElement("div", "project-item-content-text column");
    let projectTitleE = createElement("h1")
    let projectDescE = createElement("p")
    let projectItemLinks = createElement("div" ,"project-item-content-links row")
    let projecItemMoreE = createElement("a","project-item-more")
    let projecItemAppLink = createElement("a","project-item-extlink")
    let projecItemRepoLink = createElement("a","project-item-extlink")
    let globeIcon = createElement("img")
    let githubIcon = createElement("img")
    globeIcon.src = "./assets/globe.svg";
    githubIcon.src = "./assets/GitHub-Mark-64px.png";



    projectTitleE.textContent = title;
    projectDescE.textContent=description

    projectItemContentText.appendChild(projectTitleE)
    projectItemContentText.appendChild(projectDescE)
    projectItemContent.appendChild(projectItemContentText)

    projecItemMoreE.textContent=">>>"


    if (hasApp){
        projecItemAppLink.href = "https://ultraflame4.github.io/"+name
    }
    else{
        globeIcon.setAttribute("disabled","")
    }
    projecItemAppLink.appendChild(globeIcon)

    projecItemRepoLink.href = "https://github.com/ultraflame4/" + name;
    projecItemRepoLink.appendChild(githubIcon)

    projectItemLinks.appendChild(projecItemMoreE);
    projectItemLinks.appendChild(projecItemAppLink);
    projectItemLinks.appendChild(projecItemRepoLink);
    projectItemContent.appendChild(projectItemLinks)

    projectItem.appendChild(projectItemContent)
    return projectItem
}

function addProjectToList(title,name,description="description",hasApp=false) {
    document.getElementById("project-list-container").appendChild(constructProjectItem(title,name, description, hasApp));
}


var projectListJsonUrl = "./assets/project-list.json"

window.addEventListener("load",()=>{
    fetch(projectListJsonUrl)
        .then(response=>response.json())
        .then(json=>{
            json.forEach((item,index)=>{
                addProjectToList(item["title"],item["name"],item["description"],item["has_app"])
            })
        })
})