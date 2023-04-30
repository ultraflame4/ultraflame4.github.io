<template>

    <div id="header-ctn" v-stuck>
        <header>
            <h1>ultr42</h1>
            <ul id="topnav-quick">
                <Icon icon="vaadin:hash" class="icon"/>
                <template v-for="link in PageNavTree.links.value">
                    <li v-if="link.level<1">
                        <RouterLink :to="link.to" class="parent_hover-underline no-hover no-deco">{{ link.name }}
                        </RouterLink>
                    </li>

                </template>
            </ul>
            <button id="menu-btn" @click="emit('menuToggle')" :data-open="menuOpen">
                <Icon icon="ic:baseline-menu"/>
            </button>
        </header>
    </div>
</template>

<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {type Ref, watch} from "vue";
import {PageNavTree} from "@/router/page_navtree";

const emit = defineEmits<{
    (e: 'menuToggle'): void
}>()

const props = defineProps<{
    menuOpen: boolean
}>()


</script>

<style lang="scss" scoped>

#topnav-quick {
    padding: 0;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    list-style-type: none;
    height: 100%;

    & > .icon {
        font-weight: 600;
        font-size: 1em;
        color: var(--accent);
    }

    & > li {
        display: flex;
        font-size: 0.85rem;

        font-weight: 700;
        height: 100%;
        align-items: center;

        & > a {
            color: var(--txt-a-tinted);
            --underline-mult: 0.75;
            letter-spacing: 0.05rem;
            font-family: "Poppins";
            text-transform: uppercase;
        }
    }

    @media only screen and (max-width: 650px) {
        display: none;
    }
}

#menu-btn {
    background: none;
    border: none;
    color: white;
    height: fit-content;
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 1.3em;
    transition: color 200ms ease, transform 100ms linear;
    margin-left: auto;
    position: absolute;
    right: 1rem;
}

#menu-btn:hover, #menu-btn[data-open="true"] {
    color: var(--accent);
}

#menu-btn:active {
    transform: scale(0.8);
}

#header-ctn {

    position: sticky;

    height: 10rem;

    pointer-events: none;
    font-size: 1.6rem;
    top: -1px;
    z-index: 1000;
}

header {
    height: 100%;
    width: 100%;
    padding: 0 4rem;
    transition: all 200ms ease, padding 500ms ease;
    display: flex;
    align-items: center;
    position: relative;
    pointer-events: all;

    & > h1 {

        transition: all 200ms ease;
        font-family: "Poppins";
        font-weight: 700;
        font-size: 1em;
        letter-spacing: 0.1rem;

        @media only screen and (max-width: 650px) {
            margin: 0 auto;
        }

    }

    & > * {
        margin: 0;
    }
}

#header-ctn[stuck] > header {
    height: 4rem;
    padding-right: 0;
    padding-left: 2rem;

}

#header-ctn[stuck] {
    font-size: 1.25rem;
    background: linear-gradient(180deg, var(--bg-0) 3.5rem, transparent 90%);
}

</style>

