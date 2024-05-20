<template>
    <section v-iratio="iratio" :id="props.id" ref="el">
        <slot></slot>
    </section>
</template>

<script lang="ts" setup>
// import TopSticky from "@/components/core/TopSticky.vue";
import NavLink from "@/components/core/NavLink.vue";

import { iRatioObject } from "vyue42";
import { injectPageSectionsCtx } from "@/components/navigation/PageContext.vue";
import HashLink from "../navigation/HashLink.vue";
import { provide, ref, watch } from "vue";
import { injectAppCtx } from "@/App.vue";


const el = ref<HTMLElement | null>(null)

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
const appCtx = injectAppCtx();
if (appCtx) {
    watch(appCtx.scroll_y, (scroll_y) => {
        if (!el.value) return
        let vrect = el.value.getBoundingClientRect()
        let vcentre = vrect.top + vrect.height / 2;

        let viewport_centre = window.innerHeight / 2;
        let dist = Math.abs(viewport_centre - vcentre)

        // If content is bigger than view port, then just use the top or bottom distance whichever is smaller.
        if (vrect.height > window.innerHeight){
            let top_dist = vrect.top;
            let bottom_dist = vrect.bottom;
            dist = Math.min(top_dist,bottom_dist)
        }
        

        pageSections?.updateSectionVisibility(props.id, iratio.isVisible.value, dist)
    })
}

provide("section_id", props.id)


</script>

<style lang="scss" scoped>
h1 {
    // background-color: var(--bg-0);
    padding: 1rem;
}

[stuck]>div>h1 {
    color: var(--txt-a-tinted);
    background: none;
    font-size: 1em;

    @media only screen and (max-width: 650px) {
        font-size: 1.25em;
    }

    position: relative;

}
</style>
