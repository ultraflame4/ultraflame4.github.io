<script lang="ts">
	import { devto, type devto as DevTo } from '$lib/external/dev_to';
    import { cn } from 'cn';

	let { articleBrief, shouldLoad = false, ...props }: {
		articleBrief: DevTo.Article;
		shouldLoad?: boolean;
		class?: string
	} = $props();

	let data: { article: DevTo.Article; active: boolean } | undefined = $state();
	let loading = $state(false);

	async function loadArticle() {
		if (loading) return;
		loading = true;
		data = {
			article: await devto.articles.fetch_detailed(articleBrief.id),
			active: true
		};
		loading = false;
	}

	$effect(() => {
		if (shouldLoad) {
			loadArticle();
		}
	});
</script>

<article class={cn("px-4 py-2 flex flex-col bg-background", props.class)}>
	<header class="text-dimmed grid grid-cols-2 items-center">
		<span class="text-xs">
			Published: {new Date(articleBrief.created_at).toLocaleDateString()}
		</span>
		{#if articleBrief.edited_at}
			<span class="text-xs ml-auto">
				Last edit: {new Date(articleBrief.edited_at).toLocaleDateString()}
			</span>
		{:else}
			<span></span>
		{/if}

		<h1 class="text-3xl col-span-2 text-bright font-bold my-2">
			{articleBrief.title}
		</h1>
		{#if articleBrief.tag_list.length > 0}
			<ul class="flex gap-1 col-span-2">
				{#each articleBrief.tag_list as tag}
					<li>#{tag}</li>
				{/each}
			</ul>
		{/if}
	</header>

	<hr class="my-4 opacity-30" />

	{#if data?.active}
		<div class="markdown">{@html data.article.body_html}</div>
	{:else}
		<p class="my-2">
			{articleBrief.description}
		</p>
		<button
			class="w-fit underline text-dimmed font-fancy hover:text-accent active:text-accent cursor-pointer my-2"
			onclick={loadArticle}
			disabled={loading}
		>
			{#if loading}
				Loading...
			{:else}
				Read More
			{/if}
		</button>
	{/if}
</article>
