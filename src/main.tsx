import ReactDOM from "react-dom/client";
import App from "./App";
import {HashRouter, Route, Routes} from "react-router-dom";
import Projects from "./routes/Projects";
import "./assets/css/index.css"
import "./assets/css/easter_eggs.css"
import "./assets/css/splash.css"

import Home from "./routes/Home";


const rootElement = document.getElementById("root")
if (rootElement != null) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/" element={<App/>}>
                    <Route path="projects" element={<Projects/>}/>
                </Route>

            </Routes>
        </HashRouter>
    );
} else {
    console.error("Fatal Error. Could not find root element! Cannot start react!")
}
