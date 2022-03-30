import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";

import App from './App.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [

        {path: "/:pathMatch(.*)*", redirect: "404"} // redirect path to 404. all previous path does not match
    ],
    scrollBehavior(to, from, savedPosition) {
        // if is a hash, scroll to corresponding element id
        if (to.hash) {
            let ele = document.querySelector(to.hash)
            if (ele) {
                ele.scrollIntoView({behavior: "smooth"})
            } else {
                document.querySelector("#app")?.scrollTo(0, 0)
            }
        }

    }
})


createApp(App)
    .mount('#app')
