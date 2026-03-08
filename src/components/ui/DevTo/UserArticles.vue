<template>
    <a v-for="article in articles" class="w-full lg:w-4xl block bg-background" :href="article.canonical_url">
        <SpotlightBackground class="p-px">
            <article class="p-4 flex flex-col bg-background">
                <header>
                    <h1 class="text-2xl font-fancy">{{ article.title }}</h1>

                    <ul class="flex gap-1" v-if="article.tag_list.length > 0">
                        <ol v-for="tag in article.tag_list">#{{ tag }}</ol>
                    </ul>

                </header>
                <div class="my-2">
                    {{ article.description }}
                </div>
                <footer class="text-dimmed text-xs mt-auto">
                    <span>
                        Created: {{ new Date(article.created_at).toLocaleDateString() }}
                    </span>
                    <span v-if="article.edited_at" class="ml-2">
                        Edited: {{ new Date(article.edited_at).toLocaleDateString() }}
                    </span>
                </footer>
            </article>
        </SpotlightBackground>
    </a>
</template>
<script lang="ts" setup>
import { SpotlightBackground } from '@/components/effects';
import { devto } from '@/lib/external/devto_api';

const props = defineProps<{
    username: string
}>()

const articles = await devto.articles.search(props.username)

</script>
<style></style>