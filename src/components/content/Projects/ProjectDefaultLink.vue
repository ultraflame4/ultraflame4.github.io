<template>
    <a :href="value.url" :style="{
                        '--color': value.fillColor ?? 'var(--accent-color)',
                        '--fill-text-color': value.filledTextColor ?? 'white'
                    }"
       target="_blank"
       :data-filled="value.filled">
        {{ value.name }}
    </a>
    <Icon :icon="value.icon ?? 'eva:external-link-fill'" class="icon" />
</template>
<script setup lang="ts">
import {Icon} from "@iconify/vue";
import type {proj_entry_link} from "@/assets/projects";
import {inject} from "vue";

const value = inject("link") as proj_entry_link

</script>
<style scoped lang="scss">
.icon{
    font-size: 1.1em;
    color: var(--accent);
}

:has(>.icon):hover>.icon{
    color: white;
}


a::after{
    display: none;
}
</style>