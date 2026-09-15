<script lang="ts">
	import { devto, type devto as DevTo } from '$lib/external/dev_to';
	import UserArticleContent from './UserArticleContent.svelte';
	import { browser } from '$app/environment';

	let { username }: { username: string } = $props();

	let articles: DevTo.Article[] = $state([]);
	let loading = $state(true);
	let selectedArticleIndex = $state(0);

	let selectedArticle = $derived(articles[selectedArticleIndex]);

	let bookSections = $derived(
		articles.map((x) => {
			const created_at = new Date(x.created_at);
			return {
					title: `${created_at.toLocaleDateString()} - ${x.title}`,
				href: `?post=${x.id}`
			};
		})
	);

	function updateArticle() {
		if (!browser) return;
		const params = new URLSearchParams(location.search);
		const postId = Number(params.get('post'));
		selectedArticleIndex = Math.max(
			articles.findIndex((x) => x.id === postId),
			0
		);
	}

	$effect(() => {
		devto.articles.search(username).then((result) => {
			articles = result;
			loading = false;
			updateArticle();
		});
	});
</script>

<section class="bg-background w-full p-4 pt-(--header-spacing) min-h-svh" id="blog-posts">
	<div class="max-w-350 w-full h-full py-4">
		{#if loading}
			<p class="font-mono">Loading articles...</p>
		{:else}
		{JSON.stringify(bookSections)}
			<!-- WindowBook: sections={bookSections} title="Recent Posts" sidebar_heading="Log Entries" sticky_sidebar sidebar_class="min-w-64" onsection-change={updateArticle} -->
			<!-- WindowCardPanel class="overflow-auto" -->
				<UserArticleContent articleBrief={selectedArticle} shouldLoad class="w-full" />
			<!-- /WindowCardPanel -->
			<!-- /WindowBook -->
		{/if}
	</div>
</section>
