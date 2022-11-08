/**
 * Wrapper around Animation On Scroll to adjust a few global settings
 */
import {defineComponent} from "@/tools";
import {AnimationOnScroll} from "react-animation-on-scroll";

interface props {
    animateIn?: string,
    delay?: number,
    animateOnce?: boolean,
    scrollableParentSelector?: string
}

export default defineComponent<props>((props, context) => {
    return (<AnimationOnScroll animateIn={props.animateIn} delay={props.delay} animateOnce={props.animateOnce}
                               scrollableParentSelector={props.scrollableParentSelector ?? "#root"}
                               offset={window.innerHeight*(1080/150)}
    >
        {props.children}
    </AnimationOnScroll>)
})
