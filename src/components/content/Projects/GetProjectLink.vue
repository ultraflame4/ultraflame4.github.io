<template>

    <ProjectReIconLink v-if="value.url?.match(/https:\/\/github.com\/.*\/releases($|\/.*)/g)"
                       icon="ph:archive-box-fill"/>
    <ProjectReIconLink v-else-if="value.url?.match(/https:\/\/.*\.itch\.io\/.*/g)" icon="simple-icons:itchdotio"/>
    <ProjectDefaultLink v-else/>

</template>
<script setup lang="ts">
import type {proj_entry_link} from "@/assets/projects";
import {type InjectionKey, provide} from "vue";
import ProjectDefaultLink from "@/components/content/Projects/ProjectDefaultLink.vue";
import ProjectReIconLink from "@/components/content/Projects/ProjectReIconLink.vue";

const props = defineProps<{ value: proj_entry_link }>()
const key = Symbol() as InjectionKey<string>
provide("link", props.value)

</script>
<style scoped lang="scss">

</style>