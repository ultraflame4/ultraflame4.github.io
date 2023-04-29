<template>
    <div>
        <h1>This Page</h1>
        <ul id="thispage-list">
            <li v-for="link in PageNavTree.links.value">
                <Icon icon="vaadin:hash" :inline="true" class="icon"/>
                <RouterLink :to="link.to" class="parent_hover-underline no-hover">{{link.name}}</RouterLink>

            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

import {PageNavTree} from "@/router/page_navtree";
import {Icon} from "@iconify/vue";
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

        .icon{
            color: var(--accent);
        }

        a{
            font-family: "Poppins";
            --underline-mult: 1;
            font-weight: 700;
            letter-spacing: 0.05rem;
            text-transform: uppercase;
            text-decoration: none;
        }
    }
}
</style>
