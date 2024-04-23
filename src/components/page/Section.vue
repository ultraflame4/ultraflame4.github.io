<template>
    <section v-iratio="iratio" :id="props.id">
        <slot></slot>
    </section>
</template>

<script lang="ts" setup>
// import TopSticky from "@/components/core/TopSticky.vue";
import NavLink from "@/components/core/NavLink.vue";

import {iRatioObject} from "vyue42";
import {  injectPageSectionsCtx } from "@/components/navigation/PageContext.vue";
import HashLink from "../navigation/HashLink.vue";
import { provide, watch } from "vue";

const iratio = new iRatioObject({
    exit: true,
    invert: false,
    thresholds: 0.2
    
})
interface iProps {
    /**
     * The id of this section
     */
    id: string
}

const props = defineProps<iProps>()
const pageSections = injectPageSectionsCtx();
// pageSections?.addSection(props.name??props.id,props.id, props.heading??0)
watch([iratio.isVisible], ([v])=>{
    pageSections?.setSectionActive(props.id, v)
})

provide("section_id", props.id)


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
