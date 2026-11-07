<script lang="ts">
    import { FuseWorker } from "fuse.js/worker";
    import { CubeBannerScene } from "../cube_banner";
    import { BgFadeDiv, Navbar, StartBanner } from "$lib/blocks";

    import { AnimatedBanner, SpotlightBackground } from "$lib/components";
    import { TextTyper, Typewriter } from "$lib/components/others/typewriter";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import Icon from "@iconify/svelte";

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

    let search_filter = $state("");

    let listing = $state(data.projects);

    const fuse = $derived(
        new FuseWorker(data.projects, {
            keys: ["meta.title", "meta.status", "md", "meta.skills"],
        }),
    );
    async function filter_projects() {
        const query = search_filter;
        if (query.length == 0) {
            listing = data.projects;
            return;
        }
        const result = await fuse.search(query);
        listing = result.map((x) => x.item);
    }
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

<section class="px-2 xl:px-4 py-32 space-y-8 min-h-screen">
    <div
        class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:px-8 max-w-340 mx-auto"
    >
        <form
            class="w-full col-span-full"
            onsubmit={(e) => {
                e.preventDefault();
                filter_projects();
            }}
        >
            <SpotlightBackground class="size-full p-px flex gap-px font-fancy">
                <div
                    class="bg-background aspect-square flex items-center justify-center"
                >
                    <Icon icon="material-symbols:location-searching"></Icon>
                </div>
                <input
                    placeholder="Title, Description, Tags"
                    class="p-4 bg-background grow"
                    bind:value={search_filter}
                />
                <button class="bg-background px-6 p-4 btn"> Search </button>
            </SpotlightBackground>
        </form>
        {#each listing as project}
            <ProjectCard
                {...project}
                class="max-w-124 mx-auto xs:max-w-full "
            />
        {/each}
    </div>
</section>
