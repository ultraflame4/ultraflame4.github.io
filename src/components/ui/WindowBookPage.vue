<template>

    <div class="flex flex-col gap-[2px] h-full" :id="props.id">
        <div class="grow markdown  bg-background overflow-hidden">
            <div class="h-full overflow-auto px-4 py-2">
                <div class="prose prose-invert">
                    <slot></slot>
                </div>
            </div>

        </div>
        <div v-if="props.prev_id !== undefined || props.next_id !== undefined" class="h-16 flex gap-[2px] page-nav">
            <a v-if="props.prev_id !== undefined" :href="'#' + props.prev_id">Prev</a>
            <a v-if="props.next_id !== undefined" :href="'#' + props.next_id">Next</a>
        </div>
    </div>
</template>
<script lang="ts" setup>
export interface WindowBookPageProps {
    id: string,
    prev_id?: string
    next_id?: string
}
const props = defineProps<WindowBookPageProps>()

</script>
<style scoped>
@reference "@/styles/global.css";

.page-nav>a {
    @apply bg-background grow flex items-center justify-center font-fancy hover:bg-hover active:bg-accent active:text-crust select-none;
}
</style>