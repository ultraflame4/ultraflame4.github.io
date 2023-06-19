<template>
    <div>
        <h1>Index</h1>
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
        font-size: calc(1.25em - (var(--level) * 5%));
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
