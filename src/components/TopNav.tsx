import {Link} from "react-router-dom";
import {useEffect} from "react";



export const TopNavHeightStickied = 64

const stickiedObserver = new IntersectionObserver(([e]) => {
        e.target.classList.toggle("topnav-stickied", e.intersectionRatio < 1)

    },
    {threshold: [1]})

export interface TopNavProps{
    allowSizeChange?:boolean
}

export default function TopNav(props:TopNavProps) {
    useEffect(() => {
        let el = document.querySelector(".topnav")


        if (el == null) {
            return
        }

        if (props.allowSizeChange){
            stickiedObserver.observe(el);
            return;
        }
        el.classList.add("topnav-stickied")

    })

    return (
        <nav className={"topnav"}>
            <h2 id={"topnav-title"}>
                ultr42
            </h2>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
            </ul>
        </nav>
    )
};
