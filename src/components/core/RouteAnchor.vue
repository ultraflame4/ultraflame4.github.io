<template>
    <a :href="to" :data-active="active || undefined" @click.prevent="on_click">
        <slot></slot>
    </a>
</template>

<script lang="ts" setup>
import { type AnchorHTMLAttributes, onMounted, ref } from 'vue';

export interface RouteAnchorProps extends /* @vue-ignore */ AnchorHTMLAttributes {
    to: string
}

const active = ref(false)

const props = defineProps<RouteAnchorProps>()
const emits = defineEmits(["click"]);

// Applies data-active attribute when location is active

function check_active() {
    if (props.to.startsWith("#")) {
        active.value = props.to == location.hash
        return
    }
    let full = props.to
    if (full.startsWith("?")) {
        full = location.pathname + full
    }
    active.value = full == location.pathname + location.search + location.hash
}

onMounted(() => {
    
    document.addEventListener("pathchanged", check_active)

    return () => {
        document.removeEventListener("pathchanged", check_active)
    }

})


function on_click(e: MouseEvent) {
    if ((e.currentTarget as HTMLAnchorElement).dataset["hijacked"]) {
        return
    }
    window.history.replaceState(null, '', props.to)
    if (location.hash.length > 0) {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" })
    }
    emits('click')
}
// useEventListener("locat")

</script>
<style></style>