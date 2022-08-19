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
                <div className={"centerItems fillSpace"}>
                    <h1
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: "900",
                            letterSpacing: 10
                        }}
                    >ultr42</h1>
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
                className={"vCarousell topShadow"}

            >


                {/* Spacer to push down stuff*/}
                <div
                    style={{
                        height: "calc(100vh - var(--topNavHeight))"
                    }}
                ></div>


                <section className={"fillViewport"}>
                    <UnderConstruction/>
                </section>
                <section className={"fillViewport"}>
                    <UnderConstruction/>
                </section>
            </main>


        </>

    )
};
