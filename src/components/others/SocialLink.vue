<template>
    <NavLink :to="props.src">
        <slot></slot>
    </NavLink>
<!--    <a :href="props.src" target="_blank" class="no-deco">-->
<!--        <slot></slot>-->
<!--        <Icon :icon="props.icon" class="icon"/>-->
<!--    </a>-->

</template>
<script setup lang="ts">
import {Icon} from "@iconify/vue";
import NavLink from "@/components/core/NavLink.vue";

const props = defineProps<{ src: string, icon: string, }>()
</script>


<style scoped lang="scss">
a {
    display: flex;
    align-items: center;
    font-size: 1em;
    font-weight: 800;
    letter-spacing: 0.1rem;
    width: fit-content;
    gap: 0.2rem;
    transition-duration: 1s;
    .icon{
        font-size: 1.25em;
    }
    &:hover > .icon {

        color: var(--accent);
    }

}

</style>
