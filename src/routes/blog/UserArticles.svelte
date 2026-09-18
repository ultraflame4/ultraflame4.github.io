<script lang="ts">
    import { devto, type devto as DevTo } from "$lib/external/dev_to";
    import UserArticleContent from "./UserArticleContent.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
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

    let sidebarOpen = $state(false);
</script>

<section
    class="bg-background w-full pt-(--header-spacing) min-h-svh grid gap-x-4 lg:gap-x-6 relative"
    style="grid-template-columns: 1fr 3fr;"
    id="blog-posts"
    data-open={sidebarOpen || undefined}
>
    <!-- Mobile only header -->
    <h2 class="md:hidden text-3xl font-fancy row-start-1 col-span-full">
        Recent Posts
    </h2>

    <button
        class="md:hidden cursor-pointer acrylic nav-h aspect-square rounded-3xl
        flex items-center justify-center sticky top-(--nav-offset-units) z-40
        row-start-1 col-span-full ml-auto"
        onclick={() => (sidebarOpen = !sidebarOpen)}
    >
        <Icon icon={sidebarOpen ? "lucide:x" : "lucide:menu"} />
    </button>

    <aside
        class="top-(--nav-height-units) sticky h-fit text-right bg-background mobile-sidebar"
    >
        <h2 class="mt-8 text-2xl lg:text-3xl font-fancy">
            Recent Posts
        </h2>
        <p
            class="text-dimmed text-xs font-mono font lowercase mb-4 mt-2"
        >
            view all posts at <a
                href="https://dev.to/clyh"
                class="hover:underline hover:text-bright">[dev.to/clyh]</a
            >
        </p>
        <ul class="space-y-4">
            {#each posts as post, idx}
                <li
                    class="group data-active:text-bright font-fancy text-basetext-right"
                    data-active={idx === selectedArticleIndex || undefined}
                >
                    <a
                        href={post.href}
                        class="flex flex-col"
                        onclick={() => (sidebarOpen = false)}
                    >
                        <h3
                            class="my-0 group-data-active:opacity-100 opacity-60 lg:group-data-active:scale-120 origin-right"
                        >
                            {post.title}
                        </h3>
                        <span
                            class="text-xs text-dimmed font-mono tracking-wider"
                        >
                            {post.createdAt}
                        </span>
                    </a>
                </li>
            {/each}
        </ul>
    </aside>

    <div
        class="w-full h-full py-4 overflow-hidden max-md:col-span-full max-md:row-start-2"
    >
        {#if loading}
            <p class="font-mono">Loading articles...</p>
        {:else if selectedArticleIndex < 0}
            <p class="font-mono">Cannot find article with id {currentPostId}</p>
        {:else}
            <!-- WindowBook: sections={bookSections} title="Recent Posts" sidebar_heading="Log Entries" sticky_sidebar sidebar_class="min-w-64" onsection-change={updateArticle} -->
            <!-- WindowCardPanel class="overflow-auto" -->
            <article id="content" class="w-full">
                <div class="nav-h-spacer mb-8"></div>
                <SpotlightBackground class="h-fit w-full p-px rounded-2xl">
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

<style>
    @reference "../layout.css";
    @media (width < 48rem) {
        .mobile-sidebar {
            /*Mobile specific*/

            @apply row-start-2 col-span-full sticky top-0 w-2/3 translate-x-[-150%] h-dvh pt-(--nav-total-h-units) pr-6 z-10 border border-border;
        }
        [data-open] .mobile-sidebar {
            @apply translate-x-0;
        }
    }
</style>
