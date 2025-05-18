<template>
    <a :href="to" :data-active="active">
        <slot></slot>
    </a>
</template>
<script lang="ts">
var initiated = false
export function init_route_anchor() {
    if (initiated) return
    console.log("Init Route Anchor!")
    initiated = true

    let prev_path: string | null = null
    const event = new CustomEvent("pathchanged");

    setInterval(() => {
        let current = location.pathname + location.hash
        if (current != prev_path) {
            console.log("Path changed detected:", prev_path, "->", current)
            prev_path = current
            document.dispatchEvent(event)
        }
    }, 200)

}
</script>
<script lang="ts" setup>
import { useEventListener } from '@vueuse/core';
import { type AnchorHTMLAttributes, onMounted, ref } from 'vue';

export interface RouteAnchorProps extends /* @vue-ignore */ AnchorHTMLAttributes {

    to: string
}

const active = ref(false)

onMounted(() => {
    init_route_anchor();
    const listener = () => {
        let x = props.to;
        if (x.startsWith("#")) {
            x = location.pathname + x
        }
        active.value = x == location.pathname + location.hash
    }
    document.addEventListener("pathchanged", listener)

    return () => {
        document.removeEventListener("pathchanged", listener)
    }

})

const props = defineProps<RouteAnchorProps>()

// useEventListener("locat")

</script>
<style></style>