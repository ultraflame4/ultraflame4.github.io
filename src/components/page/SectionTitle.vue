<template>
    <TopSticky>
        <h1 class="no-vmar">
            <HashLink to="featured" :heading="0"><slot></slot></HashLink>
        </h1>
    </TopSticky>
</template>

<script lang="ts" setup>
import TopSticky from "@/components/core/TopSticky.vue";
import HashLink from "@/components/core/HashLink.vue";



</script>

<style lang="scss" scoped>
h1{
    background-color: var(--bg-0);
}
[stuck] > div > h1{
    color: var(--txt-a-tinted);
    background: none;
    font-size: 1em;
    position: relative;
    top: 1px;
}
</style>
