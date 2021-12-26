import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import App from './App.vue'
import Home from './views/Home/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", name: "Home", component: Home},
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            let ele = document.querySelector(to.hash)
            if (ele) {
                ele.scrollIntoView({behavior: "smooth"})
            } else {
                console.log("D")
                document.querySelector("#app").scrollTo(0, 0)
            }
        }

    }
})


createApp(App)
    .use(router)
    .mount('#app')
