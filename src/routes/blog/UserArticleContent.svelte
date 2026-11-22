<script lang="ts">
    import { devto, type devto as DevTo } from "$lib/external/dev_to";
    import Icon from "@iconify/svelte";
    import { cn } from "cn";
    import { onMount, untrack } from "svelte";

    interface Props {
        articleBrief: DevTo.Article;
        shouldLoad?: boolean;
    }

    let { articleBrief, shouldLoad = false, ...props }: Props = $props();

    let data: { article: DevTo.Article; active: boolean } | undefined =
        $state();

    let load_status = $state(false as false | "loading" | "loaded");

    async function loadArticle(brief: devto.Article) {
        if (load_status) return;
        load_status = "loading";
        data = {
            article: await devto.articles.fetch_detailed(brief.id),
            active: true,
        };
        load_status = "loaded";
    }

    $effect(() => {
        let brief = articleBrief;
        untrack(() => {
            load_status = false;
            if (shouldLoad) {
                loadArticle(brief);
            }
        });
    });
</script>

<header class="text-dimmed space-y-4">
    <h1 class="text-3xl text-bright font-bold">
        {articleBrief.title}
    </h1>

    {#if articleBrief.tag_list.length > 0}
        <ul class="flex gap-2 text-dimmed font-mono text-sm">
            {#each articleBrief.tag_list as tag}
                <li
                    class="hover:text-accent bg-background border-border hover:border-current border px-2 py-1 lowercase"
                >
                    #{tag}
                </li>
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
        disabled={!load_status}
    >
        {#if !load_status}
            Loading...
        {:else}
            Read More
        {/if}
    </button>
{/if}
