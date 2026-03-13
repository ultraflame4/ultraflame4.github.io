<template>
    <!-- This component is to render a window -->
    <!-- Sidebar contains tabs to each chapter -->
    <!-- Content of window should render markdown -->

    <WindowCard :title="props.title ?? 'Unnamed'" :id="props.id">

        <WindowCardPanel asChild>
            <div class="w-full h-full flex min-w-0 overflow-hidden">
                <template v-if="props.sections">
                    <div :class="'h-full transition-none flex flex-col mobile-collapse wbook-sidebar-size shrink-0 ' + props.sidebar_class"
                        ref="sidebar" :style="sidebar_style">
                        <ul class="w-full shrink-0">
                            <li class="w-full bg-background mb-px px-2 p-1.5 font-mono font-bold uppercase text-xs tracking-wider text-dimmed"
                                v-if="props.sidebar_heading">
                                <span>{{ props.sidebar_heading }}</span>
                            </li>
                            <li v-for="entry in props.sections" class="h-8 w-full bg-background ">
                                <RouteAnchor :to="entry.href" @click="$emit('section-change')"
                                    class="flex gap-1.5 text-xs items-center font-mono px-1.5 h-full w-full border border-transparent hover:bg-highlight data-active:bg-highlight data-[active=true]:border-primary ">
                                    <Icon v-if="entry.icon" :icon="entry.icon" />
                                    <span class="w-full text-ellipsis overflow-hidden">{{ entry.title }}</span>
                                </RouteAnchor>
                            </li>
                        </ul>
                        <div class="bg-background grow">

                        </div>
                    </div>
                    <ResizeHandle axis="x" class="w-0.5" @resize="(x, y) => sidebar_size += x"
                        @reset="sidebar_clamp_size()"></ResizeHandle>
                </template>

                <div class="min-h-full h-full grow min-w-0">
                    <HiddenAnchorCarousell client:load class="h-full overflow-hidden" :anchor_container="`#${props.id}`"
                        :root="props.root">
                        <slot></slot>
                    </HiddenAnchorCarousell>
                </div>
            </div>

        </WindowCardPanel>
    </WindowCard>
</template>
<script lang="ts" setup>
import { useTemplateRef, computed, ref, type CSSProperties } from 'vue';
import ResizeHandle from '../core/ResizeHandle.vue';
import WindowCard from './WindowCard.vue';
import WindowCardPanel from './WindowCardBody.vue';
import HiddenAnchorCarousell from '../core/HiddenAnchorCarousell.vue';
import RouteAnchor from '../core/RouteAnchor.vue';
import { Icon } from '@iconify/vue';

export interface WindowBookSection {
    title: string,
    icon?: string,
    href: string

}

export interface WindowBookProps {
    title?: string,
    id?: string,
    /**
     * Selector of Parent element to scroll to on page load if location hash points to one of the pages (or element) in WindowBook
     */
    root?: string,
    sidebar_heading?: string,
    sections?: WindowBookSection[]
    sidebar_class?: string
}

const props = defineProps<WindowBookProps>()

const sidebar = useTemplateRef("sidebar")
const sidebar_size = ref<number>(50)
const sidebar_style = computed<CSSProperties>(() => ({
    "--sidebar-size": `${sidebar_size.value}`

}))

function sidebar_clamp_size() {
    if (typeof window === "undefined") return;
    if (sidebar.value === null) return;
    // If current css width doesn't match the expected width. Change expected width to the one being shown.
    const curr_width = sidebar.value.getBoundingClientRect().width;
    if (sidebar_size.value != curr_width) {
        sidebar_size.value = curr_width
    }
}

const emits = defineEmits(['section-change'])

</script>
<style scoped>
.wbook-sidebar-size {
    --minsize: calc(var(--spacing) * 90);
    width: min(calc(var(--sidebar-size) * 1px), 50%);
}
</style>