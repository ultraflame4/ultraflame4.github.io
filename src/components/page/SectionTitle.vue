<template>
    <TopSticky>
        <h1 class="no-vmar">
            <HashLink :hash="props.section_id" :heading="no_heading?undefined:(props.heading??0)"><slot></slot></HashLink>
        </h1>
    </TopSticky>
</template>

<script lang="ts" setup>
import TopSticky from "@/components/core/TopSticky.vue";
import HashLink from "@/components/core/HashLink.vue";

interface iProps{
    /**
     * The id of this section
     */
    section_id:string
    /**
     * The heading number passed to HashLink. Defaults to 0.
     * If dont want to use heading, set no-heading to false
     */
    heading?:number
    /**
     * If do not want to use heading, set this to false
     */
    no_heading?:boolean
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
