<script lang="ts">
    import { cn } from "cn";
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        class?: string;
    }

    let { children, class: class_ }: Props = $props();

    let target = $state<HTMLDivElement>();
    let isOutside = $state(true);
    let isVisible = $state(false);
    let cssVars = $state("");

    $effect(() => {
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        });
        observer.observe(target);
        return () => observer.disconnect();
    });

    function handleMouseMove(e: MouseEvent) {
        if (!target || !isVisible) return;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cssVars = `--x-percent: ${Math.round((x / rect.width) * 100)}%; --y-percent: ${Math.round((y / rect.height) * 100)}%`;
    }

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
    onmousemove={handleMouseMove}
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
