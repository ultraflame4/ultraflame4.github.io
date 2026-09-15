<script lang="ts">
    import { resolve } from "$app/paths";
    import BgFadeDiv from "$lib/blocks/BgFadeDiv.svelte";
    import Navbar from "$lib/blocks/Navbar.svelte";
    import StartBanner from "$lib/blocks/StartBanner.svelte";
    import MediaEmbed from "$lib/components/MediaEmbed.svelte";
    import { TextTyper } from "$lib/components/others/typewriter";
    import Typewriter from "$lib/components/others/Typewriter.svelte";
    import SpotlightBackground from "$lib/components/SpotlightBackground.svelte";
    import { entryRatio } from "$lib/entryRatio.js";
    import CubeBanner from "./CubeBanner.svelte";
    const delay = 400;

    const { data } = $props();

    const greeting = new TextTyper()
        .wait(200)
        .seq("Hello, ")
        .wait(300)
        .seq("I'm ")
        .styled_seq("Chester", { class: "greeting-name" })
        .ins("<br/>")
        .wait(300)
        .seq("I'm a ")
        .styled_seq("Self-taught", { style: "color:#86EFAC" })
        .wait(delay)
        .autoprev()
        .styled_seq("Programmer", { style: "color:#4f39f6" })
        .wait(delay)
        .autoprev()
        .styled_seq("builder", { style: "color:#ff8904" })
        .wait(delay)
        .autoprev()
        .styled_seq("maker", { style: "color: var(--color-rainbow)" })
        .wait(8000)
        .autoprev()
        .tti_goto(10) // Magic value: found through repeated tries. Cannot just count because some steps contains more than one tti!
        .build();

    const sub_greeting = new TextTyper()
        .wait(5500)
        .seq("Welcome to my little corner of the internet.")
        .build();

    let about_loc = $state("");
    function updateAboutVis(loc?: string) {
        if (!loc) return;
        about_loc = loc;
    }
</script>

<StartBanner>
    {#snippet background()}
        <CubeBanner />
    {/snippet}
    {#snippet children()}
        <div
            class="size-full flex justify-center items-start"
            style="height: 200%;"
        >
            <div
                class="w-100 border p-4 bg-background sticky top-1/2 -translate-y-1/2 -z-10"
            >
                <p class="font-fancy text-3xl h-24">
                    <Typewriter inputs={greeting} />
                </p>
                <p><Typewriter inputs={sub_greeting} /></p>
            </div>
        </div>
    {/snippet}
</StartBanner>
<Navbar />
<BgFadeDiv class="h-64" />
<section class="lg:grid gap-4 px-8" style="grid-template-columns: 2fr 5fr;">
    <ul class="story-keys">
        {#each data.about_story as [key, story]}
            <li class="story-key" data-active={about_loc == key || undefined}>
                <a href="#{key}">{key}</a>
            </li>
        {/each}
    </ul>
    <!-- -space-y is required to reduce spacing cause by pt-32 -->
    <div>
        {#each data.about_story as [key, story]}
            <!-- pt-32 offsets the actual content such that it sits below nav header -->
            <article
                class="lg:pt-32 lg:-mt-24 pt-64 -mt-56"
                id={key}
                {@attach entryRatio({
                    coverage: 0.6,
                    visibleChanged: (v) => updateAboutVis(v ? key : undefined),
                })}
            >
                <SpotlightBackground class="rounded-3xl p-px">
                    <div
                        class="prose prose-invert rounded-3xl bg-background p-5 min-w-full"
                    >
                        {@html story}
                    </div>
                </SpotlightBackground>
            </article>
        {/each}
    </div>
</section>
<section>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-8">
        <SpotlightBackground class="col-span-full p-px">
            <h2 class="font-fancy bg-background text-2xl text-center py-4">
                Recent Works
            </h2>
        </SpotlightBackground>
        {#each data.recent_works as [key, content, meta]}
            <!-- pt-32 offsets the actual content such that it sits below nav header -->
            <SpotlightBackground class="p-px min-h-128">
                <article
                    class="size-full bg-background overflow-hidden relative group"
                    id={key}
                >
                    {#if meta.media[0]}
                        <div class="h-96 m-4 border-2 border-border hover:border-accent">
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
                    <h1
                        class="px-4 font-fancy text-2xl my-2"
                        style="letter-spacing: -3px;"
                    >
                        {meta.title ?? key}
                    </h1>
                    <ul class="px-4 items-center flex gap-1 bg-background">
                        {#each meta.links as link}
                            <li
                                class="font-mono text-dimmed uppercase font-bold text-sm"
                            >
                                [<a
                                    class="text-bright hover:underline"
                                    href={link.url}>{link.name}</a
                                >]
                            </li>
                        {/each}
                    </ul>
                    <div
                        class="prose prose-invert px-4 mt-2 tracking-tight text-sub h-48 overflow-hidden"
                    >
                        {@html content}
                    </div>
                    <BgFadeDiv class="h-32" />
                    <!-- Spacer -->
                    <div class="h-13"></div>
                    <footer
                        class="absolute bottom-4 w-full flex px-4 items-center"
                    >
                        <a
                            class="font-fancy group"
                            href={resolve("/gallery/" + key)}
                        >
                            [<span class="group-hover:underline">READ MORE</span
                            >]
                        </a>
                        <span
                            class="font-thin font-mono text-xs ml-auto text-sub opacity-60"
                        >
                            Updated {(
                                meta.end_date ?? meta.start_date
                            )?.toLocaleDateString()}
                        </span>
                    </footer>
                </article>
            </SpotlightBackground>
        {/each}
    </div>
</section>

<SpotlightBackground class="p-px size-fit mx-auto">
    <button
        class="bg-background px-8 py-4 font-fancy text-xl cursor-pointer"
        onclick={() => window.scrollTo({ top: 0 })}
    >
        Back to top
    </button>
</SpotlightBackground>
<div class="h-1000"></div>

<style>
    @reference "./layout.css";
    .story-keys {
        /*background: black;*/
        /*Positioning*/
        @apply ml-auto top-1/3 text-right sticky h-fit;
        /*Styling*/
        @apply mt-16 rounded-3xl font-fancy text-2xl;
        /*Mobile specific*/
        @media (width < 64rem) {
            @apply acrylic px-4 py-2 top-25 h-fit w-fit;
        }
    }

    .story-key {
        @apply text-bright opacity-30 origin-right hover:opacity-80;
        @apply data-active:opacity-100 lg:data-active:scale-120;
    }
</style>
