<script lang="ts">
    import { FuseWorker } from "fuse.js/worker";

    import { SpotlightBackground } from "$lib/components";

    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import Icon from "@iconify/svelte";

    const { data } = $props();

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

<section class="px-2 xl:px-4 py-32 space-y-8 min-h-screen">
    <div
        class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:px-8 max-w-340 mx-auto"
    >
        <form
            class="w-full col-span-full"
            onfocusout={filter_projects}
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
                    placeholder="title, description, tags"
                    class="p-4 bg-background grow"
                    bind:value={search_filter}
                />
                <button class="bg-background px-6 p-4 btn"> Search </button>
            </SpotlightBackground>
        </form>
        {#each listing as project}
            <ProjectCard
                {...project}
                class="max-w-124 w-full mx-auto xs:max-w-full "
            />
        {/each}
        {#if listing.length == 0}
            <div
                class="col-span-full flex flex-col items-center justify-center h-64 text-border border border-border bg-stripes"
            >
                <p class="font-fancy text-dimmed text-2xl">No Results :(</p>
            </div>
        {/if}
    </div>
</section>

<style>
    .bg-stripes {
        background-image: repeating-linear-gradient(
            45deg,
            currentColor 0px,
            currentColor 1px,
            transparent 1px,
            transparent 1rem
        );
    }
</style>
