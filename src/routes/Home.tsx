import {Link} from "react-router-dom";
import UnderConstruction from "../components/UnderConstruction";

export default function Home() {
    return (
        <main className={"fillSpace"}>

            <Link to="/projects">Projects</Link>
            <UnderConstruction/>
        </main>
    )
};