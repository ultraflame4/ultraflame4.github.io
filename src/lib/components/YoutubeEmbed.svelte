<script lang="ts">
    import {
        createEmbed,
        getYTVideoId,
        initYoutubeApi,
    } from "$lib/external/yt_api";
    import { onMount } from "svelte";
    import { load } from "../../routes/+page";
    import Icon from "@iconify/svelte";
    import { derived } from "svelte/store";

    interface Props {
        src: string;
        eager?: boolean;
        lazy_preview_title?: string;
    }

    let { src, eager = false, lazy_preview_title }: Props = $props();

    const uniqueId = $props.id();
    const videoId = $derived(getYTVideoId(src));

    function getId() {
        return `ytplayer-${uniqueId}`;
    }




    let noscript = $state(true);
    let shouldLoad: boolean | "loaded" = $state(false);
    let loaded = $state(false);

    // Try to load embed. API may not be available ATP
    function try_load() {
        shouldLoad = true;
        if (!window.ytLoaded) return;
        if (loaded) return;
        createEmbed(videoId, getId());
        console.log("Created embed for youtube url:" + src);
        loaded = true;
    }

    onMount(() => {
        initYoutubeApi();

        const onYtLoaded = () => {
            if (shouldLoad) {
                try_load();
            }
        };

        window.addEventListener("yt-loaded", onYtLoaded);

        if (eager) {
            try_load();
        }

        noscript = false;

        return () => window.removeEventListener("yt-loaded", onYtLoaded);
    });
</script>

<div class="size-full">
    {#if shouldLoad == false}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <button
            class="lazy-load-cover size-full relative cursor-pointer"
            onclick={try_load}
        >
            <img
                class="size-full object-cover"
                src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                alt={`Thumbnail for youtube video ${src}`}
            />
            <!-- <div class="blur"></div> -->

            <!-- <Icon icon="lucide:mouse-pointer-square" class="hover-icon" /> -->

            <Icon icon="logos:youtube-icon" class="text-4xl absolute-center" />

            <p class="font-mono absolute mb-4">
                {#if !noscript}
                    {lazy_preview_title ?? "youtube.com"}
                {/if}
            </p>
            <noscript>
                <a
                    href={src}
                    class="font-mono font-bold underline cursor-pointer absolute left-1/2 top-1/2 -translate-1/2 uppercase bg-background"
                >
                    Click here for link to video
                </a>

                <small
                    class="absolute bottom-4 font-mono left-0 right-0 text-center"
                >
                    <i>Javascript disabled, cannot autoload video.</i>
                </small>
            </noscript>
        </button>
    {/if}

    <div class="size-full" class:hidden={shouldLoad == false}>
        <!-- Actual youtube iframe mount targer -->
        <div class="ytplayer size-full" id={getId()}>Loading..</div>
    </div>
</div>

<style>
    .lazy-load-cover > p {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2em;
        width: 100%;
        font-weight: 700;
        text-transform: lowercase;
        font-size: 0.75rem;
        letter-spacing: -0.25px;
    }

    .hover-icon {
        font-size: 4em;
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        transform: translateY(-50%) translateX(-50%);
    }
</style>
