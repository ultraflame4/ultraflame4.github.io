import UnderConstruction from "../components/UnderConstruction";
import TopNav from "../components/TopNav";
import "@/assets/css/routes/Home.scss";
import "animate.css"
import {useEffect, useRef, useState} from "react";
import Counter from "../components/Counter";
import FunnyOverlay from "../components/easter_eggs/LangEasterEggOverlay";
import HashLinkW from "../components/HashLinkW";
import {PageLinkData} from "@/tools";


interface p_language {
    name: string,
    logo: string,
    confidence: number // percentage.
    invert_image?: boolean
}

const skills: p_language[] = [
    {
        name: "C Sharp",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        confidence: .7
    },
    {
        name: "Unity",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
        confidence: .7,
        invert_image: true
    },
    {
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        confidence: .6
    },
    {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        confidence: .9
    },
    {
        name: "Javascript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        confidence: .75
    },
    {
        name: "Typescript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        confidence: .8
    },
    {
        name: "Vue.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        confidence: .7
    },
    {
        name: "React.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        confidence: .8
    }
]


const HeaderLinksList: PageLinkData[] = [
    {name: "about", to: "/#about"},
    {name: "skills", to: "/#skills"},
    {name: "projects", to: "/#projects"}
]

const animObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((value, index, array) => {
        if (value.intersectionRatio < 0.4) {
            return
        }
        value.target.getAnimations().forEach(anim => {
            // anim.cancel()
            anim.play()
        });

    })
}, {threshold: 0.5})

export default function Home() {

    const [langEasterEgg, setLangEasterEgg] = useState(false)


    useEffect(() => {
        let allAnimations = document.querySelectorAll(".home-anim")

        allAnimations.forEach((value, key) => {
            animObserver.observe(value)
        })


    })
    return (
        <>
            {langEasterEgg ? <FunnyOverlay/> : ""}

            <TopNav allowSizeChange={true}/>

            <header id="home-header">
                <div className={"centerItems fillSpace flex-col"} id={"header-text"}>
                    <h1 className={"animate__animated animate__fadeInLeft animate__delay-1s"}>
                        👋 HELLO!
                    </h1>
                    <h2 className={"animate__animated animate__fadeIn delay-1500ms"}>I'm Chester</h2>
                    <h3 className={"animate__animated animate__fadeIn delay-2000ms"}>&</h3>
                    <h3 className={"animate__animated animate__fadeIn animate__delay-3s"}>
                        Welcome to my website 🌐 !
                    </h3>
                </div>

                <ul id={"header-links"}>
                    {HeaderLinksList.map((value, index) =>
                        <li
                            className={"animate__animated animate__fadeInLeft"}
                            style={{
                                animationDelay: `${(index + 3) * 1}s`
                            }}>
                            <HashLinkW
                                className={"link-underline"}
                                to={value.to}
                            >{value.name}</HashLinkW>
                        </li>
                    )}


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


                <section className={"centerItems flex-col"} id={"about"}>

                    <h2>About Me 😐</h2>
                    <p
                        className={"home-anim animate__animated animate__fadeInLeft"}
                        style={{
                            textAlign: "center"
                        }}>
                        I'm an aspiring <b>self-taught</b> developer who started programming in 2018-2019.
                        <br/>
                        I don't really rmb.
                        <br/>
                        <br/>
                        Started with <a href={"https://minecraft.net"} className={"link-underline"}>minecraft</a> ⛏️
                        redstone and command blocks.
                        <br/>
                        Proceeded to learn "real" programming from various youtube tutorials & online courses.
                        <br/>
                        <br/>
                        Since then, I've dabbled in a bunch of stuff and have done a variety projects

                    </p>

                </section>
                <section id={"skills"}>
                    <div id={"skills-text-ctn"} className={"home-anim animate__animated animate__fadeInLeft delay-1s"}>
                        <div className={"child-wrapper"}>
                            <div id={"skills-text"}>
                                <h2>🎓 What I Know 📖</h2>
                                <p>These are the&nbsp;
                                    <wbr/>
                                    <span style={{color:"lightgreen"}}>📜<b>skills</b></span>,&nbsp;
                                    <wbr/>
                                    <span style={{color:"orchid"}}>🔤<b>languages</b></span>&nbsp;&&nbsp;
                                    <wbr/>
                                    <span style={{color:"peru"}}>🛠️<b>frameworks</b></span>,<br/>
                                    <wbr/>
                                    I've learned over the years. <br/><br/>
                                    The numbers below <wbr/>represents my confidence 🔥<wbr/> in each of them.</p>
                                <br/>

                            </div>
                            <HashLinkW to={"/#projects"} className={"link-underline"}>Skip to projects ➡️</HashLinkW>
                        </div>

                    </div>
                    <ul id={"skills-list"}>
                        <li className={"dummy-item"}></li>
                        {
                            skills.map((value, index) => (
                                <li key={index}
                                    className={"skills-list-item"}>

                                    <div className={"skill-card"}>

                                        <img src={value.logo}
                                             alt={value.name}
                                             title={value.name}
                                             style={{
                                                 filter: value.invert_image ? "invert()" : "",
                                             }}
                                        />

                                        <h5>{value.name}</h5>
                                        <p style={{
                                            fontWeight: 700,
                                            fontSize: "0.9em",
                                            color: `hsl(calc(${value.confidence} * 120), 90%, 40%)`
                                        }}>

                                            <Counter to={value.confidence} steps={0.04} interval={25}
                                                     resetOnClick={true}/>
                                        </p>

                                    </div>

                                </li>
                            ))

                        }

                    </ul>
                </section>
                <section className={"fillViewport"} id={"projects"}>
                    <UnderConstruction/>
                </section>
            </main>


        </>

    )
};
