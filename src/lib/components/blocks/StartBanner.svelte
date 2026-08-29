<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        background?: Snippet;
        foreground?: Snippet;
    }
    
    const { children, background, foreground }: Props = $props();

    $inspect(background);
</script>

<div class="banner relative">
    <div class="content z-0">
        {@render foreground?.()}
    </div>
    <div class="content">
        {@render children()}
    </div>
    <div class="content z-0">
        {@render background?.()}
    </div>

</div>

<style>
    @reference "tailwindcss";
    .banner {
        height: calc(100svh - var(--nav-total-h-units));
    }
    .content{
        height: 100svh;
        @apply absolute top-0 left-0 right-0 bottom-0;
    }
</style>