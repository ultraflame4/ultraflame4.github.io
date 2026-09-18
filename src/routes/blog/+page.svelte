<script lang="ts">
    import { CubeBannerScene } from "../cube_banner";
    import { BgFadeDiv, Navbar, StartBanner } from "$lib/blocks";
    import UserArticles from "./UserArticles.svelte";
    import { AnimatedBanner } from "$lib/components";
    import { TextTyper, Typewriter } from "$lib/components/others/typewriter";

    const { data } = $props();
    const title = new TextTyper()
        .wait(500)
        .seq("The B")
        .styled_seq("log.txt", { class: "text-rainbow" })
        .build();
    const subtitle = new TextTyper()
        .wait(1400)
        .seq("Devlogs, Updates, Posts & random thoughts")
        .build();
    const subtitle2 = new TextTyper()
        .wait(3500)
        .seq("> sudo ")
        .wait(10)
        .seq("journalctl ")
        .wait(300)
        .seq("-t ")
        .wait(300)
        .seq("daily ")
        .wait(300)
        .seq("-n 1000")
        .build();
</script>

<StartBanner flexCenter>
    {#snippet background()}
        <AnimatedBanner init={(w, h) => new CubeBannerScene(w, h)} />
    {/snippet}
    {#snippet children()}
        <div class="m-auto flex flex-col items-center justify-center bg-background w-lg border py-4">
            <h1
                class="font-fancy text-6xl p-2 rounded-lg glow mb-2 min-h-[1.5em] animate-float [animation-delay:2s]"
            >
                <Typewriter inputs={title} interval={50} />
            </h1>
            <p
                class="mb-8 min-h-[1.5em] font-black text-lg font-mono animate-float [animation-delay:2s]"
            >
                <Typewriter inputs={subtitle} interval={20} hideCursor />
            </p>
            <p
                class="mt-8 min-h-[1.5em] font-black text-xs font-mono bg-background"
            >
                <Typewriter inputs={subtitle2} hideCursor interval={30} />
            </p>
        </div>
    {/snippet}
</StartBanner>
<Navbar />
<BgFadeDiv class="h-64" />

<section class="px-4">
    <UserArticles
        username="clyh"
        currentPostId={data.queryPostId ?? undefined}
    />
</section>
