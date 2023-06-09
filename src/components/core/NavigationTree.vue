<template>
    <div>
        <h1>This Page</h1>
        <ul id="thispage-list">
            <li v-for="link in PageNavTree.links.value">
                <HashLink :to="$router.resolve(link.to).fullPath">{{link.name}}</HashLink>


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
    padding: 0.5em 1rem;
    padding-left: 0;
}
h1{
    font-family: "Poppins";
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    font-size: 2.25rem;
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
