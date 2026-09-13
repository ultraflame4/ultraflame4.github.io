<script lang="ts">
    import BgFadeDiv from "$lib/blocks/BgFadeDiv.svelte";
    import Navbar from "$lib/blocks/Navbar.svelte";
    import StartBanner from "$lib/blocks/StartBanner.svelte";
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
        <div class="size-full flex justify-center items-center">
            <div
                class="w-100 border p-4 bg-background sticky top-1/2 -translate-y-1/2 z-10"
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
