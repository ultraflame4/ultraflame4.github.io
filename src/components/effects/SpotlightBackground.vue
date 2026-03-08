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
<style>
@property --spotlight-radius {
    syntax: '<percentage>';
    /* Specifies the data type */
    initial-value: 0%;
    /* Sets the starting value */
    inherits: false;
    /* Determines if the value is inherited */
}
</style>
<style scoped>
.ctn {
    --spotlight-radius: 10%;
    background: radial-gradient(circle at var(--x-percent) var(--y-percent), var(--color-accent), var(--color-border) max(var(--spotlight-radius), 3rem));
    transition: --spotlight-radius 200ms ease-out;
}

.ctn:hover {
    --spotlight-radius: 40%;
}
</style>