import {Link, Outlet} from "react-router-dom";
import UnderConstruction from "./components/UnderConstruction";

export default function App() {
    return (
        <div className={"fillSpace"}>
            <Outlet/>
        </div>
    );
}