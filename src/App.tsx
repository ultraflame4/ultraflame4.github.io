import {Link, Outlet} from "react-router-dom";
import UnderConstruction from "./components/UnderConstruction";
import TopNav from "./components/TopNav";

export default function App() {
    return (
        <div className={"fillSpace"}>
            <TopNav/>
            <Outlet/>
        </div>
    );
}
