<template>
    <div @mousedown.prevent="active = true" :data-axis="props.axis" :data-active="active">

    </div>
</template>
<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { onMounted, ref, watch, watchEffect } from 'vue';

const props = defineProps<{
    axis: "x" | "y"
}>()


const active = ref(false)



const emits = defineEmits<{
    resize: [x_delta: number, y_delta: number]
    reset: []
}>()


useEventListener('mousemove', (e) => {
    if (!active.value) return
    emits("resize", e.movementX, e.movementY)

})
useEventListener('mouseup', (e) => {
    active.value = false
})

useEventListener('blur', (e) => {
    active.value = false
})

watchEffect(() => {
    if (!active.value) {
        emits("reset")
    }
})




</script>
<style scoped lang="scss">
div[data-axis="x"] {
    cursor: ew-resize;
    transform: scaleX(400%);

    &::after {
        transform: scaleX(calc(1 / 4));
    }
}

div[data-axis="y"] {
    cursor: ns-resize;
    transform: scaleY(400%);

    &::after {
        transform: scaleY(calc(1 / 4));
    }
}

div {
    position: relative;
}

div::after {
    content: " ";

    position: absolute;
    left: -2px;
    top: 0;
    right: -2px;
    bottom: 0;
}

div:hover::after,
div[data-active="true"]::after {
    background: white;
    opacity: 0.2;
}
</style>