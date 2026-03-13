<template>
    <!-- <div v-for="article in articles" class="w-full lg:w-4xl block bg-background mb-4" :href="article.canonical_url">
        <UserArticleContent :article_brief="article" />
    </div> -->

    <section class="bg-background w-full p-4 pt-(--header-spacing) h-svh" id="blog-posts">
        <div class="max-w-7xl w-full h-full">
            <WindowBook :sections="book_sections" title="Posts" sidebar_heading="files">
                <WindowCardPanel>
                    tes
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

const props = defineProps<{
    username: string
}>()

const articles = await devto.articles.search(props.username)
const book_sections = articles.map(x => ({ title: x.title, href: `?post=${x.id}` }) satisfies WindowBookSection)

</script>
<style></style>