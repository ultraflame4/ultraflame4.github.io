<template>

    <a v-if="props.to?.startsWith('http')" :href="props.to" class="no-hover no-deco" :target="newtab?'_blank':undefined">
        <Icon v-if="!noicon" icon="vaadin:hash"  class="icon"/>
        <slot name="prefix"></slot>
        <div :class="`parent_hover-underline ${noicon?'':'add-align'}`">
            <slot>

            </slot>
        </div>
        <slot name="suffix"></slot>
    </a>
    <RouterLink v-else :to="fullpath.fullPath" class="no-hover no-deco" :target="newtab?'_blank':undefined">
        <Icon v-if="!noicon" icon="vaadin:hash" class="icon"/>
        <div :class="`parent_hover-underline ${noicon?'':'add-align'}`">
            <slot>

            </slot>
        </div>
    </RouterLink>

</template>

<script lang="ts" setup>

import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";
import {PageNavTree} from "@/router/page_navtree";

const router = useRouter()

interface iprops {
    /**
     * The path or name to the new location. Can include hash if absolute url
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
    noicon?: boolean,
    /**
     * Specifies the name to use and display
     */
    name?:string
    /**
     * Opens the url in a new tab
     */
    newtab?:boolean
}

const props = defineProps<iprops>()
const fullpath = router.resolve(`${props.to ?? router.currentRoute.value.path}#${props.hash?.replace("#", "") ?? ''}`)

// console.log(fullpath, props)

if (props.heading !== undefined) {
    PageNavTree.add({
        to: fullpath,
        level: props.heading,
        name: props.name ?? props.to ?? props.hash ?? "unnamed"
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
    height: 1.5rem;
    width: fit-content;
    overflow: visible;
    color: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;

    div{
        //display: flex;
        //align-items: center;
    }
}

a:hover {
    color: var(--txt-a);
}


.icon {
    color: var(--accent);
    height: 100%;
    position: relative;
    top: 0.05rem;
    margin-right: 0.35em;
}

</style>
