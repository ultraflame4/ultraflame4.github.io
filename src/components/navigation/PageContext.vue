<template>
    <!-- {{ sections }} -->
    <slot></slot>
</template>

<script lang="ts"> 

import { inject} from 'vue';
import {  injectNavCtx } from "@/components/navigation/NavigationContext.vue";
export interface PageSectionsCtx{
    addSection: (title: string, id: string, level: number)=>void;
}
export const PROVIDE_PAGESECTIONS = "page-sections"

export interface PageSection{
    title: string,
    id: string,
    level: number
}

export function injectPageSectionsCtx(): PageSectionsCtx | undefined{
  
    return inject(PROVIDE_PAGESECTIONS)
}


</script>


<script setup lang="ts">
import {  provide, ref } from 'vue';


const sections = ref<PageSection[]>([])

const nav_ctx = injectNavCtx()

function addSection(title: string, id: string, level: number){
    sections.value.push({
        title,
        id,
        level
    })
    nav_ctx?.updatePageSections(sections.value)
    
}

provide<PageSectionsCtx>(PROVIDE_PAGESECTIONS,{
    addSection
})

</script>
<style lang="scss">
</style>