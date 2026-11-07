<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";
    import "@fontsource/silkscreen";
    import "@fontsource-variable/dancing-script";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>clyh</title>
</svelte:head>

{@render children()}

<footer class="border-t w-full border-border h-12 flex items-center mt-16 text-xs px-4 relative">
    <div class="flex items-center absolute-center">
        <span class="font-fancy">Made with ❤️ by</span>
        <span class="font-mono font-black inline-block px-1 py-0.5 ml-1 rounded-md border border-border bg-mdcode">ultr42</span>
    </div>
    <span class="font-mono">© Copyright 2026</span>
</footer>
