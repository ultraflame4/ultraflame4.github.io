<template>
    <div class="ctn" ref="target" :style="css_vars">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { useMouseInElement } from '@vueuse/core';
import { computed, useTemplateRef, type CSSProperties } from 'vue';

const target = useTemplateRef('target')
const mouse = useMouseInElement(target)


const css_vars = computed<CSSProperties>(() => ({
    "--x-percent": `${Math.round(mouse.elementX.value / mouse.elementWidth.value * 100)}%`,
    "--y-percent": `${Math.round(mouse.elementY.value / mouse.elementHeight.value * 100)}%`,
}))

</script>
<style scoped>
.ctn {
    background: radial-gradient(circle at var(--x-percent) var(--y-percent), var(--color-accent), var(--color-border) 20%);
}

</style>