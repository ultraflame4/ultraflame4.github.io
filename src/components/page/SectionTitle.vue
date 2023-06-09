<template>
    <TopSticky>
        <h1 class="no-vmar">
            <HashLink :to="props.to" :heading="props.heading??0"><slot></slot></HashLink>
        </h1>
    </TopSticky>
</template>

<script lang="ts" setup>
import TopSticky from "@/components/core/TopSticky.vue";
import HashLink from "@/components/core/HashLink.vue";

interface iProps{
    /**
     * The link to this section
     */
    to:string
    /**
     * The heading number passed to HashLink. Defaults to 0
     */
    heading?:number
}
const props = defineProps<iProps>()


</script>

<style lang="scss" scoped>
h1{
    background-color: var(--bg-0);
    transition: font-size 150ms linear;
}
[stuck] > div > h1{
    color: var(--txt-a-tinted);
    background: none;
    font-size: 1em;

    position: relative;
    top: 1px;
}
</style>
