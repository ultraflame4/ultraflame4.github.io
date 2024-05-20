<template>

  <slot></slot>
</template>

<script lang="ts">
import { inject } from "vue";
import { injectNavCtx } from "@/components/navigation/NavigationContext.vue";
export interface PageSectionsCtx {
  addSection: (title: string, id: string, level: number) => void;
  /**
   * Update section visibility data
   * @param id Id of section
   * @param visible Whether section is visible
   * @param dist_from_centre Distance of section centre from element centre to viewport centre
   */
  updateSectionVisibility: (id: string, visible: boolean, dist_from_centre: number) => void;
}
export const PROVIDE_PAGESECTIONS = "page-sections";

export interface PageSection {
  title: string;
  id: string;
  level: number;
}

export function injectPageSectionsCtx(): PageSectionsCtx | undefined {
  return inject(PROVIDE_PAGESECTIONS);
}
</script>

<script setup lang="ts">
import { provide, ref } from "vue";

interface ActiveSection {
  id: string,
  dist: number,
}

const sections = ref<PageSection[]>([]);
const active_sections = ref<ActiveSection[]>([]);

const nav_ctx = injectNavCtx();
nav_ctx?.updatePageSections([]);
nav_ctx?.updateActiveSectionIds([])

function addSection(title: string, id: string, level: number) {
  sections.value.push({
    title,
    id,
    level,
  });
  nav_ctx?.updatePageSections(sections.value);
}

function updateSectionVisibility(id: string, visible: boolean, dist_from_centre: number) {
  // console.log(`${id} - ${active}, ${dist_from_centre}`)
  // if visible, check if already active, otherwise add
  if (visible) {
    let active_section = active_sections.value.find((x)=>x.id==id);

    if (active_section){
      active_section.dist = dist_from_centre
    }
    else{
      active_sections.value.push({id,dist: dist_from_centre});
    }

    // If not visible remove from active list
  } else{
    let active_section_index = active_sections.value.findIndex((x)=>x.id==id);
    if (active_section_index != -1) active_sections.value.splice(active_section_index, 1);
  }

  // Sort active sections by their distance to centre
  active_sections.value.sort((a,b) => a.dist - b.dist)

  nav_ctx.updateActiveSectionIds(active_sections.value)
}

provide<PageSectionsCtx>(PROVIDE_PAGESECTIONS, {
  addSection,
  updateSectionVisibility,
});
</script>
<style lang="scss"></style>
