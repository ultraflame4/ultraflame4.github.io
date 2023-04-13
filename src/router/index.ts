import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (!to.hash) {
      return
    }
    setTimeout(()=>{
      document.querySelector(to.hash)?.scrollIntoView({
        behavior:"smooth",
        block:"center"
      })
    },500)
  }
})

export default router
