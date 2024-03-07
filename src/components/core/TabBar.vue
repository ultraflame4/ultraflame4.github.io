<template>
    <div class="tabbar-ctn">
        <ul :style="list_style" class="no-vmar" ref="el_grid">
            <li v-for="(i, index) in props.items" :data-active="active_index == index">

                <button @click="model_activeitem=i.text" class="reset-btn">
                    <Icon v-if="i.icon" :icon="i.icon" class="icon"/>
                    <span>{{ i.text }}</span>
                </button>
            </li>
        </ul>
        <div class="selector" :style="selector_style"/>

    </div>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import {Icon} from "@iconify/vue";

export type TabItem = { icon?: string, text: string }

interface iprops {
    items: (TabItem)[]
}

const props = defineProps<iprops>()
const model_activeitem = defineModel<string>("value")
const el_grid = ref<HTMLElement | null>(null)
const list_style = computed(() => ({
    "--col-count": props.items.length
}))
const active_index = computed(() => Math.max(props.items.findIndex(x => x.text === model_activeitem.value ?? ""), 0))


const selector_style = computed(() => {
    let x = "0px"
    let w = "0px"
    if (el_grid.value) {
        let item = el_grid.value.children[active_index.value]
        let p = el_grid.value.getBoundingClientRect()
        let c = item.getBoundingClientRect()
        x = c.left - p.left + "px"
        w = c.width + "px"
    }


    return {
        "--x": x,
        "--w": w
    }
})


</script>
<style scoped lang="scss">
.tabbar-ctn {
    position: relative;
    padding: .25rem;
    border-radius: .85rem;
    border: 2px solid var(--bg-2);
    margin: 1rem 0;

    & > ul {
        display: grid;
        grid-template-columns: repeat(var(--col-count), auto);
        grid-template-rows: 1fr;
        gap: 0.25rem;
        padding: 0;
        list-style-type: none;
        justify-content: center;
        z-index: 1;

        & > li {
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--bg-3);
            transition: all 100ms linear;

            &[data-active="true"] {
                color: white;
            }

            & > button {
                min-height: fit-content;
                font-size: 1rem;
                line-height: initial;
                color: inherit;
                font-weight: 700;
                font-family: "Poppins";
                text-transform: uppercase;
                width: 100%;
                padding: .25rem .75rem;
                border-radius: .55rem;
                transition: all 100ms linear;
                display: flex;
                align-items: center;

                &>.icon{
                    margin-right: 0.25rem;
                    font-size: 1.25em;
                }

                &:hover {
                    background: var(--overlay);
                }


            }
        }
    }

    .selector {
        border-radius: .55rem;
        top: 0.25rem;
        bottom: 0.25rem;
        position: absolute;

        left: calc(var(--x) + 0.25rem);
        transition: all 200ms ease;
        background: var(--accent);
        width: var(--w);
        z-index: -1;
        pointer-events: none;
    }
}
</style>