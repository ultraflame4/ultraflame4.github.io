import {useEffect, useState} from "react";
import {defineComponent} from "../tools";

export interface CounterProps {
    /**
     * The number to start counting from. Defaults to 0
     */
    from?: number
    /**
     * The number to count to. Required
     */
    to: number
    /**
     * The time between each iteration in milliseconds. Defaults 1000ms
     */
    interval?: number
    /**
     * How much to increase the count by each iteration. Defaults by 1
     */
    steps?: number
    /**
     * How many decimal places to show. Defaults to 2. Used to prevent floating point errors
     */
    decimal_places?: number
    /**
     * Resets the counter whenever it is clicked.
     */
    resetOnClick?: boolean
}


/**
 * Counts from a value to another value.
 *
 * This component does not have a root element
 *
 * @param props
 * @constructor
 */
export default defineComponent<CounterProps>(function (props) {


    const [count, setCount] = useState(props.from ?? 0)
    useEffect(() => {

        const interval = setInterval(() => {
            let a = count + (props.steps ?? 1)
            if (a > props.to) {
                a = props.to
            }
            setCount(a)


        }, props.interval ?? 1000)


        return () => {
            clearInterval(interval)
        }
    })

    function resetCounter() {
        setCount(props.from ?? 0);
    }

    function resetCounterOnClick() {
        if (props.resetOnClick){resetCounter()}
    }

    return (<span onClick={resetCounterOnClick}>
        {count.toFixed(props.decimal_places ?? 2)}
    </span>)
});
