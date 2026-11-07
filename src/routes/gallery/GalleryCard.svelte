<script lang="ts">
    import { cn, useMouseRelative } from "$lib";
    import ProjectCard, {
        type Props,
    } from "$lib/components/ProjectCard.svelte";
    import { useDeviceInfo } from "$lib/utils/useDeviceInfo.svelte";
    import _ from "lodash";

    const { class: class_, ...props }: Props = $props();

    let target = $state<HTMLDivElement>();

    const deviceInfo = useDeviceInfo();
    const disable_motion = $derived(
        deviceInfo.isMobile || deviceInfo.prefersReducedMotion,
    );

    const mouse = $derived(useMouseRelative(() => target, disable_motion));

    function transformCSS(x: number, y: number) {
        const x_scale = 1;
        const y_scale = -1;

        const MAX_ANGLE = 10;

        x -= 50;
        y -= 50;

        x = _.clamp(x, -MAX_ANGLE, MAX_ANGLE);
        y = _.clamp(y, -MAX_ANGLE, MAX_ANGLE);

        const transforms = [
            // Axes are flipped because x (horizontal) should rotate y (axis)
            `rotateY(${x * x_scale}deg)`,
            `rotateX(${y * y_scale}deg)`,
        ].join(" ");
        return `--transform: ${transforms};`;
    }
    let cssVars = $derived(transformCSS(mouse.xPercent, mouse.yPercent));
</script>

<div bind:this={target} class="group min-h-128">
    <div style={cssVars} class="group-hover:transform-(--transform) size-full">
        <ProjectCard class={cn("h-full", class_)} {...props} />
    </div>
</div>
