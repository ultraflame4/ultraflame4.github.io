import {Link} from "react-router-dom";
import {useEffect} from "react";


export const TopNavHeightStickied = 64

const stickiedObserver = new IntersectionObserver(([e]) => {
        e.target.classList.toggle("topnav-stickied", e.intersectionRatio < 1)

    },
    {threshold: [1]})

export interface TopNavProps {
    allowSizeChange?: boolean
}

export default function TopNav(props: TopNavProps) {
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
                <ul id={"topnav-links"}>

                    <li>
                        <Link to="/#about">About</Link>
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
