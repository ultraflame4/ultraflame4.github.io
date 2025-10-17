<template>
    <div class="p-4">
        <div class="bg-highlight p-[1px] flex flex-col gap-[1px]">
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

onMounted(async () => {
    const res = await fetch(props.feedurl)
    const feed = htmlparser2.parseFeed(await res.text());
    if (feed == null) return;
    items.value = feed.items.slice(0, props.max_items ?? 10)
})

</script>
<style></style>