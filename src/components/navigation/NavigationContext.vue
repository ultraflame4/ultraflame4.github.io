<template>
  <slot></slot>
</template>

<script lang="ts">
import { inject, type Ref } from "vue";
import type { PageSection } from "./PageContext.vue";
export interface NavigationContext {
  current_page_sections: Ref<PageSection[]>;
  active_section_ids: Ref<string[]>;
  active_section_id: ()=>string|undefined;
  updatePageSections: (sections: PageSection[]) => void;
  updateActiveSectionIds: (active_section_ids: string[]) => void;
}
export const PROVIDE_NAVCTX = "navigation-data-context";

export function injectNavCtx(): NavigationContext {
  return inject(PROVIDE_NAVCTX, {
    current_page_sections: ref([]),
    updatePageSections: () => {},
  });
}
</script>

<script setup lang="ts">
import { provide, ref } from "vue";

const current_page_sections = ref<PageSection[]>([]);
const active_section_ids = ref<string[]>([]);

function updatePageSections(sections: PageSection[]) {
  current_page_sections.value = sections;
}

function updateActiveSectionIds(_active_section_ids: string[]) {
  active_section_ids.value = _active_section_ids;
}

provide<NavigationContext>(PROVIDE_NAVCTX, {
  current_page_sections,
  active_section_ids,
  active_section_id: ()=>active_section_ids.value[0],
  updatePageSections,
  updateActiveSectionIds,
});
</script>
<style lang="scss"></style>
