<template>
    <!-- <div v-for="article in articles" class="w-full lg:w-4xl block bg-background mb-4" :href="article.canonical_url">
        <UserArticleContent :article_brief="article" />
    </div> -->
    <WindowBook :sections="book_sections" class="p-0.5" title="Posts">
        <WindowBookPage  :id="`about`" class="m-px">
            test
        </WindowBookPage>
      
    </WindowBook>
</template>
<script lang="ts" setup>
import { devto } from '@/lib/external/devto_api';
import UserArticleContent from './UserArticleContent.vue';
import WindowBook, { type WindowBookSection } from '../WindowBook.vue';
import WindowBookPage from '../WindowBookPage.vue';

const props = defineProps<{
    username: string
}>()

const articles = await devto.articles.search(props.username)
const book_sections = articles.map(x => ({ title: x.title, href: `?post=${x.id}` }) satisfies WindowBookSection)

</script>
<style></style>