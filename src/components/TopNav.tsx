import {useEffect, useRef} from "react";
import HashLinkW from "./HashLinkW";
import "../assets/css/topnav.scss"
import "animate.css"
import {PageLinkData} from "@/tools";
import {NavLink} from "react-router-dom";
import {NavHashLink} from "react-router-hash-link";

export const TopNavHeightStickied = 64

export interface TopNavProps {
    allowSizeChange?: boolean
}

interface topNavSocialsItem {
    href: string
    icon: string
    invert?: boolean
}

const topNavLinksList: PageLinkData[] = [
    {name: "About", to: "/"},
    {name: "All Projects", to: "/projects"},
    {name: "Others", to: "/others"},
]

const topNavSocialsList: topNavSocialsItem[] = [
    {
        href: "https://github.com/ultraflame4",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        invert: true
    },
    {
        href: "https://www.linkedin.com/in/chester-lai-664803239/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg",
        invert: true

    }

]


const stickiedObserver = new IntersectionObserver(([e]) => {
        e.target.classList.toggle("stickied", e.intersectionRatio < 1)

    },
    {threshold: [1]})


export default function TopNav(props: TopNavProps) {
    const topNavLinks = useRef<HTMLUListElement>(null);
    const topNavLinksMobilebtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        let el = document.querySelector(".topnav")


        if (el == null) {
            return
        }

        if (props.allowSizeChange) {
            stickiedObserver.observe(el);
            return;
        }
        el.classList.add("stickied")

    })

    function openMobileLinksMenu() {
        if (topNavLinks.current == null || topNavLinksMobilebtn.current == null) return;

        topNavLinks.current.classList.toggle("topnav-links-inactive");
        topNavLinksMobilebtn.current.classList.toggle("menu-open")
    }

    return (

        <nav className={"topnav"}>
            <div className={"content-maxwidth-center-wrapper"}>
                <h2 id={"title"} className={"animate__animated animate__fadeIn delay-200ms"}>
                    <a href={"/"}>
                        ultr42
                    </a>
                </h2>
                <ul id={"topnav-socials"}>
                    {topNavSocialsList.map((value, index,array) =>
                        <li key={index}>
                            <a
                                className={"animate__animated animate__fadeIn"}
                                href={value.href}
                                style={{
                                    backgroundImage: `url(${value.icon})`,
                                    filter: value.invert ? "invert()" : "",
                                    animationDelay: `${(array.length-index + topNavLinksList.length + 1) * 400}ms`
                                }}
                            />
                        </li>
                    )}

                </ul>
                <button id={"topnav-links-menu-btn"} onClick={openMobileLinksMenu} ref={topNavLinksMobilebtn}>
                    <img
                        src={"https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/menu_open/grad200/48px.svg"}/>
                </button>
                <ul id={"topnav-links"} className={"topnav-links-inactive"} ref={topNavLinks}>
                    {topNavLinksList.map((value, index) =>
                        <li className={"animate__animated animate__fadeIn"}
                            style={{animationDelay: `${(index + 1) * 500}ms`}} key={index}>
                            <NavLink to={value.to} className={isActive => {

                                return "link-underline " + (isActive.isActive?"active":undefined)
                            }
                            } end>{value.name}</NavLink>
                        </li>
                    )}

                </ul>
            </div>
        </nav>


    )
};
