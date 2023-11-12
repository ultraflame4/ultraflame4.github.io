<template>
    <ProjectDefaultLink/>
</template>
<script setup lang="ts">
import type {proj_entry_link} from "@/assets/projects";
import {type InjectionKey, provide} from "vue";
import ProjectDefaultLink from "@/components/content/Projects/ProjectDefaultLink.vue";
const props = defineProps<{value:proj_entry_link}>()
const key = Symbol() as InjectionKey<string>
provide("link",props.value)

</script>
<style scoped lang="scss">

</style>