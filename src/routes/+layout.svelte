<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<header class="p-(--nav-offset-units) w-full flex items-center justify-center">
    <nav class="acrylic h-(--nav-height-units) rounded-2xl min-w-32 w-fit">
        
    </nav>
</header>
{@render children()}
