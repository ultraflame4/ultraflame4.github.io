<script lang="ts">
import CubeBanner from "../CubeBanner.svelte"
import StartBanner from "$lib/blocks/StartBanner.svelte"
import Navbar from "$lib/blocks/Navbar.svelte"
import BgFadeDiv from "$lib/blocks/BgFadeDiv.svelte"
import UserArticles from "$lib/components/UserArticles.svelte"

</script>

<StartBanner>
    {#snippet background()}
        <CubeBanner />
    {/snippet}

</StartBanner>
<Navbar />
<BgFadeDiv class="h-64" />


<section class="px-4">
    <UserArticles username="clyh" />

    <p class="text-dimmed text-xs font-mono font lowercase mt-4">
        view all posts at <a href="https://dev.to/clyh">dev.to/clyh</a>
    </p>
</section>
