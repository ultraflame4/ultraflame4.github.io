<script lang="ts">
    import { devto, type devto as DevTo } from "$lib/external/dev_to";
    import UserArticleContent from "./UserArticleContent.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { derived } from "svelte/store";
    import SpotlightBackground from "$lib/components/SpotlightBackground.svelte";

    export interface Props {
        username: string;
        currentPostId?: string;
    }

    let { username, currentPostId }: Props = $props();

    let articles: DevTo.Article[] = $state([]);
    let loading = $state(true);
    let selectedArticleIndex = $derived(
        currentPostId !== undefined
            ? articles.findIndex((x) => x.id === +currentPostId)
            : 0,
    );

    let selectedArticle = $derived(articles[selectedArticleIndex]);

    let posts = $derived(
        articles.map((x) => {
            const created_at = new Date(x.created_at);
            return {
                title: `${x.title}`,
                createdAt: created_at.toLocaleDateString(),
                href: `?post=${x.id}#content`,
            };
        }),
    );

    onMount(async () => {
        articles = await devto.articles.search(username);
        loading = false;
    });
</script>

<section
    class="bg-background w-full pt-(--header-spacing) min-h-svh grid gap-x-4 lg:gap-x-6"
    style="grid-template-columns: 1fr 3fr;"
    id="blog-posts"
>
    <aside class="top-(--nav-height-units) sticky h-fit text-right">
        <h2 class="text-sm mt-8 sm:text-xl md:text-2xl lg:text-3xl font-fancy">
            Recent Posts
        </h2>
        <p
            class="text-dimmed text-tiny sm:text-xs font-mono font lowercase mb-4"
        >
            view all posts at <a
                href="https://dev.to/clyh"
                class="hover:underline hover:text-bright">[dev.to/clyh]</a
            >
        </p>
        <ul class="space-y-4">
            {#each posts as post, idx}
                <li
                    class="group data-active:text-bright font-fancy text-xs sm:text-sm text-right"
                    data-active={idx === selectedArticleIndex || undefined}
                >
                    <a href={post.href} class="flex flex-col">
                        <h3
                            class="my-0 group-data-active:opacity-100 opacity-60 lg:group-data-active:scale-120 origin-right"
                        >
                            {post.title}
                        </h3>
                        <span
                            class="text-tiny sm:text-xs text-dimmed font-mono tracking-wider"
                        >
                            {post.createdAt}
                        </span>
                    </a>
                </li>
            {/each}
        </ul>
    </aside>

    <div class="max-w-350 w-full h-full py-4">
        {#if loading}
            <p class="font-mono">Loading articles...</p>
        {:else if selectedArticleIndex < 0}
            <p class="font-mono">Cannot find article with id {currentPostId}</p>
        {:else}
            <!-- WindowBook: sections={bookSections} title="Recent Posts" sidebar_heading="Log Entries" sticky_sidebar sidebar_class="min-w-64" onsection-change={updateArticle} -->
            <!-- WindowCardPanel class="overflow-auto" -->
            <article id="content">
                <div class="nav-h-spacer mb-8"></div>
                <SpotlightBackground class="size-fit p-px rounded-2xl">
                    <div class="p-6 flex flex-col bg-background rounded-2xl">
                        <UserArticleContent
                            articleBrief={selectedArticle}
                            shouldLoad
                        />
                    </div>
                </SpotlightBackground>
            </article>
            <!-- /WindowCardPanel -->
            <!-- /WindowBook -->
        {/if}
    </div>
</section>
