<template>
    <TopSticky>
        <h1 class="no-vmar">
            <NavLink :hash="props.section_id" :heading="no_heading?undefined:(props.heading??0)"><slot></slot></NavLink>
        </h1>
    </TopSticky>
</template>

<script lang="ts" setup>
import TopSticky from "@/components/core/TopSticky.vue";
import NavLink from "@/components/core/NavLink.vue";

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
    //transition: font-size 1s ease;
}
[stuck] > div > h1{
    color: var(--txt-a-tinted);
    background: none;
    font-size: 1em;

    position: relative;
    top: 1px;
}
</style>
