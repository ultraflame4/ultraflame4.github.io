<script>
    import { resolve } from "$app/paths";
    import { BgFadeDiv, Navbar } from "$lib/blocks";
    import { MediaEmbed, SpotlightBackground } from "$lib/components";
    import { cn } from "cn";
    import { onMount } from "svelte";

    const { data } = $props();

    const { key, meta, html: content } = data.project;
</script>

<section class="min-page-h p-16">
    <SpotlightBackground class="p-px h-full">
        <article
            class="h-full bg-background grid relative"
            style="grid-template-columns: 3fr 4fr; grid-template-rows: auto auto 1fr auto;"
            id="view"
        >
            <h1
                class="px-4 py-2 font-fancy text-3xl my-2"
                style="letter-spacing: -3px;"
            >
                {meta.title ?? key}
            </h1>
            <ul class="px-4 items-center flex gap-1 bg-background">
                {#each meta.links as link}
                    <li
                        class="font-mono text-dimmed uppercase font-bold text-base"
                    >
                        [<a class="text-bright hover:underline" href={link.url}
                            >{link.name}</a
                        >]
                    </li>
                {/each}
            </ul>
            <div
                class="prose prose-invert p-4 mt-2 tracking-tight text-dimmed text-base col-1"
            >
                {@html content}
            </div>

            <div class="row-span-full col-2 py-4 z-10">
                <ul class="px-4 flex gap-1 row-1 col-2">
                    {#each meta.skills as skill}
                        <li
                            class="font-mono text-dimmed uppercase font-semibold text-xs border border-border py-1 px-2 bg-background"
                        >
                            {skill}
                        </li>
                    {/each}
                </ul>
                {#if meta.media[0]}
                    <div
                        class="aspect-video m-4 border border-border hover:border-accent col-2 row-span-2 bg-background"
                    >
                        <MediaEmbed
                            media={meta.media[0]}
                            class="size-full brightness-80 group-hover:brightness-100"
                        />
                    </div>
                {/if}
            </div>
            <footer class="p-4 flex col-span-full z-10">
                <SpotlightBackground class="p-px">
                    <a
                        class="font-fancy bg-background px-3 py-2 btn block"
                        href={resolve("/gallery")}
                    >
                        🡐 Back to Gallery
                    </a>
                </SpotlightBackground>
                <p
                    class="px-3 flex items-center border border-border font-semibold font-mono text-xs ml-auto text-sub bg-background"
                >
                    Updated - {(
                        meta.end_date ?? meta.start_date
                    )?.toLocaleDateString() ?? ""}
                </p>
            </footer>
            <div
                class="bg-stripes absolute right-0 top-0 bottom-0 left-3/7"
            ></div>
        </article>
    </SpotlightBackground>
</section>

<style>
    .bg-stripes {
        background-image: repeating-linear-gradient(
            45deg,
            var(--color-border) 0px,
            var(--color-border) 1px,
            transparent 1px,
            transparent 1rem
        );
    }
</style>
