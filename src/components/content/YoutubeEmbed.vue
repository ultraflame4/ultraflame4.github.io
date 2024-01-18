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
<script setup lang="ts">
// import yt from "https://www.youtube.com/iframe_api?js"
import {createEmbed, getYTVideoId, ytIsLoaded} from "@/external";
import {ref, watch} from "vue";

const id = ref()
function getId() {
    return 'ytplayer-' + props.src;
}
interface iprops{
    src:string
}
const props = defineProps<iprops>()

watch([getId, ytIsLoaded, props], (value, oldValue) => {
    console.log("re")
    createEmbed(getYTVideoId(props.src), getId())
},{
    flush: "post",
})

</script>
<style scoped lang="scss">
.ytplayer-ctn,.ytplayer-ctn:deep(>.ytplayer){
    width: 100%;
    height: 100%;
}
</style>