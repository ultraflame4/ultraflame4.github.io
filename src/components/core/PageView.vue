<template>
    <Component :is="props.component"/>
    <div id="route-transition" :data-active="isTransitioning" />
</template>
<script setup lang="ts">
import {timeout} from "@/utils";
import {useRouter} from "vue-router";
import {ref} from "vue";

interface iprops{
    component: Object
}
const props = defineProps<iprops>()
const router = useRouter();
const isTransitioning = ref(false);
router.beforeEach(async (to, from) =>{
    if (to.path == from.path) return;
    if (isTransitioning.value) return true;
    isTransitioning.value= true;
    await timeout(100)

    return true;
})

router.afterEach((to, from) => {
    setTimeout(()=>{isTransitioning.value= false}, 300)
})

</script>
<style scoped lang="scss">

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
    top: 0;
    left: 0;
    z-index: 1;
    background: transparent;
    pointer-events: none;
    display: none;
    //backdrop-filter: blur(100px) saturate(0);
}
#route-transition[data-active="true"]{
    display: flex;
    pointer-events: all;
    animation: route_transition .4s linear 1;

}
</style>