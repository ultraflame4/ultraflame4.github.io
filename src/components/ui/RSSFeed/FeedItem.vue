<template>
    <a class="bg-background relative hover:outline-primary outline-1 outline-transparent group overflow-hidden"
        :id="item.id" :href="item.link">

        <article class="p-3 overflow-hidden ">
            <h1 class="text-2xl font-bold text-bright ">{{ item.title ?? "Untitled Article" }} </h1>
            <div class="text-xs text-dimmed font-mono my-1">
                <span>Published {{ item.pubDate?.toLocaleDateString() ?? 'Unknown' }}</span>
            </div>
            <div class="preview prose prose-invert min-h-32 max-h-48 max-w-none" v-html="item.description">

            </div>
        </article>
        <div class="bg-gradient-to-b to-black from-transparent h-32 group-hover:h-[200%] w-full absolute bottom-0">
        </div>
        <p
            class="opacity-0 group-hover:opacity-100 group-hover:translate-0 absolute inset-0 flex items-center justify-center font-fancy text-2xl translate-y-50">
            Open content
        </p>

        <!-- <div class="absolute bottom-2 right-2 lowercase text-sm">
            <a :href="item.link" class="hover:text-bright text-dimmed" title="View content from dev.to">dev.to</a>
        </div> -->
    </a>
</template>
<script lang="ts" setup>
import * as htmlparser2 from "htmlparser2";
const props = defineProps<{ item: htmlparser2.DomUtils.FeedItem }>()

</script>
<style scoped></style>