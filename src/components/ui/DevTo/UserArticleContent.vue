<template>
    <article class="px-4 py-2 flex flex-col bg-background">

        <header class=" text-dimmed grid grid-cols-2 items-center">
            <span class="text-xs ">
                Published: {{ new Date(article_brief.created_at).toLocaleDateString() }}
            </span>
            <span v-if="article_brief.edited_at" class="text-xs ml-auto">
                Last edit: {{ new Date(article_brief.edited_at).toLocaleDateString() }}
            </span>
            <span v-else></span>

            <h1 class="text-3xl col-span-2 text-bright font-bold my-2">
                {{ article_brief.title }}
            </h1>
            <ul class="flex gap-1 col-span-2" v-if="article_brief.tag_list.length > 0">
                <ol v-for="tag in article_brief.tag_list">#{{ tag }}</ol>
            </ul>

        </header>
        <hr class="my-4 opacity-30" />
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
</template>
<script lang="ts" setup>
import { devto } from '@/lib/external/devto_api';
import { onMounted, onUpdated, ref, watch } from 'vue';

const props = defineProps<{
    article_brief: devto.Article,
    should_load?: boolean
}>()

const data = ref<{ article: devto.Article, active: boolean }>()
const loading = ref(false)

watch(props, () => {
    if (props.should_load) {
        load_article()
    }
}, { immediate: true })

async function load_article() {
    if (loading.value) return
    loading.value = true
    data.value = {
        article: await devto.articles.fetch_detailed(props.article_brief.id),
        active: true
    }
    loading.value = false
}

</script>
<style></style>