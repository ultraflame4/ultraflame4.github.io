<template>
    <template v-if="!props.asChild">
        <div class="col-span-3 flex min-h-full p-2 bg-background h-full grow">
            <slot></slot>
        </div>
    </template>
    <template v-else>
            <slot></slot>
    </template>
</template>
<script lang="ts" setup>

const props = defineProps<{ asChild?: boolean }>()

</script>
<style></style>