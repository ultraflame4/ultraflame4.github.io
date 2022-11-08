import {defineComponent} from "@/tools";
import React from "react";

/**
 * Iterates over all direct children of this component and calls the callback for each of them
 */
export default defineComponent<{ callback:(child:React.ReactNode,index:number)=>void }>((props, context) => {

    return (
        <>
            {
               React.Children.map(props.children, props.callback)
            }
        </>
    )
});
