<script lang="ts">
    import type { NormalisedProjectMetaMedia } from "$lib/projects_data";

    interface Props {
        media: NormalisedProjectMetaMedia;
    }

    const { media }: Props = $props();
</script>
<div>
    {#if media.type == "video"}
        {#if isYT}
	
        {/if}
    {/if}
</div>
