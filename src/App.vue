<template>
    <div id="site-back">
        <NavigationTree id="navtree"/>
    </div>

    <div id="site-ctn" :data-open="menuOpen" @click.capture="returnToPage()" ref="" class="scrollable">
        <TopNav :menu-open="menuOpen" @menuToggle="menuToggle()"/>
        <div id="page-content">
            <RouterView />
        </div>
        <hr/>
       <Footer/>
    </div>
    <div id="route-transition" :data-active="isTransitioning" />

</template>
<script setup lang="ts">
import TopNav from "@/components/page/TopNav.vue";
import {ref} from "vue";
import NavigationTree from "@/components/core/NavigationTree.vue";
import Footer from "@/components/page/Footer.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const menuOpen = ref(false);
const isClosing = ref(false);
const isTransitioning = ref(false);

router.beforeEach((to, from) =>{
    if (to.path == from.path) return;
    if (isTransitioning.value) return true;
    isTransitioning.value= true;
    setTimeout(()=>{router.push(to)}, 100)
    return false;
})

router.afterEach((to, from) => {
    setTimeout(()=>{isTransitioning.value= false}, 300)
})

function returnToPage() {
    if (menuOpen.value) {
        menuOpen.value = false
        isClosing.value = true
        setTimeout(() => {
            isClosing.value = false
        }, 0) // clean up
    }
}

function menuToggle() {
    // no need to deal with closing of menu because it will be closed by the returnToPage function
    menuOpen.value = !isClosing.value
}


</script>

<style lang="scss" scoped>
:global(:root){
    --navtree-width: min(50vw, 24rem);
}

@keyframes route_transition {
    0%{
        display: flex;
        backdrop-filter: blur(0px) saturate(1);

    }
    20%{
        backdrop-filter: blur(100px) saturate(0);

    }
    75%{
        background: var(--bg-0);
    }
    100%{
        backdrop-filter: blur(0px) saturate(1);
        background: initial;
    }
}

#route-transition{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: transparent;
    pointer-events: none;
    display: none;
}
#route-transition[data-active="true"]{
    display: flex;
    pointer-events: all;
    animation: route_transition .4s linear 1;

}
#site-back {
    display: flex;
}

#navtree {
    margin-top: 1rem;
    margin-left: auto;
    width: var(--navtree-width);
    padding-left: 1.5rem;

}

#site-back {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: var(--bg-0-5);

}

#site-ctn {
    position: fixed;
    z-index: 1;
    margin: 0;
    transition: all 500ms ease;
    border: 2px solid transparent;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background: var(--bg-0);

}

#site-ctn[data-open="true"] {
    border-color: var(--bg-2);
    filter: drop-shadow(3px 3px 1rem var(--bg-0));
    border-radius: 1rem;

    margin-left: 0;
    transform: translateX(calc(0px - var(--navtree-width))) translateY(2rem);



}

#site-ctn::-webkit-scrollbar-track {
    margin-top: 1rem;
}

#page-content {
    padding-top: 1rem;
}

</style>
