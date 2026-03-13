<template>
    <!-- This component is to render a window -->
    <!-- Sidebar contains tabs to each chapter -->
    <!-- Content of window should render markdown -->

    <WindowCard :title="props.title ?? 'Unnamed'" :id="props.id">

        <WindowCardPanel asChild>
            <div class="w-full h-full flex min-w-0 overflow-hidden">
                <template v-if="props.sections">
                    <div class="min-w-[150px] h-full transition-none flex flex-col mobile-collapse" ref="sidebar"
                        :style="sidebar_style">
                        <ul class="w-full shrink-0">
                            <li class="w-full bg-background mb-px px-2 p-1.5 font-mono font-bold uppercase text-xs tracking-wider text-dimmed"
                                v-if="props.sidebar_heading">
                                <span>{{ props.sidebar_heading }}</span>
                            </li>
                            <li v-for="entry in props.sections" class="h-8 w-full  bg-background ">
                                <RouteAnchor :to="entry.href"
                                    class="flex gap-1.5 text-xs items-center font-mono px-1.5 h-full w-full border border-transparent hover:bg-highlight data-[active=true]:bg-highlight data-[active=true]:border-primary ">
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
}

const props = defineProps<WindowBookProps>()

const sidebar = useTemplateRef("sidebar")
const sidebar_max = computed(() => sidebar.value?.parentElement?.getBoundingClientRect().width)

const sidebar_size = ref<number>(150)
const sidebar_style = computed<CSSProperties>(() => ({
    width: `min(max(${sidebar_size.value}px, calc(var(--spacing) * 90)), 50vw)`
}))

function sidebar_clamp_size() {
    sidebar_size.value = Math.min(Math.max(sidebar_size.value, 150), sidebar_size.value ?? 0)
}


</script>
<style></style>