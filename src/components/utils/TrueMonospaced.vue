<template>
    <span v-html="inner_html"></span>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{text:string}>();
const inner_html = ref("loading...")

async function transform_txt(){
    inner_html.value = props.text.split("").map(char=>{
        if (char == "\n") return "<br>"
        return `<span style="display:inline-block;width:1ch">${char}</span>`
    }).join("")
}
transform_txt()

</script>


<style scoped lang="scss">
</style>
