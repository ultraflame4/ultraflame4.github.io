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
                    <li><HashLink to={"/#about"}>about</HashLink></li>
                    <li><HashLink to={"/#projects"}>projects</HashLink></li>
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


                <section className={"fillViewport"} id={"about"}>
                    <UnderConstruction/>
                </section>
                <section className={"fillViewport"}>
                    <UnderConstruction/>
                </section>
            </main>


        </>

    )
};
