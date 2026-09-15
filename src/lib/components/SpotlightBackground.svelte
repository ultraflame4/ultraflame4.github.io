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

    let inside = $derived(
        mouse.xPercent > 0 &&
            mouse.xPercent < 100 &&
            mouse.yPercent > 0 &&
            mouse.yPercent < 100,
    );
</script>

<div
    class={cn("ctn pointer-events-auto", class_)}
    role="none"
    bind:this={target}
    style={cssVars}
    data-hover={inside || undefined}
>
    {@render children?.()}
</div>

<style>
    @property --spotlight-radius {
        syntax: "<percentage>";
        initial-value: 0%;
        inherits: false;
    }
    @property --y-percent {
        syntax: "<percentage>";
        initial-value: 0%;
        inherits: false;
    }
    @property --x-percent {
        syntax: "<percentage>";
        initial-value: 0%;
        inherits: false;
    }
    .ctn {
        --spotlight-radius: 10%;
        background: radial-gradient(
            circle at var(--x-percent) var(--y-percent),
            var(--color-accent),
            var(--color-border) max(var(--spotlight-radius), 4rem)
        );
        transition:
            --spotlight-radius 1000ms linear,
            --y-percent 400ms ease,
            --x-percent 400ms ease;
    }

    /*.ctn:hover,*/
    .ctn[data-hover] {
        --spotlight-radius: 50%;
        transition:
            --spotlight-radius 400ms ease-out
            ;
    }
</style>
