<template>
    <a v-for="article in articles" class="w-full block my-px bg-background" :href="article.canonical_url">
        <article class="p-4 h-48 flex flex-col">
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
    </a>
</template>
<script lang="ts" setup>
import { devto } from '@/lib/external/devto_api';

const props = defineProps<{
    username: string
}>()

const articles = await devto.articles.search(props.username)

</script>
<style></style>