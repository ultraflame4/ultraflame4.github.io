<template>
    <a :href="to" :data-active="active" @click.prevent="on_click">
        <slot></slot>
    </a>
</template>

<script lang="ts" setup>
import { type AnchorHTMLAttributes, onMounted, ref } from 'vue';

export interface RouteAnchorProps extends /* @vue-ignore */ AnchorHTMLAttributes {

    to: string
}

const active = ref(false)

onMounted(() => {
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


function on_click(e: MouseEvent) {
    if ((e.currentTarget as HTMLAnchorElement).dataset["hijacked"]) {
        return
    }
    window.history.replaceState(null, '', props.to)
    if (location.hash.length > 0) {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" })
    }
}
// useEventListener("locat")

</script>
<style></style>