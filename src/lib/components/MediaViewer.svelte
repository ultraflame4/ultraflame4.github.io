<script lang="ts">
    import { isYoutubeUrl } from "$lib/external/yt_api";
    import type { NormalisedProjectMetaMedia } from "$lib/projects_data";
    import { cn } from "cn";
    import YoutubeEmbed from "./YoutubeEmbed.svelte";

    interface Props {
        media: NormalisedProjectMetaMedia;
        class?: string
    }

    const { media, class: _class}: Props = $props();
</script>
<div class={cn("w-full h-64",  _class)}>
    {#if media.type == "video"}
        {#if isYoutubeUrl(media.url)}
            <YoutubeEmbed src={media.url}/>
        {/if}
    {/if}
</div>
