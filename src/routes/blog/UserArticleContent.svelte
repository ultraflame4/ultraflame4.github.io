<script lang="ts">
    import { devto, type devto as DevTo } from "$lib/external/dev_to";
    import { cn } from "cn";

    interface Props {
        articleBrief: DevTo.Article;
        shouldLoad?: boolean;
    }

    let { articleBrief, shouldLoad = false, ...props }: Props = $props();

    let data: { article: DevTo.Article; active: boolean } | undefined =
        $state();
    let loading = $state(false);

    async function loadArticle() {
        if (loading) return;
        loading = true;
        data = {
            article: await devto.articles.fetch_detailed(articleBrief.id),
            active: true,
        };
        loading = false;
    }

    $effect(() => {
        if (shouldLoad) {
            loadArticle();
        }
    });
</script>

<header class="text-dimmed space-y-4">
    <h1 class="text-3xl text-bright font-bold">
        {articleBrief.title}
    </h1>

    {#if articleBrief.tag_list.length > 0}
        <ul class="flex gap-1">
            {#each articleBrief.tag_list as tag}
                <li>#{tag}</li>
            {/each}
        </ul>
    {/if}

    <div class="flex">
        <span class="text-xs">
            Published: {new Date(articleBrief.created_at).toLocaleDateString()}
        </span>
        {#if articleBrief.edited_at}
            <span class="text-xs ml-auto">
                Updated: {new Date(articleBrief.edited_at).toLocaleDateString()}
            </span>
        {:else}
            <span></span>
        {/if}
    </div>
</header>

<hr class="my-4 opacity-30" />

{#if data?.active}
    <main class="markdown">{@html data.article.body_html}</main>
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
