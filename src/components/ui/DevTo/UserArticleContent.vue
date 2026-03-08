<template>
    <article class="p-4 flex flex-col bg-background">
        <header class="relative">
            <h1 class="text-2xl font-fancy">{{ article_brief.title }}</h1>

            <ul class="flex gap-1" v-if="article_brief.tag_list.length > 0">
                <ol v-for="tag in article_brief.tag_list">#{{ tag }}</ol>
            </ul>
            <button v-if="loaded_article"
                class="w-fit underline text-dimmed font-fancy hover:text-accent active:text-accent cursor-pointer my-2 top-0 right-0 absolute"
                @click="loaded_article = undefined" :disabled="loading">
                Close
            </button>
        </header>

        <div v-if="loaded_article" v-html="loaded_article.body_html" class="markdown">

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

        <footer class="text-dimmed text-xs ">

            <span>
                Created: {{ new Date(article_brief.created_at).toLocaleDateString() }}
            </span>
            <span v-if="article_brief.edited_at" class="ml-2">
                Edited: {{ new Date(article_brief.edited_at).toLocaleDateString() }}
            </span>
        </footer>
    </article>

</template>
<script lang="ts" setup>
import { devto } from '@/lib/external/devto_api';
import { ref } from 'vue';

const props = defineProps<{
    article_brief: devto.Article,
    should_load?: boolean
}>()

const loaded_article = ref<devto.Article>()
const loading = ref(false)


async function load_article() {
    if (loading.value) return
    loading.value = true
    loaded_article.value = await devto.articles.fetch_detailed(props.article_brief.id)
    loading.value = false
}
if (props.should_load) {
    load_article()
}
</script>
<style></style>