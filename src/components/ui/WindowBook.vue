<template>
    <!-- This component is to render a window -->
    <!-- Sidebar contains tabs to each chapter -->
    <!-- Content of window should render markdown -->

    <WindowCard title="About" :id="props.id">

        <WindowCardPanel asChild>
            <div class="w-full h-full flex">
                <template v-if="props.sections">
                    <div class="min-w-[150px] h-full transition-none flex flex-col bg-background mobile-collapse"
                        ref="sidebar" :style="sidebar_style">
                        <ul class="w-full">
                            <li v-for="entry in props.sections" class="h-8 w-full">
                                <RouteAnchor :to="entry.href"
                                    class="flex gap-1 text-sm items-center font-mono px-2 h-full hover:bg-hover data-[active=true]:bg-highlight w-full">
                                    <Icon v-if="entry.icon" :icon="entry.icon" />
                                    <span>{{ entry.title }}</span>
                                </RouteAnchor>
                            </li>
                        </ul>
                    </div>
                    <ResizeHandle axis="x" class="w-[2px]" @resize="(x, y) => sidebar_size += x"
                        @reset="sidebar_clamp_size()"></ResizeHandle>
                </template>

                <div class="min-h-full p-2 bg-background h-full grow grid" style="grid-template-rows: auto 1fr;">
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

export interface WindowBookProps {
    id?: string,
    /**
     * Selector of Parent element to scroll to on page load if location hash points to one of the pages (or element) in WindowBook
     */
    root?: string,
    sections?: {
        title: string,
        icon?: string,
        href: string
    }[]
}

const props = defineProps<WindowBookProps>()

const sidebar = useTemplateRef("sidebar")
const sidebar_max = computed(() => sidebar.value?.parentElement?.getBoundingClientRect().width)

const sidebar_size = ref<number>(150)
const sidebar_style = computed<CSSProperties>(() => ({
    width: `min(max(${sidebar_size.value}px, 150px), 50vw)`
}))

function sidebar_clamp_size() {
    sidebar_size.value = Math.min(Math.max(sidebar_size.value, 150), sidebar_size.value ?? 0)
}


</script>
<style></style>