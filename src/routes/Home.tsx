import {Link, Outlet} from "react-router-dom";
import UnderConstruction from "../components/UnderConstruction";
import TopNav from "../components/TopNav";
import "../assets/css/routes/Home.css";
import {useEffect, useState} from "react";
import {HashLink} from 'react-router-hash-link';
import Counter from "../components/Counter";
import FallingItem from "../components/easter_eggs/FallingItem";

interface p_language {
    name: string,
    logo: string,
    confidence: number // percentage.
    invert_image?: boolean
}

const languages: p_language[] = [
    {
        name: "C Sharp",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        confidence: .7
    },
    {
        name: "Unity",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
        confidence: .65,
        invert_image: true
    },
    {
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        confidence: .5
    },
    {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        confidence: .9
    },
    {
        name: "Javascript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        confidence: .5
    },
    {
        name: "Typescript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        confidence: .8
    },
    {
        name: "Vue.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        confidence: .65
    },
    {
        name: "React.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        confidence: .6
    }
]

let abtLangEasterEgg = false


export default function Home() {

    function aboutLangEasterEgg() {
        let about_langs= document.querySelector("#about-languages")?.querySelectorAll(".falling-item-fallen")
        if (about_langs == null){
            return
        }
        for (let i = 0; i < about_langs.length; i++) {
            let e = about_langs[i]
            setTimeout(()=>{
                e.classList.remove("falling-item-fallen")
                e.classList.add("falling-item-fallen-inversed")
            },i*600)
        }

        setTimeout(()=>{
            let a = document.createElement("div")
            a.classList.add("glowy-overlay")
            document.querySelector("body")?.append(a)

            setTimeout(()=>{
                location.assign("/v1/rr.html")
            },6000)
        },languages.length*600+2000)
    }


    function onLangLogoClicked() {

        // Check if all items have fallen. If yes  begin easter egg sequence 2.
        // Use set time out to wait so that this executes aft the child listner executes
        setTimeout(()=>{
            let about_langs= document.querySelector("#about-languages")?.querySelectorAll(".falling-item-fallen")
            if (about_langs==null){
                return
            }
            if (about_langs.length == languages.length){ // if started dont start again
                if (!abtLangEasterEgg){
                    abtLangEasterEgg=true
                    setTimeout(aboutLangEasterEgg,1000)
                }

            }
        },0)
    }


    return (
        <>

            <TopNav allowSizeChange={true}/>

            <header id="home-header">
                <div className={"centerItems fillSpace flex-col"} id={"header-text"}>
                    <h1>
                        👋 HELLO!
                    </h1>
                    <h2>
                        Welcome to my website 🌐 !
                    </h2>
                </div>

                <ul id={"header-links"}>
                    <li><HashLink smooth to={"/#about"}>about</HashLink></li>
                    <li><HashLink smooth to={"/#projects"}>projects</HashLink></li>
                </ul>


                <video
                    id={"bg-vid"}

                    className={"fillSpace"} muted autoPlay loop>
                    <source src={"moon.webm"} type={"video/webm"}/>
                </video>
            </header>


            <main
                style={{
                    height: "fit-content"
                }}
                className={"topShadow"}
            >


                <section className={"fillViewport centerItems flex-col"} id={"about"}>
                    <h2>About Me 😐</h2>
                    <p style={{
                        textAlign: "center"
                    }}>
                        I'm an aspiring <b>self-taught</b> developer who started programming in 2018-2019.
                        <br/>
                        I don't really rmb.
                        <br/>
                        <br/>
                        Started with <a href={"https://minecraft.net"}>minecraft</a> ⛏️ redstone and command blocks.
                        <br/>
                        Proceeded to learn "real" programming from various youtube tutorials & online courses.
                        <br/>
                        <br/>
                        Since then, I've dabbled in a bunch of stuff and have done a variety projects

                    </p>
                    <br/>
                    <br/>

                    {/* todo Maybe add a compentency/preferred meter here */}
                    <h2>What I Know 📖</h2>
                    <p>Below are the skills, languages & technologies I've learned over the years and
                        my <b>confidence</b> level in them</p>
                    <br/>
                    <ul id={"about-languages"}>
                        {
                            languages.map((value, index) => (
                                <li key={index} className={"about-languages-item"}>

                                    <FallingItem>
                                        <img src={value.logo}
                                             alt={value.name}
                                             title={value.name}
                                             onClick={onLangLogoClicked}
                                             style={{
                                                 filter: value.invert_image ? "invert()" : "",
                                             }}
                                        />
                                    </FallingItem>

                                    <h5>{value.name}</h5>
                                    <p style={{
                                        fontWeight: 700,
                                        fontSize: "0.9em",
                                        color: `hsl(calc(${value.confidence} * 120), 90%, 40%)`
                                    }}>

                                        <Counter to={value.confidence} steps={0.02} interval={50} resetOnClick={true}/>
                                    </p>


                                </li>
                            ))

                        }

                    </ul>
                </section>
                <section className={"fillViewport"} id={"#projects"}>
                    <UnderConstruction/>
                </section>
            </main>


        </>

    )
};
