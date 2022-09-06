import {defineComponent} from "../../tools";
import {MouseEventHandler, useEffect} from "react";


export default defineComponent(function (props) {

    useEffect(() => {
        window.focus()

        const a = () => {
            setTimeout(() => {
                if (document.activeElement.tagName === "IFRAME") {
                    console.log("clicked");
                }
            });
        }
        window.addEventListener("blur", a);

        setTimeout(()=>{
            document.querySelector("#langEasterEggVid")?.classList.remove("disable-pointer-evs")
        },7000)

        return ()=>{
            window.removeEventListener("blur",a)
            document.querySelector("#langEasterEggVid")?.classList.remove("transparent")
        }
    })



    return (
        <div className={"lang-easter-egg-overlay"}>

            <iframe
                id={"langEasterEggVid"}
                className={"fillSpace transparent disable-pointer-evs"}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>

            <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }} className={"fillSpace disable-pointer-evs"}>
                <h1>
                    💀 You died 🪦.
                </h1>
                <p>Cause of death: <b>annihilation by cosmic radiation.</b></p>
                <button className={"lang-easter-respawn"}>
                    Click Any Where To Respawn 💖
                </button>
            </div>


        </div>
    )
})
