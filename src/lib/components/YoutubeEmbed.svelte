<script lang="ts">
    import {
        createEmbed,
        getYTVideoId,
        initYoutubeApi,
    } from "$lib/external/yt_api";
    import { onMount } from "svelte";
    import { load } from "../../routes/+page";
    // import Icon from "@iconify/svelte";

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

    let ytIsLoaded = $state(false);

    let noscript = $state(true);
    let loaded: "loading" | boolean = $state(false);

    function try_load() {
        if (!ytIsLoaded) return;
        if (loaded !== false) return;
        console.log("Refreshing youtube url:" + src);
        loaded = "loading";
        createEmbed(videoId, getId());
        loaded = true;
    }

    onMount(() => {
        initYoutubeApi();

        const onYtLoaded = () => {
            ytIsLoaded = true;
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
    {#if loaded == false}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="lazy-load-cover relative" onclick={try_load}>
            <img
                src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                alt={`Thumbnail for youtube video ${src}`}
            />
            <!-- <div class="blur"></div> -->

            <!-- <Icon icon="lucide:mouse-pointer-square" class="hover-icon" /> -->
            <p class="font-mono">
                {#if !noscript}
                    <!-- <Icon icon="logos:youtube-icon" class="yt" /> -->
                    {lazy_preview_title ?? "youtube.com - click to play"}
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
        </div>
    {/if}

    <div class="size-full" class:hidden={loaded == false}>
        <!-- Actual youtube iframe mount targer -->
        <div class="ytplayer size-full" id={getId()}>Loading..</div>
    </div>
</div>

<style>
    .lazy-load-cover {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(0px);
        gap: 0.4rem;
    }

    .lazy-load-cover > img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .lazy-load-cover > .blur {
        position: absolute;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(3px);
    }

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
