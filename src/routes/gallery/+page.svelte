<script lang="ts">
    import { CubeBannerScene } from "../cube_banner";
    import { BgFadeDiv, Navbar, StartBanner } from "$lib/blocks";

    import { AnimatedBanner } from "$lib/components";
    import { TextTyper, Typewriter } from "$lib/components/others/typewriter";
    import ProjectCard from "$lib/components/ProjectCard.svelte";

    const { data } = $props();
    const title = new TextTyper()
        .wait(500)
        .seq("The ")
        .styled_seq("Gallery", { class: "text-rainbow" })
        .build();
    const subtitle = new TextTyper()
        .wait(1500)
        .seq("Collection of all my projects")
        .build();
</script>

<StartBanner flexCenter>
    {#snippet background()}
        <AnimatedBanner init={(w, h) => new CubeBannerScene(w, h)} />
    {/snippet}
    {#snippet children()}
        <div
            class="m-auto flex flex-col items-center justify-center bg-background w-lg border py-4"
        >
            <h1
                class="font-fancy text-6xl p-2 rounded-lg glow mb-2 min-h-[1.5em] animate-float [animation-delay:2s]"
            >
                <Typewriter inputs={title} interval={50} />
            </h1>
            <p
                class="mb-8 min-h-[1.5em] font-black text-lg font-cursive animate-float [animation-delay:2s]"
            >
                <Typewriter inputs={subtitle} interval={20} hideCursor />
            </p>
        </div>
    {/snippet}
</StartBanner>
<Navbar />
<BgFadeDiv class="h-64" />

<section class="px-4">
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-3 py-32 px-8 xl:px-32">
        {#each data.projects as project}
            <ProjectCard {...project}  />
        {/each}
    </div>
</section>
