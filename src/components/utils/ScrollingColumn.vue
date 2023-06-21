<template>
    <div>
        <div id="items" :style="`--delay:${props.delay??0}ms;--speed:${props.speed??15000}ms;--start-offset:${offset??0}%;`">
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
    speed?:number,
    offset?: number
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
    pointer-events: none;
}

#items{
    height: fit-content;
    --start-offset: 0%;
    --start-pos: calc(-50% - var(--start-offset));
    --end-pos: calc(0% - var(--start-offset));
    transform: translateY(var(--start-offset));
    animation: scroll-anim var(--speed) infinite linear;
    animation-delay: var(--delay);
    opacity: 0.75;

    &:hover{
        animation-play-state: paused;
    }
}
@keyframes scroll-anim {
    0% {
        transform: translateY(var(--start-pos));
    }
    100% {
        transform: translateY(var(--end-pos));
    }

}

</style>
