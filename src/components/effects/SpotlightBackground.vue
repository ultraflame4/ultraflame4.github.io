<template>
    <!-- The visible optimisation -->
    <div class="ctn" ref="target" :style="css_vars">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { useElementVisibility, useMouseInElement } from '@vueuse/core';
import { computed, ref, useTemplateRef, watch, type CSSProperties } from 'vue';

const target = useTemplateRef('target')
const mouse = useMouseInElement(target)
const visible = useElementVisibility(target)
const css_vars = ref<CSSProperties>({

})
watch([mouse.elementX, mouse.elementY, mouse.elementWidth, mouse.elementHeight], ([x, y, w, h]) => {
    // Skip updating the css variables if not visible
    if (!visible.value) return;
    css_vars.value = {
        "--x-percent": `${Math.round(x / w * 100)}%`,
        "--y-percent": `${Math.round(y / h * 100)}%`,
    }
})

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
    --spotlight-radius: 0%;
    background: radial-gradient(circle at var(--x-percent) var(--y-percent), var(--color-accent), var(--color-border) max(var(--spotlight-radius), 4rem));
    transition: --spotlight-radius 200ms ease-out;
}

.ctn:hover {
    --spotlight-radius: 50%;
    background: radial-gradient(circle at var(--x-percent) var(--y-percent), var(--color-accent), var(--color-border) max(var(--spotlight-radius), 6rem));
}
</style>