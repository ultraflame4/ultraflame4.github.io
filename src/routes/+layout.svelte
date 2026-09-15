<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import "@fontsource/silkscreen";

	let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>clyh</title>
</svelte:head>

{@render children()}
