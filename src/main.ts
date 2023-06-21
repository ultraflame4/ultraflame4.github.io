import App from './App.vue'
import {routerOptions, setupRouter} from './router'

import './assets/reset.css'
import './assets/theme.scss'
import "vyue42/lib/index.css"

import {vyue42} from "vyue42";
import {LoadAllSkills} from "@/tools/skills";
import {ViteSSG} from "vite-ssg";

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
    // the root component
    App,
    // vue-router options
    routerOptions,
    // function to have custom setups
    ({app, router,  isClient}) => {
        if (isClient) {
            LoadAllSkills()
        }
        app.use(vyue42);
        setupRouter(router)
    },
    {
        rootContainer: "#app"
    }
)






