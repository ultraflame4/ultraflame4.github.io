
<template>
    <div ref="target" :style="style">
        <slot></slot>
    </div>

</template>
<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { useElementBounding, useIntersectionObserver, useWindowSize } from '@vueuse/core';
import { ref, shallowRef, useTemplateRef, type CSSProperties } from 'vue';

const target = useTemplateRef('target')
const box = useElementBounding(target)
const winsize = useWindowSize()
const ratio = computed(() => Math.min(1, Math.max(1 - box.y.value / winsize.height.value)))
const style = computed<CSSProperties>(() => ({"--ratio": ratio.value}))
</script>
<style></style>