import {defineComponent} from "../../tools";
import {useState} from "react";


export default defineComponent(function (props) {
    const [count, setCount] = useState(0)
    const [className, setClassName] = useState("child-wrapper falling-item")


    function incrementCount() {
        let nextVal = count + 1

        if (nextVal >= 3) {
            setClassName("child-wrapper falling-item falling-item-fallen")
        } else {
            setCount(count + 1)
        }

    }

    return (
        <div className={className} onClick={incrementCount}>
            {props.children}
        </div>
    )
})
