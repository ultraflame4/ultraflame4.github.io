<template>
    <a :href="value.url" :style="{
        '--color': value.fillColor ?? 'var(--accent-color)',
        '--fill-text-color': value.filledTextColor ?? 'white',
    }" target="_blank" :data-filled="value.filled">
        <Icon :icon="value.icon ?? 'eva:external-link-fill'" class="icon" />
        <span>{{ value.name }}</span>
        <!-- <div class="bg dots"></div> -->
    </a>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { proj_entry_link } from "@/lib/project_utils";
import { inject } from "vue";

const value = inject("link") as proj_entry_link;
</script>
<style scoped>
.icon {
    font-size: 1.4em;
    margin-right: 0.25em;
    color: var(--accent);
    display: block;
}

a {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid var(--color-panel);
    border-radius: 0.5rem;
    padding: calc(0.3rem + 1px) calc(0.4rem + 1px);
}

span {
    background: inherit;
}


a:hover {
    border-color: white;

    .icon {
        color: black;
    }

}

a::after {
    display: none;
}
</style>