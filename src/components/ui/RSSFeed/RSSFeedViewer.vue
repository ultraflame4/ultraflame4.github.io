<template>
    <div class="p-4 overflow-hidden w-full">
        <div class="bg-highlight p-[1px] flex flex-col gap-[1px] ">
            <p v-if="loading" class="p-4 bg-background">Loading...</p>
            <FeedItem v-for="item in items" :item="item"></FeedItem>
        </div>
    </div>
</template>
<script lang="ts" setup>
import * as htmlparser2 from "htmlparser2";
import { onMounted, ref } from "vue";
import FeedItem from "./FeedItem.vue";
const props = defineProps<{
    feedurl: string,
    /**
     * Defaults to 10
     */
    max_items?: number
}>()
const items = ref<htmlparser2.DomUtils.FeedItem[]>([])
const loading = ref(true)

onMounted(async () => {
    loading.value = true;
    const res = await fetch(props.feedurl)
    loading.value = false;
    const feed = htmlparser2.parseFeed(await res.text());
    if (feed == null) return;
    items.value = feed.items.slice(0, props.max_items ?? 10)
})

</script>
<style></style>