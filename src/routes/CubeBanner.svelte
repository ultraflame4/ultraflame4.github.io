<script lang="ts">
    import { onMount } from "svelte";
    import { CubeBannerScene } from "./cube_banner";
    import _ from "lodash";
    import { entryRatio } from "$lib";


    let scene: CubeBannerScene;
    onMount(() => {
        scene = new CubeBannerScene(
            window.innerWidth,
            window.innerHeight,
        );
        scene.attach(document.getElementById("cubelandingbanner-bg")!);

        const on_resize = _.debounce(
            () => scene.resize(window.innerWidth, window.innerHeight),
            200,
        );
        window.addEventListener("resize", on_resize);

        setTimeout(() => {
            scene.start();
        }, 1000);

        return () => {
            scene.dispose();
            window.removeEventListener("resize", on_resize);
        };
    });
</script>

<div
    style="margin: 0;"
    id="cubelandingbanner-bg"
    {@attach entryRatio({
        visibleChanged(visible){
            if (!visible){
                scene.stop()
            }
            else{
                scene.start()
            }
        }
    })}
></div>
