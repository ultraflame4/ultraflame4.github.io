import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Projects from "./routes/Projects";
import "./assets/css/index.css"
import "./assets/css/splash.css"
import Home from "./routes/Home";


const rootElement = document.getElementById("root")
if (rootElement != null) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<Home/>}/>
                    <Route path="projects" element={<Projects/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
} else {
    console.error("Fatal Error. Could not find root element! Cannot start react!")
}
