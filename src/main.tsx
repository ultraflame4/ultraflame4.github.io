import ReactDOM from "react-dom/client";
import App from "./App";
import {HashRouter, Route, Routes} from "react-router-dom";
import "./assets/css/index.css"

import Projects from "./routes/Projects";
import Home from "./routes/Home";
import React from "react";

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
