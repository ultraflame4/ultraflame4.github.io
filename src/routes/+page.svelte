<script lang="ts">
 
    import BgFadeDiv from "$lib/blocks/BgFadeDiv.svelte";
    import Navbar from "$lib/blocks/Navbar.svelte";
    import StartBanner from "$lib/blocks/StartBanner.svelte";
    import { TextTyper } from "$lib/components/others/typewriter";
    import Typewriter from "$lib/components/others/Typewriter.svelte";
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

    let page_hash = $state('');
    function setHash(hash?: string) {
        if (!hash) return;
        page_hash = hash;
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
<section class="grid gap-4 px-8" style="grid-template-columns: 2fr 5fr;">
    <ul class="ml-auto text-right h-fit sticky top-1/4 font-fancy text-2xl">
        {#each data.about_story as [key, story]}
            <li
                class="text-bright opacity-30 hover:opacity-80 origin-right data-active:opacity-100 data-active:scale-110"
                data-active={page_hash == key || undefined}
        
            >
                <a href="#{key}">{key}</a>
            </li>
        {/each}
    </ul>
    <div class="space-y-4">
        {#each data.about_story as [key, story]}
            <article
                class="prose prose-invert border rounded-3xl p-4 min-w-full"
                id={key}
                {@attach entryRatio({
                    coverage: 0.2,
                    continousVisibility: true,
                    visibleChanged: (v) => setHash(v ? key : undefined),
                })}
            >
                {@html story}
            </article>
        {/each}
    </div>
</section>
<div class="h-1000"></div>
