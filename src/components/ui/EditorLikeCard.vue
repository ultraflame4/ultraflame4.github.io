<template>
    <div class="ctn w-full h-full" ref="target" :style="css_vars">
        <div class="titlebar flex justify-center items-center col-span-2 bg-background">
            <h1 class="font-bold font-fancy">{{ title }}</h1>
        </div>
        <button
            class="bg-background hover:bg-danger flex items-center justify-center text-2xl text-accent hover:text-crust active:bg-primary">
            <Icon icon="material-symbols-light:close" class="text-inherit" />
        </button>
        <div class="col-span-3 flex">
            <div v-if="props.sidebar" class="min-w-32 transition-none flex flex-col  bg-background" ref="sidebar"
                :style="sidebar_style">

                <slot name="sidebar"></slot>

            </div>
            <ResizeHandle v-if="props.sidebar" axis="x" class="w-[1px] h-full" @resize="(x, y) => sidebar_size += x"
                @reset="sidebar_clamp_size()" />
            <div class="content p-2 bg-background h-full grow">
                <slot></slot>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { useMouseInElement } from '@vueuse/core';
import { computed, ref, shallowRef, useTemplateRef, type CSSProperties } from 'vue';
import { Icon } from "@iconify/vue";
import ResizeHandle from '../core/ResizeHandle.vue';

const props = defineProps<{ title: string, sidebar?: boolean }>()
const target = useTemplateRef('target')
const mouse = useMouseInElement(target)

const sidebar = useTemplateRef("sidebar")
const sidebar_max = computed(() => sidebar.value?.parentElement?.getBoundingClientRect().width)
const sidebar_size = ref<number>(64)
const sidebar_style = computed<CSSProperties>(() => ({
    width: `min(max(${sidebar_size.value}px, 64px), 95vw)`
}))

function sidebar_clamp_size() {
    sidebar_size.value = Math.min(Math.max(sidebar_size.value, 64), sidebar_size.value ?? 0)
}



const css_vars = computed<CSSProperties>(() => ({
    "--x-percent": `${Math.round(mouse.elementX.value / mouse.elementWidth.value * 100)}%`,
    "--y-percent": `${Math.round(mouse.elementY.value / mouse.elementHeight.value * 100)}%`,
}))

</script>
<style scoped>
.ctn {
    position: relative;
    display: grid;
    grid-template-columns: calc(var(--spacing) * 9) auto calc(var(--spacing) * 9);
    grid-template-rows: calc(var(--spacing) * 9) auto;
    gap: 1px;
    padding: 1px;

    background: radial-gradient(circle at var(--x-percent) var(--y-percent), var(--color-accent), var(--color-border) 20%);
}


ul>li[data-active="true"] {
    background: var(--color-highlight);
}
</style>