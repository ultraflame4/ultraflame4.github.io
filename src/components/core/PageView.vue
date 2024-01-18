<template>
    <div id="route-transition" :data-active="isTransitioning" />
    <Component :is="props.component"/>
</template>
<script setup lang="ts">
import {timeout} from "@/utils";
import {useRouter} from "vue-router";
import {ref, watch} from "vue";

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
    await timeout(200)

    return true;
})

watch(props, async (value, oldValue) => {
    isTransitioning.value=false;
}, {
    flush: "post"
})

</script>
<style scoped lang="scss">

@keyframes route_transition_enter {
    0%{
        display: flex;
        backdrop-filter: blur(0px) saturate(1);

    }
    50%{
        backdrop-filter: blur(100px) saturate(0);

    }

    100%{
        background: var(--bg-0);
    }
}

@keyframes route_transition_exit {
    0%{
        display: flex;
        backdrop-filter: blur(100px) saturate(0);
        background: var(--bg-0);

    }
    100%{
        display: flex;
        background: initial;
        backdrop-filter: blur(0px) saturate(1);
    }
}

#route-transition{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 200;
    background: transparent;
    pointer-events: none;
    display: none;
    animation: route_transition_exit .2s linear 1;
    backdrop-filter: blur(100px) saturate(0);
}
#route-transition[data-active="true"]{
    display: flex;
    pointer-events: all;
    animation: route_transition_enter .2s linear 1;
}
</style>