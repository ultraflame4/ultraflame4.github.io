<template>
    <WindowCard :title="article_brief.title" :alt-close-btn="!data?.active" @close-pressed="toggle()">
        <article class="px-4 py-2 flex flex-col bg-background">

            <header class="flex text-dimmed gap-2 items-center">
                <ul class="flex gap-1" v-if="article_brief.tag_list.length > 0">
                    <ol v-for="tag in article_brief.tag_list">#{{ tag }}</ol>
                </ul>
                <span v-if="article_brief.edited_at" class="ml-auto text-xs">
                    Last edit: {{ new Date(article_brief.edited_at).toLocaleDateString() }}
                </span>
                <span class="text-xs">
                    Published: {{ new Date(article_brief.created_at).toLocaleDateString() }}
                </span>

            </header>

            <div v-if="data && data.active" v-html="data.article.body_html" class="markdown">

            </div>
            <template v-else>
                <p class="my-2">
                    {{ article_brief.description }}
                </p>
                <button
                    class="w-fit underline text-dimmed font-fancy hover:text-accent active:text-accent cursor-pointer my-2"
                    @click="load_article()" :disabled="loading">
                    <span v-if="loading">Loading...</span>
                    <span v-else>Read More</span>
                </button>
            </template>


        </article>

    </WindowCard>

</template>
<script lang="ts" setup>
import { devto } from '@/lib/external/devto_api';
import { ref } from 'vue';
import WindowCard from '../WindowCard.vue';

const props = defineProps<{
    article_brief: devto.Article,
    should_load?: boolean
}>()

const data = ref<{ article: devto.Article, active: boolean }>()
const loading = ref(false)

async function toggle() {
    if (data.value == undefined) { await load_article(); return }
    data.value.active = !data.value.active
}

async function load_article() {
    if (loading.value) return
    loading.value = true
    data.value = {
        article: await devto.articles.fetch_detailed(props.article_brief.id),
        active: true
    }
    loading.value = false
}
if (props.should_load) {
    load_article()
}
</script>
<style></style>