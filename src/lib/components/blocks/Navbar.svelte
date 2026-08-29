<script lang="ts">
    import { asset, resolve } from "$app/paths";

</script>


{#snippet nav_link(name: string, url: string, index: number)}
	<a href={url} class="h-full glow font-fancy relative flex items-center gap-1.5 mr-1">
	    <span class="inline-flex items-center justify-center font-mono text-xs bg-background size-4 ring ring-black rounded-sm">{index}</span>
	    <span>{name}</span>
	</a>
{/snippet}

<header class="p-(--nav-offset-units) w-full flex items-center justify-center sticky top-0">
    <nav class="acrylic h-(--nav-height-units) rounded-2xl min-w-32 w-fit p-2 flex gap-3">
        <a href={import.meta.env.BASE_URL} class="h-full glow"><img class="h-full" src={asset('/brand.png')} alt="clyh.me" /></a>
        {@render nav_link('About', resolve('/#about'), 0)}
        {@render nav_link('Blog', resolve('/blog'), 1)}
        {@render nav_link('Gallery', resolve('/gallery'), 2)}
    </nav>
</header>