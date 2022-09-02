


function pageload() {
    populateList()
}

var easter_clicked_no =0

function easterEgg(tag){
    tag.setAttribute("style","display:flex;justify-content:center;align-items:center;width:100%;user-select:none")
    easter_clicked_no += 1
    tag.style.height = (easter_clicked_no+5).toString()+"px"
    tag.style.background = chroma({ h: easter_clicked_no*10, s: 1, v: 1}).get('hex')



    tag.textContent = (easter_clicked_no/71*100).toFixed(2).toString()+" %"


    if (easter_clicked_no > 71){
        tag.textContent = "Click for Suprise!"

        tag.style.color = "#FFFFFF"
        tag.style.backgroundColor = "#000000"
        tag.style.height = (easter_clicked_no+5).toString()+"px"
        tag.setAttribute('onclick','window.location.replace("./rr.html")')
    }

    console.log(easter_clicked_no)

}


window.onload = pageload
