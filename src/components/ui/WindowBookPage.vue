<template>

    <div class="h-full markdown px-4 py-2" :id="props.id">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
export interface WindowBookPageProps{
    id: string
}
const props = defineProps<WindowBookPageProps>()

</script>
<style></style>