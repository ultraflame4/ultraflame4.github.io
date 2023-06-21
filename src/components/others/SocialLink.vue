<template>
    <NavLink :to="props.src" newtab>
        <slot></slot>
        <template v-slot:suffix>
            <Icon :icon="props.icon" class="icon"/>
        </template>
    </NavLink>
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

    overflow: visible;

    .icon {
        font-size: 1.75em;
        margin-left: 0.1rem;
        margin-bottom: 0.05rem;
    }

    &:hover > .icon {

        color: var(--accent);
    }

    div {
        display: flex;
        align-items: center;
    }

}

</style>
