<script lang="ts">
    import { cn } from "cn";
    import type { Snippet } from "svelte";
    import { useMouseRelative } from "$lib";
    import type { HTMLAttributes } from "svelte/elements";
    import { useDeviceInfo } from "$lib/utils/useDeviceInfo.svelte";
    import type { MouseRelative } from "$lib/utils/useMouseRelative.svelte";

    export type ElementProps = HTMLAttributes<HTMLDivElement>;
    interface Props extends ElementProps {
        children?: Snippet;
        class?: string;
    }

    let { children, class: class_, ...rest }: Props = $props();

    let target = $state<HTMLDivElement>();

    let visible = $state(false);
    const device = useDeviceInfo();

    const mouse = useMouseRelative(() => target);

    function get_style(
        visible: boolean,
        lightweight: boolean,
        mouse: MouseRelative,
    ) {
        if (lightweight) {
            return `--x-percent: 50%; --y-percent:50%`;
        }
        if (visible) {
            return `--x-percent: ${mouse.xPercent}%; --y-percent: ${mouse.yPercent}%`;
        }
        return "";
    }

    let cssVars = $derived(get_style(visible, device.useLightweightUI, mouse));

    $effect(() => {
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
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
    {...rest}
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
        transition: --spotlight-radius 400ms ease-out;
    }
</style>
