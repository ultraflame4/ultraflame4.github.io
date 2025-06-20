<template>

    <ProjectReIconLink v-if="isGithubRelease(value.url)"
                       icon="ph:archive-box-fill"/>
    <ProjectReIconLink v-else-if="isItchio(value.url)" icon="simple-icons:itchdotio"/>
    <ProjectDefaultLink v-else/>

</template>
<script setup lang="ts">
import type {proj_entry_link} from "@/lib/project_utils";
import {type InjectionKey, provide} from "vue";
import ProjectDefaultLink from "./ProjectDefaultLink.vue";
import ProjectReIconLink from "./ProjectReIconLink.vue";
import {isGithubRelease, isItchio} from "@/lib/tools/url-utils";

const props = defineProps<{ value: proj_entry_link }>()
const key = Symbol() as InjectionKey<string>
provide("link", props.value)

</script>
<style scoped lang="scss">

</style>