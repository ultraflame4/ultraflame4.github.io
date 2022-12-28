import {AnimationOnScroll} from "react-animation-on-scroll";
import UnderConstruction from "../../components/UnderConstruction";
import {useEffect, useRef, useState} from "react";

import TopNav from "../../components/TopNav";
import {defineComponent, PageLinkData} from "@/tools";
import {p_language, skills} from "@/assets/skills";

import Counter from "../../components/Counter";
import HashLinkW from "../../components/HashLinkW";

import "@/routes/Home/Home.scss";
import "animate.css"
import ForEachChild from "@/components/ForEachChild";
import AOS from "@/components/AOS";
import {Icon} from "@iconify-icon/react";
import {allProjects, featuredProjects, proj_entry} from "@/assets/allProjects";
import {TestComponent, TxtCharsFadeIn} from "ultr42-react-components";
import "ultr42-react-components/lib/style.css"

const HeaderLinksList: PageLinkData[] = [
    {name: "about", to: "/#about"},
    {name: "skills", to: "/#skills"},
    {name: "projects", to: "/#projects"}
]


const SkillCard = defineComponent<{ value: p_language }>((props, context) => {
    return (
        <li
            className={"skills-list-item"}>

            <div className={"skill-card"}>

                <img src={props.value.logo}
                     alt={props.value.name}
                     title={props.value.name}
                     style={{
                         filter: props.value.invert_image ? "invert()" : "",
                     }}
                />

                <h5>{props.value.name}</h5>
                <p style={{
                    fontWeight: 700,
                    fontSize: "0.9em",
                    color: `hsl(calc(${props.value.confidence} * 120), 90%, 40%)`
                }}>

                    <Counter to={props.value.confidence} steps={0.04} interval={25}
                             resetOnClick={true}/>
                </p>

            </div>

        </li>
    )
})

const FeaturedProjectItem = defineComponent<{ item: proj_entry }>((props, context) => {
    return (
        <li className={"featuredProject-item"}>
            <div className={"project-details"}>
                <h3>{props.item.title}</h3>
                <p>
                    {props.item.desc}
                </p>
                <ul className={"project-links"}>
                    {
                        props.item.source ?
                            <li>
                                <a href={props.item.source} target={"_blank"}>
                                    <Icon icon={"humbleicons:code"} className={"icon"}/>
                                    {props.item.sourceLabel ?? "Source"}
                                </a>
                            </li> : ""
                    }
                    {
                        props.item.links?.map((value, index) =>
                            <li key={index}>

                                <a href={value.url}
                                    //@ts-ignore using custom properties here
                                   style={{
                                       "--color": value.fillColor ?? "var(--accent-color)",
                                       "--fill-text-color": value.filledTextColor ?? "white"
                                   }}

                                   target={"_blank"} data-filled={value.filled}>
                                    <Icon icon={value.icon ?? "eva:external-link-fill"} className={"icon"}/>
                                    {value.name}
                                </a>
                            </li>
                        )
                    }

                </ul>
                <ul className={"project-skills"}>
                    {props.item.skillsUsed.map((value, index) =>
                        <li key={index}>
                            {value.toLowerCase()}
                        </li>
                    )}
                </ul>

            </div>
            <div className={"project-image"}>
                {
                    props.item.bannerImgIsVideo ? (props.item.bannerSrc ? <video controls>
                            <source src={props.item.bannerSrc}/>
                        </video> : "") :
                        (props.item.bannerSrc ? <img src={props.item.bannerSrc}/> : "")
                }
            </div>
        </li>
    )
})

export default function Home() {


    return (
        <>

            <TopNav allowSizeChange={true}/>

            <header id="home-header">
                <div className={"centerItems fillSpace flex-col"} id={"header-text"}>


                    <ForEachChild callback={(child, index) => {
                        return (
                            <AOS animateIn={index == 0 ? "animate__fadeInLeft" : "animate__fadeIn"}
                                 delay={900 * index + 1500}

                            >
                                {child}
                            </AOS>)
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
                                animationDelay: `${(index + 5)}s`
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
                    className={"fillSpace animate__animated animate__fadeIn"}
                    muted autoPlay loop>
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


                    <AOS
                        animateIn={"animate__fadeIn"}
                        delay={0}
                        animateOnce={true}>
                        <h2>About Me 😐</h2>
                    </AOS>

                    <p
                        style={{
                            textAlign: "center"
                        }}>
                        <TxtCharsFadeIn style={{animationDuration: "8s"}} animateOnScroll={true}>
                            I'm an aspiring <b>self-taught</b> developer <wbr/>who started programming in 2018-2019.
                            <br/>
                            I don't really remember.
                            <br/>
                            <br/>
                            Started with <wbr/><a href={"https://minecraft.net"}
                                                  className={"link-underline"}>minecraft</a> ⛏️
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
                        </TxtCharsFadeIn>
                    </p>


                </section>
                <section id={"skills"}>
                    <div id={"skills-text-ctn"} className={"home-anim animate__animated animate__fadeInLeft delay-1s"}>
                        <div className={"child-wrapper"}>
                            <div id={"skills-text"}>
                                <AOS
                                    animateIn={"animate__fadeInLeft"}
                                    animateOnce={true}
                                    delay={200}>
                                    <h2>🎓 What I Know 📖</h2>
                                </AOS>
                                <AOS
                                    animateIn={"animate__fadeIn"}
                                    animateOnce={true}
                                    delay={700}>
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
                                </AOS>

                                <br/>

                            </div>
                            <AOS
                                animateIn={"animate__fadeIn"}
                                delay={800}
                                animateOnce={true}>
                                <HashLinkW to={"/#projects"} className={"link-underline"}>Skip to projects
                                                                                          ➡️</HashLinkW>
                            </AOS>
                        </div>

                    </div>
                    <ul id={"skills-list"}>
                        <li className={"dummy-item"}></li>
                        {
                            skills.map((value, index) => <SkillCard key={index} value={value}/>)

                        }

                    </ul>
                </section>
                <section id={"projects"}>
                    <h2>Featured Projects</h2>
                    <ul>
                        {featuredProjects.map((item, index) => {
                            return <FeaturedProjectItem key={index} item={item}/>
                        })}
                    </ul>
                </section>
            </main>


        </>

    )
};
