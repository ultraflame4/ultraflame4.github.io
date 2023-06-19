<template>
    <div>
        <h1>This</h1>
        <ul id="thispage-list">
            <li v-for="link in PageNavTree.links.value" :style="`--level:${link.level}`">
                <NavLink :hash="router.resolve(link.to).hash">{{link.name}}</NavLink>
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

</script>

<style lang="scss" scoped>
div{
    padding: 0.5em 1rem;

}
h1{
    font-family: "Poppins";
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    font-size: 2.25rem;
    margin-left: 0;
    margin-right: 0;
}
ul#thispage-list{
    list-style-type: none;
    padding-left: 0;
    --level:0;
    --line-thick: 1px;
    min-height: fit-content;
    max-height: 25vh;
    overflow: auto;
    & > li{
        font-size: calc(1.25em - (var(--level) * 10%));
        margin-left: calc(var(--level) * 0.2rem);
        padding-left: calc(var(--level) * 0.3rem);
        height: 2em;
        border-left: min(var(--line-thick), calc( var(--level) * var(--line-thick))) solid var(--bg-2);
    }
}

ul{
    width: 100%;
}
</style>
