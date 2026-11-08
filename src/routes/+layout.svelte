<script lang="ts">
    import "./layout.css";
    import "$lib/icons";
    import favicon from "$lib/assets/favicon.svg";
    import "@fontsource/silkscreen";
    import "@fontsource-variable/dancing-script";
    import { socials } from "$lib/data";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    let loaded = $state(false);
    let layout_children = $state<HTMLDivElement>();

    onMount(() => {
        setTimeout(() => {
            layout_children!.style = "display: contents";
            loaded = true;
        }, 0);
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>clyh's corner</title>
</svelte:head>

<div
    class="font-fancy bg-background fixed w-screen h-screen z-50 data-loaded:hidden"
    data-loaded={loaded || undefined}
>
    <div class="absolute-center">
        <p>LOADING...</p>
    </div>
</div>

<div
    style="position: fixed; height: 0;overflow: hidden;"
    bind:this={layout_children}
    class="fade-in"
>
    {@render children()}
</div>

<footer
    class="flex items-center h-12 mt-16 px-4 text-xs
    border-t border-border
    overflow-hidden relative"
>
    <span class="font-mono mr-auto">© Copyright 2026</span>
    <div class="flex items-center justify-end h-full gap-2">
        {#each socials as x}
            <a
                title={x.title}
                href={x.url}
                class="grayscale hover:text-accent hover:grayscale-0"
            >
                <Icon inline icon={x.iconify} class="text-xl" />
            </a>
        {/each}
    </div>
    <div class="flex items-center absolute-center">
        <span class="font-fancy">Made with ❤️ by</span>
        <span
            class="font-mono font-black inline-block px-1 py-0.5 ml-1 rounded-md border border-border bg-mdcode"
            >ultr42</span
        >
    </div>
</footer>

<style>
    @reference "./layout.css";
    .fade-in {
        animation: fadeIn 0.5s ease forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
