<template>
    <div>
        <div id="items" :style="`--delay:${props.delay??0}ms;--speed:${props.speed??15000}ms;`">
            <slot></slot>
        </div>
        <div id="overlay">

        </div>
    </div>
</template>

<script lang="ts" setup>
interface props{
    /**
     * Delay of the animation in ms
     */
    delay?:number
    /**
     * Speed of the animation in ms
     */
    speed?:number
}
const props = defineProps<props>()
</script>

<style lang="scss" scoped>

*:has(#overlay) {
    position: relative;
}
#overlay {
    --color: var(--bg-0);

    background-image: linear-gradient(0deg, var(--color) 2%, transparent 25%, transparent 75%, var(--color) 98%)
;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#items{
    height: fit-content;
    transform: translateY(4rem);
    animation: scroll-anim var(--speed) infinite cubic-bezier(0.25, 0, 0.75, 1);
    animation-delay: var(--delay);
    opacity: 0.75;
}
@keyframes scroll-anim {
    0% {
        transform: translateY(4rem);
    }
    50% {
        transform: translateY(-75%);
    }
    100%{
        transform: translateY(4rem);
    }
}

</style>
