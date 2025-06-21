<template>
    <SpotlightBackground class="ctn w-full h-full">

        <div class="titlebar col-span-4 bg-background grid grid-cols-subgrid">
            <!-- filler -->
            <div class="col-span-2"></div>
            <!-- title -->
            <h1 class="font-bold font-fancy flex justify-center items-center">{{ title }}</h1>
        </div>
        <button
            class="bg-background hover:bg-danger flex items-center justify-center text-2xl text-accent hover:text-crust active:bg-primary">
            <Icon icon="material-symbols-light:close" class="text-inherit" />
        </button>
        <div class="col-span-full min-h-full min-w-0">
            <slot></slot>
            <!-- <div v-if="props.sidebar" class="min-w-[150px] transition-none flex flex-col bg-background mobile-collapse"
                ref="sidebar" :style="sidebar_style">

                <slot name="sidebar"></slot>

            </div>
            <ResizeHandle v-if="props.sidebar" axis="x" class="w-[2px] h-full mobile-collapse"
                @resize="(x, y) => sidebar_size += x" @reset="sidebar_clamp_size()" />
            <div class="content p-2 bg-background h-full grow" :data-disable-scroll="!!props.disable_editor_scroll">
                <slot></slot>
            </div> -->
        </div>

    </SpotlightBackground>
</template>
<script lang="ts" setup>
import { useMouseInElement } from '@vueuse/core';
import { computed, ref, shallowRef, useTemplateRef, type CSSProperties } from 'vue';
import { Icon } from "@iconify/vue";
import ResizeHandle from '../core/ResizeHandle.vue';
import SpotlightBackground from '../effects/SpotlightBackground.vue';

const props = defineProps<{ title: string }>()


</script>
<style scoped>
.ctn {
    position: relative;
    display: grid;
    --side-cols: repeat(2, calc(var(--spacing) * 9));
    grid-template-columns: var(--side-cols) auto var(--side-cols);
    grid-template-rows: calc(var(--spacing) * 9) auto;
    gap: 2px;
    padding: 1px;
}


ul>li[data-active="true"] {
    background: var(--color-highlight);
}

[data-disable-scroll="true"] {
    @apply overflow-hidden;
}

[data-disable-scroll="false"] {
    @apply overflow-auto;
}
</style>