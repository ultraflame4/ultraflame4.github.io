<template>
    <!-- <TopSticky> -->
        
        <!-- {{ iratio.isVisible }} -->
        <h1 class="no-vmar section-title" v-iratio="iratio">
        
            <HashLink :hash="section_id">
                <slot></slot>
            </HashLink>
        </h1>
    <!-- </TopSticky> -->
</template>

<script lang="ts" setup>
// import TopSticky from "@/components/core/TopSticky.vue";
import NavLink from "@/components/core/NavLink.vue";

import {iRatioObject} from "vyue42";
import {  injectPageSectionsCtx } from "@/components/navigation/PageContext.vue";
import HashLink from "../navigation/HashLink.vue";
import { inject, watch } from "vue";

const iratio = new iRatioObject({
    exit: true,
    invert: false,
    thresholds: 1
    
})
interface iProps {
    /**
     * This will be the name displayed in the nav tree if this is a heading
     */
    name?: string
    /**
     * The heading number passed to HashLink. Defaults to 0.
     * If dont want to use heading, set no-heading to false
     */
    heading?: number
    /**
     * If do not want to use heading, set this to false
     */
    no_heading?: boolean

    /**
     * Section id of section. Will override data provided by provide("section_id")
     */
    section_id?: string
}

const props = defineProps<iProps>()
const pageSections = injectPageSectionsCtx();


const section_id = props.section_id ?? inject<string>("section_id")
if (section_id){
    pageSections?.addSection(props.name??section_id,section_id, props.heading??0)
}
else{
    console.error(`Could not identify section id for section title: ${props.name}, heading: ${props.heading}!`)
}

</script>

<style lang="scss" scoped>
h1 {
    // background-color: var(--bg-0);
    padding: 1rem;
}

[stuck] > div > h1 {
    color: var(--txt-a-tinted);
    background: none;
    font-size: 1em;
    @media only screen and (max-width: 650px) {
        font-size: 1.25em;
    }
    position: relative;

}


</style>
