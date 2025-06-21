<template>
    <a :href="value.url" target=" _blank" :data-filled="value.filled">
        <Icon :icon="value.icon ?? 'eva:external-link-fill'" class="icon" />
        <span class="font-fancy">{{ value.name }}</span>
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
    background: transparent;
}

a:hover {
    border-color: var(--color-accent);

}

a:active {
    border-color: var(--color-accent);
    background: var(--color-accent);
    color: black;

    .icon {
        color: inherit;
    }

}

a::after {
    display: none;
}
</style>