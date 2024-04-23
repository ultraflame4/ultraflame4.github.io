<template>
    <!-- <TopSticky> -->
        
        <!-- {{ iratio.isVisible }} -->
        <h1 class="no-vmar section-title" v-iratio="iratio">
        
            <HashLink :hash="props.section_id">
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
const iratio = new iRatioObject({
    exit: true,
    invert: false,
    thresholds: 1
    
})
interface iProps {
    /**
     * The id of this section
     */
    section_id: string
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
}

const props = defineProps<iProps>()
const pageSections = injectPageSectionsCtx();
pageSections?.addSection(props.name??props.section_id,props.section_id, props.heading??0)


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
