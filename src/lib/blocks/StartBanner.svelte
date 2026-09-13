<script lang="ts">
    import type { Snippet } from "svelte";
    import IntersectionObserver, {
        createIntersectionObserver,
    } from "svelte-intersection-observer";

    interface Props {
        children: Snippet;
        background?: Snippet;
        overlay?: Snippet;
    }

    const { children, background, overlay }: Props = $props();
    const observer = createIntersectionObserver(() => ({ threshold: 1 }));
    
</script>

<div class="banner relative" {@attach observer.attach}>
    <div class="content z-0 pointer-events-none overflow-hidden">
        {@render background?.()}
    </div>
    <div class="content">
        {@render children()}
    </div>
    <div class="content pointer-events-none">
        {@render overlay?.()}
    </div>
</div>
{observer.entry?.intersectionRatio ?? 'nil'}
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
