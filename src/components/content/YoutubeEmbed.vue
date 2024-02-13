<template>
    <!--    <iframe :src="src"-->
    <!--            title="YouTube video player" frameborder="0"-->
    <!--            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"-->
    <!--            allowfullscreen></iframe>-->
    <div class="ytplayer-ctn">
        <template v-if="!should_load">
            <div class="lazy-load-cover" @mouseover="load">
                <img :src="`https://img.youtube.com/vi/${getYTVideoId(props.src)}/0.jpg`" :alt="`Thumbnail for youtube video ${props.src}`"/>
                <div class="blur"/>


                <Icon icon="lucide:mouse-pointer-square" class=" hover-icon"/>
                <p>
                    <Icon icon="logos:youtube-icon" class=" yt"/>
                    {{ props.lazy_preview_title ?? "youtube.com - hover to load"}}

                </p>
            </div>
        </template>
        <template v-if="ytIsLoaded">
            <div class="ytplayer" :id="getId()">Loading..</div>
        </template>

        youtube embed here
    </div>

</template>
<script lang="ts">
let instance_id = 0
</script>
<script setup lang="ts">
// import yt from "https://www.youtube.com/iframe_api?js"
import {createEmbed, getYTVideoId, ytIsLoaded} from "@/external/yt";
import {onMounted, onUpdated, ref, watch} from "vue";
import {Icon} from "@iconify/vue";


const unique_id = instance_id++

function getId() {
    return `ytplayer-${unique_id}`;
}

interface iprops {
    src: string,
    nolazy?: boolean
    lazy_preview_title?: string
}

const props = defineProps<iprops>()
const is_lazy = () => !props.nolazy ?? true;
const should_load = ref(!is_lazy())

function load() {
    if (should_load.value) return
    should_load.value = true
}

function refreshEmbed() {
    if (!ytIsLoaded.value) return;
    if (!should_load.value) return;
    console.log("Refreshing youtube url:" + props.src)
    createEmbed(getYTVideoId(props.src), getId())
}

onMounted(refreshEmbed)
watch([ytIsLoaded, should_load], refreshEmbed, {
    flush: "post",
})

</script>
<style scoped lang="scss">

.lazy-load-cover {
    width: 100%;
    height: 100%;
    position: relative;

    overflow: hidden;
    backdrop-filter: blur(0px); // hack to fix backdrop filter extending beyond parent border radius https://stackoverflow.com/a/38260951

    gap: 0.4rem;

    & > img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    & > .blur {
        position: absolute;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(3px);
    }

    & > p {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2em;
        width: 100%;
        font-weight: 700;
        font-family: "JetBrains Mono";
        text-transform: lowercase;
        font-size: 0.75rem;
        letter-spacing: -.25px;
    }

    .hover-icon {
        font-size: 4em;
        z-index: 1;
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;

        transform: translateY(-50%) translateX(-50%);
    }


}

.ytplayer-ctn, .ytplayer-ctn:deep(>.ytplayer) {
    width: 100%;
    height: 100%;
}
</style>