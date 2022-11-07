import React from "react";
import {defineComponent} from "../tools";

interface props extends React.HTMLAttributes<HTMLDivElement> {

}

export default defineComponent<props>((props, context) => {
    return (<div {...props}>
        {props.children}
    </div>)
})