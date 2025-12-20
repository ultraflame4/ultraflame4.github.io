<template>
    <div ref="target" :style="style" :class="all_class">
        <slot></slot>
    </div>

</template>
<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { useElementBounding, useIntersectionObserver, useWindowSize } from '@vueuse/core';
import { ref, shallowRef, useTemplateRef, type CSSProperties } from 'vue';

const props = defineProps<{
    rely?: number,
    /**Once ratio is beyond this number, adds a `ratio-t` class */
    threshold?: number,
    class?: string
}>()

const all_class = computed(() => {

    if (props.threshold != undefined) {
        if (ratio.value > props.threshold) return (props.class ?? "") + " ratio-t"
    }

    return props.class
})

const target = useTemplateRef('target')
const box = useElementBounding(target)
const winsize = useWindowSize()
const ratio = computed(() => Math.min(1, Math.max(1 - (box.y.value + (props.rely ?? 0)) / winsize.height.value)))
const style = computed<CSSProperties>(() => ({ "--ratio": ratio.value }))
</script>
<style></style>