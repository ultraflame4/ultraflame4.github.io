import {createWebHistory, type Router} from 'vue-router'
import Home from "@/views/Home.vue";
import {PageNavTree} from "@/router/page_navtree";
import Projects from "@/views/Projects.vue";
import type {RouterOptions} from "vite-ssg";
import { setupRouterScroller } from 'vue-router-better-scroller';

export const routerOptions: RouterOptions = {
    history: createWebHistory(import.meta.env.BASE_URL),
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
    ]
}


export function setupRouter(router: Router) {
    router.beforeEach((to, from, next) => {
        next();
        if (from.path !== to.path) {
            PageNavTree.clear()
        }
    })

    setupRouterScroller(router, {
        selectors:{
            "#site-ctn": context => {
                if (context.to.hash && context.type != "history"){

                    const timer = setInterval(()=>{
                        let e = document.querySelector(context.to.hash);
                        if (e){
                            clearInterval(timer)
                            let el_top = e.getBoundingClientRect().top
                            context.element.scrollBy({
                                top: el_top - window.innerHeight/4,
                                behavior: "smooth"
                            })
                        }

                    },100)

                    return false
                }
                return true

            }
        },
        behavior: "smooth"
    })
}


