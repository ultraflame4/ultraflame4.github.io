<script lang="ts">
    import { cn } from "cn";
    import type { Snippet } from "svelte";
    import { useMouseRelative } from "$lib";

    interface Props {
        children?: Snippet;
        class?: string;
    }

    let { children, class: class_ }: Props = $props();

    let target = $state<HTMLDivElement>();
    let isOutside = $state(true);
    let isVisible = $state(false);

    const mouse = useMouseRelative(() => target);
    let cssVars = $derived(
        isVisible
            ? `--x-percent: ${mouse.xPercent}%; --y-percent: ${mouse.yPercent}%`
            : "",
    );

    $effect(() => {
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        });
        observer.observe(target);
        return () => observer.disconnect();
    });

    function handleMouseEnter() {
        isOutside = false;
    }

    function handleMouseLeave() {
        isOutside = true;
    }
</script>

<div
    class={cn("ctn", class_)}
    role="none"
    bind:this={target}
    style={cssVars}
    data-hover={!isOutside || undefined}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
>
    {@render children?.()}
</div>

<style>
    @property --spotlight-radius {
        syntax: "<percentage>";
        initial-value: 0%;
        inherits: false;
    }

    .ctn {
        --spotlight-radius: 0%;
        background: radial-gradient(
            circle at var(--x-percent) var(--y-percent),
            var(--color-accent),
            var(--color-border) max(var(--spotlight-radius), 4rem)
        );
        transition: --spotlight-radius 200ms ease-out;
    }

    .ctn:hover,
    .ctn[data-hover] {
        --spotlight-radius: 50%;
        background: radial-gradient(
            circle at var(--x-percent) var(--y-percent),
            var(--color-accent),
            var(--color-border) max(var(--spotlight-radius), 6rem)
        );
    }
</style>
