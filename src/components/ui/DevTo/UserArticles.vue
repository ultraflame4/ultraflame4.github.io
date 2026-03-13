<template>
    <!-- <div v-for="article in articles" class="w-full lg:w-4xl block bg-background mb-4" :href="article.canonical_url">
        <UserArticleContent :article_brief="article" />
    </div> -->

    <section class="bg-background w-full p-4 pt-(--header-spacing) h-svh" id="blog-posts">
        <div class="max-w-400 w-full h-full">
            <WindowBook :sections="book_sections" title="Recent Posts" sidebar_heading="Log Entries"
                sidebar_class="min-w-64" @section-change="update_article()">
                <WindowCardPanel class="overflow-auto">
                    <UserArticleContent :article_brief="selected_article" should_load class="w-full">

                    </UserArticleContent>
                </WindowCardPanel>

            </WindowBook>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { devto } from '@/lib/external/devto_api';
import UserArticleContent from './UserArticleContent.vue';
import WindowBook, { type WindowBookSection } from '../WindowBook.vue';
import WindowBookPage from '../WindowBookPage.vue';
import { WindowCardPanel } from '..';
import { computed, ref, watch } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';

const props = defineProps<{
    username: string
}>()


const articles = await devto.articles.search(props.username)
const selected_article_index = ref(0)
const selected_article = computed(() => articles[selected_article_index.value])
const book_sections = articles.map(x => {

    const created_at = new Date(x.created_at);
    return { title: `${created_at.toLocaleDateString()} - ${x.title}`, href: `?post=${x.id}` } satisfies WindowBookSection
})

function update_article() {

    const params = new URLSearchParams(location.search)
    selected_article_index.value = Math.max(articles.findIndex(x => x.id == +params.get('post')!), 0)

    setTimeout(() => {
        console.log("TESTT", selected_article.value.id, selected_article_index.value, params)
    }, 2)
}

</script>
<style></style>