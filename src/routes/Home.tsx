import {AnimationOnScroll} from "react-animation-on-scroll";
import UnderConstruction from "../components/UnderConstruction";
import {useEffect, useRef, useState} from "react";

import TopNav from "../components/TopNav";
import {PageLinkData} from "@/tools";
import {skills} from "@/assets/skills";

import Counter from "../components/Counter";
import HashLinkW from "../components/HashLinkW";

import "@/assets/css/routes/Home.scss";
import "animate.css"
import ForEachChild from "@/components/ForEachChild";


const HeaderLinksList: PageLinkData[] = [
    {name: "about", to: "/#about"},
    {name: "skills", to: "/#skills"},
    {name: "projects", to: "/#projects"}
]


export default function Home() {


    return (
        <>


            <TopNav allowSizeChange={true}/>

            <header id="home-header">
                <div className={"centerItems fillSpace flex-col"} id={"header-text"}>


                    <ForEachChild callback={(child,index)=>{
                        return (
                            <AnimationOnScroll animateIn={index==0?"animate__fadeInLeft":"animate__fadeIn"} delay={800 * index}>
                                {child}
                            </AnimationOnScroll>)
                    }}>
                        <h1>
                            👋 HELLO!
                        </h1>
                        <h2>I'm Chester</h2>
                        <h3>&</h3>
                        <h3>
                            Welcome to my website 🌐 !
                        </h3>
                    </ForEachChild>


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

                    <ForEachChild callback={(child,index)=>{
                        return (
                            <AnimationOnScroll animateIn={"animate__fadeIn"} afterAnimatedIn={()=>{console.log("test")}} initiallyVisible={true}>
                                {child}
                            </AnimationOnScroll>
                        )
                    }}>
                        <h2>About Me 😐</h2>
                        <p
                            style={{
                                textAlign: "center"
                            }}>
                            I'm an aspiring <b>self-taught</b> developer <wbr/>who started programming in 2018-2019.
                            <br/>
                            I don't really remember.
                            <br/>
                            <br/>
                            Started with <wbr/><a href={"https://minecraft.net"} className={"link-underline"}>minecraft</a> ⛏️
                            redstone and command blocks.
                            <br/>
                            Then I learned python from <wbr/>various youtube tutorials & various online courses.
                            <br/>
                            <br/>
                            Since then, <wbr/>I've come a long way and have done a wide variety of projects
                            <br/>
                            <br/>
                            <small>Hopefully I'll finish the mountain of side projects
                                   someday... <small>maybe</small>...</small>
                        </p>
                    </ForEachChild>

                </section>
                <section id={"skills"}>
                    <div id={"skills-text-ctn"} className={"home-anim animate__animated animate__fadeInLeft delay-1s"}>
                        <div className={"child-wrapper"}>
                            <div id={"skills-text"}>
                                <h2>🎓 What I Know 📖</h2>
                                <p>These are the&nbsp;
                                    <wbr/>
                                    <span style={{color: "lightgreen"}}>📜<b>skills</b></span>,&nbsp;
                                    <wbr/>
                                    <span style={{color: "orchid"}}>🔤<b>languages</b></span>&nbsp;&&nbsp;
                                    <wbr/>
                                    <span style={{color: "peru"}}>🛠️<b>frameworks</b></span>,<br/>
                                    <wbr/>
                                   I've learned over the years. <br/><br/>
                                   The numbers below <wbr/>represents my confidence 🔥
                                    <wbr/>
                                   in each of them.
                                </p>
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
