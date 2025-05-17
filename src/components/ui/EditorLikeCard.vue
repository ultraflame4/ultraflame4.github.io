<template>
    <div class="ctn w-full h-full" ref="target" :style="css_vars">
        <div class="titlebar flex justify-center items-center col-span-2 bg-background">
            <h1 class="font-bold font-fancy">{{ title }}</h1>
        </div>
        <button class="bg-background hover:bg-danger flex items-center justify-center text-2xl text-accent hover:text-crust active:bg-primary">
            <Icon icon="material-symbols-light:close" class="text-inherit"/>
        </button>
        <div class="content p-2 col-span-3 bg-background">
            <slot></slot>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { useMouseInElement } from '@vueuse/core';
import { computed, useTemplateRef, type CSSProperties } from 'vue';
import { Icon } from "@iconify/vue";

const props = defineProps<{ title: string }>()
const target = useTemplateRef('target')
const mouse = useMouseInElement(target)

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

    background: radial-gradient(circle at var(--x-percent) var(--y-percent), var(--color-accent) , var(--color-crust) 90%);
}

</style>