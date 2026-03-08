<template>
    <div v-for="article in articles" class="w-full lg:w-4xl block bg-background" :href="article.canonical_url">
        <UserArticleContent :article_brief="article" />
    </div>
</template>
<script lang="ts" setup>
import { SpotlightBackground } from '@/components/effects';
import { devto } from '@/lib/external/devto_api';
import UserArticleContent from './UserArticleContent.vue';

const props = defineProps<{
    username: string
}>()

const articles = await devto.articles.search(props.username)

</script>
<style></style>