import {createApp} from 'vue'
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import vToolTip from 'v-tooltip'

import App from './App.vue'
import Home from '@/views/Home/Home.vue'
import RouteR from "@/views/RouteR/RouteR.vue";
import ProjectList from "@/views/ProjectsList/ProjectsList.vue";
import PageNotFound from '@/views/PageNotFound.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: "/", name: "Home", component: Home},
        {path: "/r", name: "Rock", component: RouteR},
        {path: "/projects", name: "ProjectsList", component: ProjectList},
        {path: "/404", name: "404", component: PageNotFound},
        {path: "/:pathMatch(.*)*", redirect: "404"}
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            let ele = document.querySelector(to.hash)
            if (ele) {
                ele.scrollIntoView({behavior: "smooth"})
            } else {
                console.log("D")
                document.querySelector("#app")?.scrollTo(0, 0)
            }
        }

    }
})


createApp(App)
    .use(router)
    .use(vToolTip)
    .mount('#app')
