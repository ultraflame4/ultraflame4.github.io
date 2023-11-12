<template>
    <ProjectDefaultLink/>
</template>
<script setup lang="ts">
import {inject, provide} from "vue";
import type {proj_entry_link} from "@/assets/projects";
import ProjectDefaultLink from "@/components/content/Projects/ProjectDefaultLink.vue";

interface props_{
    icon: string
}

const props = defineProps<props_>();
const value = inject("link") as proj_entry_link
value.icon = props.icon
const value_ = provide("link", value)


</script>
<style scoped lang="scss">
iframe{
    //transform: scale(0.5);
}
</style>