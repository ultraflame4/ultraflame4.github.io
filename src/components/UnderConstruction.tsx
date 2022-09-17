import React, {CSSProperties, MouseEventHandler} from "react";
import "@/assets/css/splash.css"

export default function () {
    const [reX,setReX] = React.useState("0px")
    const [reY,setReY] = React.useState("0px")

    function mouseMove(ev:React.MouseEvent<HTMLDivElement>) {

        let rect = ev.currentTarget.getBoundingClientRect();
        let x = ev.clientX - rect.left;
        let y = ev.clientY - rect.top;
        setReX(x+"px")
        setReY(y+"px")
    }

    const styles = {
        "--rx": reX,
        "--ry": reY,
    }

    return (
        <div className={"fillSpace underConstruction"}
             onMouseMove={mouseMove}
             //@ts-ignore
             style={styles}>

            <object type="image/svg+xml" data="under_construction.svg" className={"underConstruction-svg"}>
                <img src="under_construction.svg"/>
            </object>
            <h1>Under construction</h1>
            <p>This section is under construction</p>
        </div>
    )
};
