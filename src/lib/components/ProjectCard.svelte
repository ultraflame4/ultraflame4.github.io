<script lang="ts">
    import type { NormalisedProjectMeta } from "$lib/projects_data";
    import SpotlightBackground from "./SpotlightBackground.svelte";
    import MediaEmbed from "./MediaEmbed.svelte";
    import BgFadeDiv from "$lib/blocks/BgFadeDiv.svelte";
    import { resolve } from "$app/paths";
    
    type Props = {
        anchor_id?: string;
        meta: NormalisedProjectMeta;
        content: string;
    };
    const { anchor_id, meta, content }: Props = $props();
</script>

<SpotlightBackground class="p-px min-h-128">
    <article
        class="size-full bg-background overflow-hidden relative group"
        id={anchor_id}
    >
        {#if meta.media[0]}
            <div class="h-64 m-4 border border-border hover:border-accent">
                <MediaEmbed
                    media={meta.media[0]}
                    class="size-full brightness-80 group-hover:brightness-100"
                />
            </div>
        {/if}
        <ul class="px-4 flex gap-1">
            {#each meta.skills as skill}
                <li
                    class="font-mono text-dimmed uppercase font-thin text-[0.6rem] border border-border py-1 px-2"
                >
                    {skill}
                </li>
            {/each}
        </ul>
        <h1 class="px-4 font-fancy text-xl my-2" style="letter-spacing: -3px;">
            {meta.title ?? anchor_id}
        </h1>
        <ul class="px-4 items-center flex gap-1 bg-background">
            {#each meta.links as link}
                <li class="font-mono text-dimmed uppercase font-bold text-xs">
                    [<a class="text-bright hover:underline" href={link.url}
                        >{link.name}</a
                    >]
                </li>
            {/each}
        </ul>
        <div
            class="prose prose-invert px-4 mt-2 tracking-tight text-sub h-32 overflow-hidden text-sm"
        >
            {@html content}
        </div>
        <BgFadeDiv class="h-32" />
        <!-- Spacer -->
        <div class="h-13"></div>
        <footer class="absolute bottom-4 w-full flex px-4 items-center">
            <a class="font-fancy group" href={resolve("/gallery/" + anchor_id)}>
                [<span class="hover:underline">SEE MORE</span>]
            </a>
            <span
                class="font-thin font-mono text-xs ml-auto text-sub opacity-60"
            >
                Updated - {(
                    meta.end_date ?? meta.start_date
                )?.toLocaleDateString() ?? ""}
            </span>
        </footer>
    </article>
</SpotlightBackground>
