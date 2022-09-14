import {Link} from "react-router-dom";
import {useEffect, useRef} from "react";
import HashLinkW from "./HashLinkW";
import "../assets/css/topnav.css"

export const TopNavHeightStickied = 64

const stickiedObserver = new IntersectionObserver(([e]) => {
        e.target.classList.toggle("topnav-stickied", e.intersectionRatio < 1)

    },
    {threshold: [1]})

export interface TopNavProps {
    allowSizeChange?: boolean
}

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
        el.classList.add("topnav-stickied")

    })

    function openMobileLinksMenu() {
        if (topNavLinks.current == null || topNavLinksMobilebtn.current == null) return;

        topNavLinks.current.classList.toggle("topnav-links-inactive");
        topNavLinksMobilebtn.current.classList.toggle("topnav-links-mobile-btn-active")
    }

    return (

        <nav className={"topnav"}>
            <div className={"content-maxwidth-center-wrapper"}>
                <h2 id={"topnav-title"}>
                    <a href={"/"}>
                        ultr42
                    </a>
                </h2>
                <ul id={"topnav-socials"}>
                    <li>
                        <a
                            href={"https://github.com/ultraflame4"}
                            style={{
                                backgroundImage:"url(https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg)",
                                filter: "invert()" // gotta invert color so that we can see the logo. (no white version found)
                            }}/>
                    </li>
                </ul>
                <button id={"topnav-links-mobile-btn"} onClick={openMobileLinksMenu} ref={topNavLinksMobilebtn}>
                    <img src={"https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/menu_open/grad200/48px.svg"}/>
                </button>
                <ul id={"topnav-links"} className={"topnav-links-inactive"} ref={topNavLinks}>

                    <li>
                        <HashLinkW to="/#about">About</HashLinkW>
                    </li>
                    <li>
                        <Link to="/projects">Projects</Link>
                    </li>

                    <li>
                        <Link to="/#others">Others</Link>
                    </li>

                </ul>
            </div>
        </nav>


    )
};
