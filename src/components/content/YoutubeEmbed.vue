<template>
<!--    <iframe :src="src"-->
<!--            title="YouTube video player" frameborder="0"-->
<!--            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"-->
<!--            allowfullscreen></iframe>-->
    <div class="ytplayer-ctn">
        <template v-if="ytIsLoaded">
            <div class="ytplayer" :id="getId()">test</div>

        </template>
        youtube embed here
    </div>

</template>
<script lang="ts">
let instance_id= 0
</script>
<script setup lang="ts">
// import yt from "https://www.youtube.com/iframe_api?js"
import {createEmbed, getYTVideoId, ytIsLoaded} from "@/external/yt";
import {onMounted, onUpdated, ref, watch} from "vue";


const unique_id = instance_id++
function getId() {
    return `ytplayer-${unique_id}`;
}
interface iprops{
    src:string
}
const props = defineProps<iprops>()

function refreshEmbed() {
    if (!ytIsLoaded.value) return;
    console.log("Refreshing youtube url:" + props.src)
    createEmbed(getYTVideoId(props.src), getId())
}
onMounted(refreshEmbed)
watch(ytIsLoaded, refreshEmbed,{
    flush: "post",
})

</script>
<style scoped lang="scss">
.ytplayer-ctn,.ytplayer-ctn:deep(>.ytplayer){
    width: 100%;
    height: 100%;
}
</style>