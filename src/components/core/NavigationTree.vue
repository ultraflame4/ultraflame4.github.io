<template>
    <div>
        <h1 style="margin: 0">Sitemap</h1>
        <hr/>
        <h1>Index</h1>
        <ul id="index-pages">
            <li v-for="link in router.options.routes" :key="link">

                <NavLink v-if="router.currentRoute.value.name==link.name" :to="link.path" icon="mdi:gift-open">{{ link.name }}</NavLink>
                <NavLink v-else="router.currentRoute.value.name==link.name" :to="link.path" icon="mdi:gift-outline">{{ link.name }}</NavLink>
            </li>
        </ul>

        <hr/>

        <h1>Here</h1>
        <ul id="page-index">
            <li v-for="link in PageNavTree.links.value" :style="`--level:${link.level}`" :data-ischild="link.level>1" :key="link">
                <NavLink :hash="router.resolve(link.to).hash"
                         :noicon="link.level>1">
                    {{ shortenName(link.name, 32) }}
                </NavLink>
            </li>
        </ul>
        <br/>
        <hr/>
        <h1>Others</h1>
        <ul>
            <li>
                <NavLink to="https://ultraflame4.github.io/SiteVersionPicker">Version Picker</NavLink>
            </li>
        </ul>
        <hr/>
        <SocialLinks/>

    </div>
</template>

<script lang="ts" setup>

import {PageNavTree} from "@/router/page_navtree";
import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";
import NavLink from "@/components/core/NavLink.vue";
import SocialLinks from "@/components/content/SocialLinks.vue";

const router = useRouter()

function shortenName(name: string, maxChars: number) {
    if (maxChars < 3) {
        return "..."
    }
    if (name.length > maxChars) {
        return name.slice(0, maxChars - 3) + "..."
    }
    return name
}

</script>

<style lang="scss" scoped>
div {
    padding: 1.25rem 1rem 0.25rem;
    display: flex;
    flex-direction: column;
    font-size: 0.95rem;
    & > *{
        flex-shrink: 0;
    }
}

h1 {
    font-family: "Poppins";
    letter-spacing: 0.1rem;
    font-size: 1.5em;
    text-transform: uppercase;
    margin: 0 0 0.25em;
}

hr {
    margin: 1rem 0;
}

ul {
    list-style-type: none;
    padding-left: 0;
    --level: 0;
    --line-thick: 1px;
    flex-shrink: 0;
    overflow: auto;
    margin: 0;
    width: 100%;

    & > li {

        font-size: 1.1em;
        margin-left: calc(var(--level) * 0.2rem);
        padding-left: calc(var(--level) * 0.3rem);
        height: 2em;
        border-left: min(var(--line-thick), calc(var(--level) * var(--line-thick))) solid var(--bg-2);

        &[data-ischild="true"] {
            font-size: 0.9em;
            color: var(--txt-a-tinted);

            a {
                width: 100%;
                overflow: hidden;
                letter-spacing: 1px;
                font-weight: 700;
                text-transform: none;
            }

        }
    }
}

#page-index {
    height: fit-content;
    flex-grow: 1;
    margin-top: auto;
    flex-shrink: 1;
}

</style>
