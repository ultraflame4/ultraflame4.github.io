import {Link, Outlet} from "react-router-dom";
import UnderConstruction from "../components/UnderConstruction";
import TopNav from "../components/TopNav";
import "../assets/css/routes/Home.css";
import {useEffect} from "react";

export default function Home() {


    return (
        <>

            <TopNav allowSizeChange={true}/>

            <header
                className={"fillViewport"}
                style={{
                    position: "fixed",
                    top: 0,
                    zIndex: -1
                }}>
                <div className={"centerItems fillSpace flex-col header-text"}>
                    <h1>
                        👋 HELLO!
                    </h1>
                    <h2>
                        Welcome to my website 🌐 !
                    </h2>

                </div>

                <video
                    id={"bg-vid"}

                    className={"fillSpace"} muted autoPlay loop>
                    <source src={"/moon.webm"} type={"video/webm"}/>
                </video>
            </header>

            <main
                style={{
                    height: "fit-content"
                }}
                className={"topShadow"}
            >


                {/* Spacer to push down stuff so got space for the header*/}
                <div
                    style={{
                        height: "calc(100vh - var(--topNavHeight))"
                    }}
                ></div>


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
