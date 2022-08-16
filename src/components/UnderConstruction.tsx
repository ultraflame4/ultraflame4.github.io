import React, {CSSProperties, MouseEventHandler} from "react";

export default function () {
    const [reX,setReX] = React.useState("0px")
    const [reY,setReY] = React.useState("0px")

    function mouseMove(ev:React.MouseEvent<HTMLDivElement>) {
        let relativeX = ev.pageX-ev.currentTarget.offsetLeft
        let relativeY = ev.pageY-ev.currentTarget.offsetTop

        setReX(relativeX+"px")
        setReY(relativeY+"px")
    }

    const styles = {
        "--rx": reX,
        "--ry": reY
    }

    return (
        <div className={"fillSpace underConstruction"}
             onMouseMove={mouseMove}
             //@ts-ignore
             style={styles}>

            <object type="image/svg+xml" data="/under_construction.svg" className={"underConstruction-svg"}>
                <img src="/under_construction.svg"/>
            </object>
            <h1>Under construction</h1>
            <p>This section is under construction</p>
        </div>
    )
};