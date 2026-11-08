<script lang="ts">
    import { CubeBannerScene } from "../cube_banner";
    import { BgFadeDiv, Navbar, StartBanner } from "$lib/blocks";
    import { AnimatedBanner } from "$lib/components";
    import { TextTyper, Typewriter } from "$lib/components/others/typewriter";
    
    const title = new TextTyper()
        .wait(500)
        .seq("The ")
        .styled_seq("Gallery", { class: "text-rainbow" })
        .build();
    const subtitle = new TextTyper()
        .wait(1500)
        .seq("Collection of all my projects")
        .build();

    
	let { children, data } = $props();

	let navbar_label = $derived(data.project_id)
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
<Navbar label={navbar_label} />
<BgFadeDiv class="h-64" />
{@render children()}

