<template>
    <a :href="value.url" :style="{
                        '--color': value.fillColor ?? 'var(--accent-color)',
                        '--fill-text-color': value.filledTextColor ?? 'white'
                    }"
       target="_blank"
       :data-filled="value.filled">
        {{ value.name }}
    </a>
    <Icon :icon="value.icon ?? 'eva:external-link-fill'" class="search-icon" />
</template>
<script setup lang="ts">
import {Icon} from "@iconify/vue";
import type {proj_entry_link} from "@/assets/projects";
import {inject} from "vue";

const value = inject("link") as proj_entry_link

</script>
<style scoped lang="scss">
.search-icon{
    font-size: 1.1em;
    color: var(--accent);
}

:has(>.search-icon):hover>.search-icon{
    color: white;
}


a::after{
    display: none;
}
</style>