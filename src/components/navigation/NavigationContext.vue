<template>
    <slot></slot>
</template>

<script lang="ts"> 

import { inject, type Ref} from 'vue';
import type { PageSection } from './PageContext.vue';
export interface NavigationContext{
    current_page_sections: Ref<PageSection[]>,
    updatePageSections: (sections: PageSection[])=>void
}
export const PROVIDE_NAVCTX = "navigation-data-context"

export function injectNavCtx(): NavigationContext {
  
    return inject(PROVIDE_NAVCTX, {
        current_page_sections: ref([]),
        updatePageSections: ()=>{},
    })
}


</script>


<script setup lang="ts">
import {  provide, ref } from 'vue';

const current_page_sections = ref<PageSection[]>([])


function updatePageSections(sections: PageSection[]){
    current_page_sections.value = sections
}


provide<NavigationContext>(PROVIDE_NAVCTX,{
    current_page_sections,
    updatePageSections
})

</script>
<style lang="scss">
</style>