import {Link, Outlet} from "react-router-dom";
import UnderConstruction from "../components/UnderConstruction";
import TopNav from "../components/TopNav";
import "../assets/css/routes/Home.css";
import {useEffect} from "react";
import {HashLink} from 'react-router-hash-link';

export default function Home() {


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
                    <h2>About</h2>
                    <p style={{
                        textAlign: "center"
                    }}>
                        I'm an aspiring developer who started programming in 2018-2019.
                        <br/>
                        I don't really rmb.
                        <br/>
                        learned programming at the age of 12, learning from various
                        youtube videos & online courses.
                        <br/>
                        Since then, I've dabbled in a bunch of stuff and have done a variety projects
                        <br/>
                        and also learned a bunch of (programming) languages.
                    </p>
                    <br/>
                    <br/>
                    {/* todo Maybe add a compentency/preferred meter here */}
                    <ul id={"about-languages"}>
                        <li>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
                                 alt={"C sharp logo"}/>
                        </li>
                        <li>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg"
                                 alt={"unity logo"} style={{filter: "invert()"}}/>
                        </li>
                        <li>

                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                                 alt={"java logo"}/>
                        </li>
                        <li>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                                 alt={"python logo"}/>
                        </li>
                        <li>
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                                alt={"javascript logo"}/>
                        </li>
                        <li>
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                                alt={"typescript logo"}/>
                        </li>
                        <li>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                                 alt={"vue.js logo"}/>
                        </li>
                        <li>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                 alt={"react.js logo"}/>
                        </li>
                    </ul>
                </section>
                <section className={"fillViewport"} id={"#projects"}>
                    <UnderConstruction/>
                </section>
            </main>


        </>

    )
};
