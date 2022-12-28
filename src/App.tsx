import {Outlet} from "react-router-dom";

import TopNav from "./components/TopNav";

export default function App() {
    return (
        <div className={"fillSpace"}>
            <TopNav/>
            <Outlet/>
        </div>
    );
}
