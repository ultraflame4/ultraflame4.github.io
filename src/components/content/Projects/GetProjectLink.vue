<template>

    <ProjectReIconLink v-if="isGithubRelease(value.url)"
                       icon="ph:archive-box-fill"/>
    <ProjectReIconLink v-else-if="isItchio(value.url)" icon="simple-icons:itchdotio"/>
    <ProjectDefaultLink v-else/>

</template>
<script setup lang="ts">
import type {proj_entry_link} from "@/assets/projects";
import {type InjectionKey, provide} from "vue";
import ProjectDefaultLink from "@/components/content/Projects/ProjectDefaultLink.vue";
import ProjectReIconLink from "@/components/content/Projects/ProjectReIconLink.vue";
import {isGithubRelease, isItchio} from "@/tools/url-utils";
import * as url from "url";

const props = defineProps<{ value: proj_entry_link }>()
const key = Symbol() as InjectionKey<string>
provide("link", props.value)

</script>
<style scoped lang="scss">

</style>