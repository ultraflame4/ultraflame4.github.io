<script>
    import { resolve } from "$app/paths";

    import { MediaEmbed, SpotlightBackground } from "$lib/components";
    import FancyLink from "$lib/components/FancyLink.svelte";
    import Icon from "@iconify/svelte";

    const { data } = $props();

    const { key, meta, html: content } = data.project;
</script>

<section class="min-page-h flex items-center py-16 px-4 md:p-8 lg:px-16">
    <SpotlightBackground class="p-px h-fit">
        <article class="h-fit grid relative bg-stripes" id="view">
            <h1
                class="pl-6 py-2 font-fancy text-5xl my-4 "
                style="letter-spacing: -3px;"
            >
                {meta.title ?? key}
            </h1>
            <ul class="pl-6 items-center flex gap-1">
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
                class="prose prose-invert px-6 mt-2 tracking-tight text-dimmed text-base "
            >
                {@html content}
            </div>

            <div class="row-span-full py-4 z-10 lg:col-2">
                <ul class="px-4 flex gap-1">
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
            <footer class="p-4 flex col-span-full z-10 gap-4 flex-wrap ">
                <FancyLink href={resolve("/gallery")} class="h-10">
                    🡐 Back to Gallery
                </FancyLink>
                {#if meta.source !== undefined}
                    <FancyLink href={meta.source.url} class="pr-4 h-10">
                        <Icon icon="mdi:source-branch" />
                        {meta.source.label}
                    </FancyLink>
                {/if}
                <div class="mx-auto"></div>
                <p
                    class="px-3 flex items-center border border-border font-semibold font-mono text-xs text-sub bg-background h-10"
                    
                >
                    Status -
                    <span
                        class="mx-2
                         data-[status=completed]:text-green-500
                         data-[status=inactive]:text-dimmed-400
                         data-status:text-red-400
                         "
                        data-status={meta.status}
                    >
                        {meta.status.toLocaleUpperCase()}
                    </span>
                </p>
                <p
                    class="px-3 flex items-center border border-border font-semibold font-mono text-xs text-sub bg-background h-10"
                >
                    Updated - {(
                        meta.end_date ?? meta.start_date
                    )?.toLocaleDateString() ?? ""}
                </p>
            </footer>
            
        </article>
    </SpotlightBackground>
</section>

<style>
    .bg-stripes {
        --t: rgba(15,15,15,0.8);
        background-image: repeating-linear-gradient(
            45deg,
            var(--t) 0px,
            var(--t) 1px,
            var(--color-background) 1px,
            var(--color-background) 20px
        );
    }

    article {
        grid-template-columns: 3fr 4fr;
        grid-template-rows: auto auto 1fr auto;
        

        /*Mobile specific*/
        @media (width < 72rem) {
            display: flex;
            flex-direction: column;

        }
    }

</style>
