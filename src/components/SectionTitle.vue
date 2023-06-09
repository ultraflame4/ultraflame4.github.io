<template>
    <TopSticky >
        <h1 class="no-vmar">
            <HashLink to="featured" :heading="0"><slot></slot></HashLink>
        </h1>
    </TopSticky>
</template>

<script lang="ts" setup>
import TopSticky from "@/components/TopSticky.vue";
import HashLink from "@/components/HashLink.vue";



</script>

<style lang="scss" scoped>
[stuck] > div > h1{
    //color: var(--txt-a-tinted);
    font-size: 1em;
    position: relative;

}
</style>
