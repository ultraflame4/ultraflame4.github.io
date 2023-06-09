import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/Home.vue";
import {PageNavTree} from "@/router/page_navtree";
import Projects from "@/views/Projects.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: "/projects",
            name: "allprojects",
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
})


router.beforeEach((to, from, next) => {
    next();
    if (from.path !== to.path) {
        PageNavTree.clear()
    }
})

export default router
