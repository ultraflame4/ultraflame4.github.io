<template>


    <header v-stuck>
        <div class="header-left floater-shadow header-item">
            <h1>ultr42</h1>
            <ul class="topnav-quick">
                <Icon icon="vaadin:hash" class="search-icon"/>
                <template v-for="link in PageNavTree.links.value">
                    <li v-if="link.level<1">
                        <RouterLink :to="link.to" class="parent_hover-underline no-hover no-deco">{{ link.name }}
                        </RouterLink>
                    </li>
                </template>
            </ul>
        </div>
        <div class="header-center"></div>

        <ul class="floater-shadow header-item" id="index-pages">
            <template v-for="link in router.options.routes">
                <li>
                    <RouterLink :to="link.path"
                                class="no-deco"
                                active-class="active">
                        {{ link.name }}
                    </RouterLink>
                </li>

            </template>
        </ul>
        <div class="header-right floater-shadow  header-item">
            <Tooltip>
                <template v-slot:trigger="props">
                    <button @click="emit('scroll-top')" class="scroll-top reset-btn" v-bind="props">
                        <Icon icon="tabler:transition-top-filled"/>
                    </button>
                </template>
                <template v-slot:content>
                    Scroll to the top
                </template>
            </Tooltip>

            <Tooltip>
                <template v-slot:trigger="props">
                    <button @click="emit('menuToggle')" :data-open="menuOpen" class="menu-btn reset-btn" v-bind="props">
                        <Icon icon="svg-spinners:blocks-shuffle-3"/>
                    </button>
                </template>
                <template v-slot:content>
                    Open navigation menu
                </template>
            </Tooltip>
        </div>

    </header>

</template>

<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {PageNavTree} from "@/router/page_navtree";
import {useRouter} from "vue-router";
import Tooltip from "@/components/core/Tooltip.vue";

const router = useRouter()

const emit = defineEmits<{
    (e: 'menuToggle'): void,
    (e: 'scroll-top'): void,
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
    height: 2.9rem;
    transition: all 500ms ease, padding 500ms ease;
    display: flex;
    align-items: center;
    position: sticky;
    top: -1px;
    z-index: 1000;
    background: transparent;
    font-size: 1.25rem;
    pointer-events: none;
    gap: 0.5rem;

    @media only screen and (max-width: 650px) {
        font-size: 2rem;
        height: 3.5rem;
    }

    & > * {
        margin: 0;
        pointer-events: auto;
    }

    &[stuck] {
        font-size: 0.95rem;
        @media only screen and (max-width: 650px) {
            font-size: 1.5rem;
        }

        & .header-item {
            //background: var(--bg-1);
            border-color: var(--accent);
        }

    }
}

.header-center {
    margin-left: auto;
    margin-right: auto;
}

.header-item {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: transparent;
    box-sizing: border-box;
    border: 2px solid transparent;
    padding: 0 0.9rem;
    @media only screen and (max-width: 650px) {
        padding: 0.5rem 1.25rem;
    }
    transition: border 500ms ease, transform 500ms ease;
    border-radius: 0.9rem;

    & > h1 {
        font-family: "Poppins";
        font-weight: 700;
        font-size: 1em;
        letter-spacing: 0.1rem;
        margin: 0 0.25rem 0 0.5rem;
        @media only screen and (max-width: 1000px) {
            margin: 0 auto;
        }
    }
}

.header-item ul, ul.header-item {
    gap: 0.5em;
    display: flex;
    align-items: center;

    list-style-type: none;

    & li {
        font-size: 0.9em;
        display: flex;
        align-items: center;

        &:has(.parent_hover-underline) {
            position: relative;
            bottom: 1px;

            [stuck] & {
                bottom: 0;
                top: 1px; // Alignment
            }

            & > a {
                --underline-mult: 1.1;
                letter-spacing: 0.075rem;
                font-weight: 600;
                font-family: "Poppins";
                text-transform: uppercase;
            }

            &:hover > a {
                color: #fff;
            }
        }

    }

}

.header-left {
    [data-open="true"] & { // This css makes sure the logo stays on screen when in mobile mode (screen <1000)
        position: relative;
        transform: translateX(var(--navtree-width));
    }

    h1 {
        font-size: 1.1em;
    }

    & li > a:not(:hover) {
        color: var(--txt-a-tinted);
    }

    & > * {
        margin: 0;
    }
}

.header-right {
    padding: 0;

    button {
        height: 100%;
        aspect-ratio: 1;
        color: white;
        font-size: 1.5em;
    }

    button:hover, .menu-btn[data-open="true"] {
        color: var(--accent);
    }

    button:active {
        transition: transform 100ms ease;
        transform: scale(0.8);
    }

    .scroll-top {
        position: relative;
        pointer-events: none;
        min-width: 0;
        max-width: 0;
        opacity: 0;
        transition: max-width 800ms ease, opacity 500ms ease;

        [stuck] & {
            pointer-events: auto;
            opacity: 1;
            max-width: 5rem;
        }
    }

}

.topnav-quick {
    padding: 0;
    margin-left: 0.5rem;

    height: 100%;


    & > .search-icon {
        font-weight: 600;
        font-size: 1rem;
        color: var(--accent);
    }


    @media only screen and (max-width: 1000px) {
        display: none;
    }
}

#index-pages {
    @media only screen and (max-width: 1000px) {
        display: none;
    }


    gap: 1.25rem;
    padding-left: 1rem;
    padding-right: 1rem;

    & li {
        overflow: visible;
    }

    & li > a {

        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        letter-spacing: 0.075rem;
        transition: font-size 100ms linear, font-weight 100ms linear, background-position 300ms ease;

        [stuck] & {
            font-weight: 700;
        }

        &.active {

            color: var(--active-color);
            position: relative;

            font-weight: 800;
            font-size: 1.1em;
        }
    }

}


</style>

