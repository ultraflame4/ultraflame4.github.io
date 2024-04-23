<template>

  <slot></slot>
</template>

<script lang="ts">
import { inject } from "vue";
import { injectNavCtx } from "@/components/navigation/NavigationContext.vue";
export interface PageSectionsCtx {
  addSection: (title: string, id: string, level: number) => void;
  setSectionActive: (id: string, active: boolean) => void;
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

const sections = ref<PageSection[]>([]);
const active_section_ids = ref<string[]>([]);

const nav_ctx = injectNavCtx();

function addSection(title: string, id: string, level: number) {
  sections.value.push({
    title,
    id,
    level,
  });
  nav_ctx?.updatePageSections(sections.value);
}

function setSectionActive(id: string, active: boolean) {
  if (active) {
    if (!active_section_ids.value.includes(id))
      active_section_ids.value.push(id);

  } else if (active_section_ids.value.includes(id)) {
    active_section_ids.value.splice(active_section_ids.value.indexOf(id), 1);
  }

  nav_ctx.updateActiveSectionIds(active_section_ids.value)
}

provide<PageSectionsCtx>(PROVIDE_PAGESECTIONS, {
  addSection,
  setSectionActive,
});
</script>
<style lang="scss"></style>
