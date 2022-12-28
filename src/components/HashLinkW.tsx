import {defineComponent} from "@/tools";
import {HashLink} from "react-router-hash-link";
import React from "react";

interface HashLinkWProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>{
    to:string,

}

function scrollToElement(element: HTMLElement) {

    console.log(element.clientHeight>window.innerHeight?"start":"center",element.clientHeight)
    element.scrollIntoView({
        behavior: "smooth",
        block: element.clientHeight>window.innerHeight?"start":"center"
    })
}

export default defineComponent<HashLinkWProps>((props) => {


    return (

        <HashLink {...props} to={props.to} scroll={scrollToElement}>{props.children}</HashLink>
    )
})
