<template>
    <RouterLink :to="fullpath.fullPath"  class="no-hover no-deco">
        <Icon v-if="!noicon" icon="vaadin:hash" :inline="true" class="icon"/>
        <div class="parent_hover-underline">
            <slot>

            </slot>
        </div>
    </RouterLink>

</template>

<script lang="ts" setup>

import {Icon} from "@iconify/vue";
import {type RouteLocationRaw, useRouter} from "vue-router";
import {PageNavTree} from "@/router/page_navtree";
import path from "path";

const router = useRouter()

interface iprops {
    /**
     * The path or name to the new location
     */
    to?: string
    /**
     * Any Hash if need to scroll to id. (With or without '#' works)
     */
    hash?: string
    /**
     * Indicates that this hashlink is a heading, this would add it to the current page navigation tree.
     */
    heading?: number,
    noicon?: boolean
}

const props = defineProps<iprops>()
const fullpath = router.resolve(`${props.to ?? router.currentRoute.value.path}#${props.hash?.replace("#", "") ?? ''}`)

console.log(fullpath, props)

if (props.heading !== undefined) {
    PageNavTree.add({
        to: fullpath,
        level: props.heading,
        name: props.to ?? props.hash ?? "unnamed"
    })
}


</script>

<style lang="scss" scoped>
a {
    letter-spacing: 0.1rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    cursor: pointer;
    height: calc(1em + 1rem);
    width: fit-content;
    overflow: visible;
    color: inherit;
}

a:hover {
    color: var(--txt-a);
}


.icon {
    color: var(--accent);
    height: 100%;
    position: relative;
    top: 0.05rem;
}

</style>
