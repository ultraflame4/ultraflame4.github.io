<script lang="ts">
    import { onMount } from "svelte";
    import { CubeBannerScene } from "./cube_banner";


    onMount(() => {
        const scene = new CubeBannerScene(
            window.innerWidth,
            window.innerHeight,
        );
        scene.attach(document.getElementById("cubelandingbanner-bg")!);
        setTimeout(() => {
            scene.start();
        }, 1000);

        return () => {
            scene.dispose();
        };
    });
</script>

<div style="margin: 0;" id="cubelandingbanner-bg"></div>
