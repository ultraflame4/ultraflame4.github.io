import {createRouter, createWebHashHistory, createWebHistory, type Router} from 'vue-router'
import Home from "@/views/Home.vue";
import {PageNavTree} from "@/router/page_navtree";
import Projects from "@/views/Projects.vue";
import type {RouterOptions} from "vite-ssg";

export const routerOptions :RouterOptions= {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: "/projects",
            name: "projects",
            component: Projects
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (!to.hash) {
            return
        }
        setTimeout(() => {
            document.querySelector(to.hash)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }, 500)
    }
}


export function setupRouter(router: Router) {
    router.beforeEach((to, from, next) => {
        next();
        if (from.path !== to.path) {
            PageNavTree.clear()
        }
    })
}


