<template>
    <div>
        <h1>Index</h1>
        <ul id="thispage-list">
            <li v-for="link in PageNavTree.links.value" :style="`--level:${link.level}`" :data-ischild="link.level>1">
                <NavLink :hash="router.resolve(link.to).hash" :noicon="link.level>1">{{shortenName(link.name,25)}}</NavLink>
            </li>
        </ul>
        <hr/>
        <h1>Pages</h1>
        <ul id="thispage-list">
            <li v-for="link in router.options.routes">
                <NavLink :to="link.path">{{link.name}}</NavLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

import {PageNavTree} from "@/router/page_navtree";
import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";
import NavLink from "@/components/core/NavLink.vue";

const router = useRouter()

function shortenName(name: string, maxChars: number) {
    if (maxChars < 3) {
        return "..."
    }
    if (name.length > maxChars) {
        return name.slice(0, maxChars-3) + "..."
    }
    return name
}

</script>

<style lang="scss" scoped>
div{
    padding: 1.25rem 1rem 0.5rem;

}
h1{
    font-family: "Poppins";
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    margin: 0;
}
hr{
    margin: 1rem 0;
}
ul#thispage-list{
    list-style-type: none;
    padding-left: 0;
    --level:0;
    --line-thick: 1px;
    min-height: fit-content;
    max-height: 35vh;
    overflow: auto;
    margin: 0;
    & > li{

        font-size:1.25rem;
        margin-left: calc(var(--level) * 0.2rem);
        padding-left: calc(var(--level) * 0.3rem);
        height: 2em;
        border-left: min(var(--line-thick), calc( var(--level) * var(--line-thick))) solid var(--bg-2);
        &[data-ischild="true"]{
            font-size: 0.9em;
            color: var(--txt-a-tinted);
            a{
                width: 100%;
                overflow: hidden;
                letter-spacing: 1px;
                font-weight: 700;
                text-transform: none;
            }

        }
    }
}

ul{
    width: 100%;
}
</style>
