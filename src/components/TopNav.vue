<template>


    <header v-stuck>
        <div id="header-left">
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
        </div>
        <button id="menu-btn" @click="emit('menuToggle')" :data-open="menuOpen">
            <Icon icon="ic:baseline-menu"/>
        </button>
    </header>

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

header {

    width: auto;
    padding: 0.75rem 1rem;
    box-sizing: content-box;
    height: 2.75rem;
    transition: all 500ms ease, padding 500ms ease;
    display: flex;
    align-items: center;
    position: sticky;
    top: -1px;
    z-index: 100;
    background: transparent;
    font-size: 1.25rem;
    pointer-events: none;
    & > * {
        margin: 0;
        pointer-events: auto;
    }

    &[stuck] {
        font-size: 0.95rem;

        #header-left {
            background: var(--bg-1);

            border-color: var(--accent);
        }

        #menu-btn {

            background: var(--bg-1);
            border: 2px solid var(--accent);
        }
    }
}

#header-left {
    display: flex;
    height: 100%;
    align-items: center;
    box-sizing: border-box;
    border: 2px solid transparent;
    padding: 0 0.75rem;
    transition: border 500ms ease;
    border-radius: 1rem;

    & > * {
        margin: 0;
    }

    & > h1 {

        font-family: "Poppins";
        font-weight: 700;
        font-size: 1em;
        letter-spacing: 0.1rem;
        margin: 0 0.25rem 0 0.5rem;
        @media only screen and (max-width: 650px) {
            margin: 0 auto;
        }
    }
}

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
        font-size: 0.75em;
        align-items: center;
        position: relative;
        top: 1px; // Alignment
        & > a {
            color: var(--txt-a-tinted);
            --underline-mult: 1;
            letter-spacing: 0.05rem;
            font-weight: 700;
            font-family: "Poppins";
            text-transform: uppercase;

        }

        &:hover > a {
            color: #fff;
        }
    }

    @media only screen and (max-width: 650px) {
        display: none;
    }
}

#menu-btn {
    background: transparent;
    border: 2px solid transparent;
    height: 100%;
    box-sizing: border-box;
    border-radius: 0.75rem;
    aspect-ratio: 1;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    font-size: 1.5em;
    transition: color 200ms ease, transform 100ms linear, border 500ms ease;;
    margin-left: auto;

}

#menu-btn:hover, #menu-btn[data-open="true"] {
    color: var(--accent);
}

#menu-btn:active {
    transform: scale(0.8);
}

</style>

