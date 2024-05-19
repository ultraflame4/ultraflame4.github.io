import {createWebHistory, type Router} from 'vue-router'
import Home from "@/views/Home.vue";
import {PageNavTree} from "@/router/page_navtree";
import Projects from "@/views/Projects.vue";
import type {RouterOptions} from "vite-ssg";
import {setupRouterScroller} from 'vue-router-better-scroller';

export const routerOptions: RouterOptions = {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'about',
            component: Home
        }, {
            path: "/projects",
            name: "projects",
            component: Projects
        }
    ]
}

function scrollToElement(root: Element | Window, el: Element){
    
    // Element rect relative to viewport
    let view_dist = el.getBoundingClientRect();

    // Amount to scroll to center element at its top.
    let top_scrollby= view_dist.top - window.innerHeight / 2;
    let center_scrollby = top_scrollby + view_dist.height / 2;


    if (view_dist.height >  window.innerHeight){
        center_scrollby = view_dist.top - window.innerHeight / 20;
    }


    root.scrollBy({
        top: center_scrollby,
        behavior: "smooth"
    })
}


export function setupRouter(router: Router) {
    router.beforeEach((to, from) => {
        if (from.path !== to.path) PageNavTree.clear()
    })

    // router.afterEach((to,from)=>{
    //     //@ts-expect-error
    //     if (window.IsDev){
    //         console.log(`IsDev only! After each from ${from.fullPath} to ${to.fullPath}`)
    //     }
    // })

    setupRouterScroller(router, {
        selectors: {
            "#site-ctn": context => {
                if (context.to.hash) {

                    const timer = setInterval(() => {
                        let e = document.querySelector(context.to.hash);
                        
                        if (e) {
                            clearInterval(timer)
                            scrollToElement(context.element, e);
                            
                        }
              
                    }, 500)

                    return false
                }
                return true

            }
        },
        behavior: "smooth"
    })
}


