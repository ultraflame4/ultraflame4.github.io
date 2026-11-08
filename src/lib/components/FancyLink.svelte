<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";
    import SpotlightBackground from "./SpotlightBackground.svelte";
    import { cn } from "cn";

    const { class: class_, ...props }: HTMLAnchorAttributes =
        $props();
</script>

<SpotlightBackground class="p-px">
    <a
        class={cn("h-full font-fancy bg-background px-3  btn gap-1.5 flex items-center", class_)}
        {...props}
    >
        {@render props.children?.()}
    </a>
</SpotlightBackground>
