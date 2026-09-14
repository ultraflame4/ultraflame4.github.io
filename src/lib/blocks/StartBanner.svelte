<script lang="ts">
    import { entryRatio } from "$lib/entryRatio";
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        background?: Snippet;
        overlay?: Snippet;
    }

    const { children, background, overlay }: Props = $props();
</script>

<div class="banner relative" {@attach entryRatio()}>
    <div
        class="content pointer-events-none overflow-hidden -z-10"
        style="opacity: calc(pow(var(--ratio), 5));"
    >
        {@render background?.()}
    </div>
    <div class="content">
        {@render children()}
    </div>
    <div class="content pointer-events-none">
        {@render overlay?.()}
    </div>
</div>

<style>
    @reference "tailwindcss";
    .banner {
        height: calc(100svh - var(--nav-total-h-units));
    }
    .content {
        height: 100svh;
        @apply absolute top-0 left-0 right-0 bottom-0;
    }
</style>
