import {defineComponent} from "../tools";
import {HashLink} from "react-router-hash-link";
import React from "react";

interface HashLinkWProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    to:string,

}

function scrollToElement(element: HTMLElement) {
    element.scrollIntoView({
        behavior: "smooth",
        block: element.clientHeight>window.innerHeight?"start":"center"
    })
}

export default defineComponent<HashLinkWProps>((props, context) => {


    return (
        // @ts-ignore
        <HashLink {...props} to={props.to} scroll={scrollToElement}>{props.children}</HashLink>
    )
})
