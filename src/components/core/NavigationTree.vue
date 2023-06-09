<template>
    <div>
        <h1>This Page</h1>
        <ul id="thispage-list">
            <li v-for="link in PageNavTree.links.value">
                <HashLink :hash="router.resolve(link.to).hash">{{link.name}}</HashLink>
            </li>
        </ul>
        <h1>Sitewide</h1>
        <ul id="thispage-list">
            <li v-for="link in router.options.routes">
                <HashLink :to="link.path">{{link.name}}</HashLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

import {PageNavTree} from "@/router/page_navtree";
import {Icon} from "@iconify/vue";
import HashLink from "@/components/core/HashLink.vue";
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<style lang="scss" scoped>
div{
    padding: 0.5em 2rem;
    padding-left: 0;
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
    & > li{
        font-size: calc(1.45em - (var(--level) * 10%));
        padding-left: calc(var(--level) * 1em);
        height: 2em;

    }
}
</style>
