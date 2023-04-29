<template>
    <a @click="push()">
        <Icon v-if="!noicon" icon="vaadin:hash" :inline="true" class="icon"/>
        <div class="parent_hover-underline">
            <slot>

            </slot>
        </div>
    </a>
</template>

<script lang="ts" setup>

import {Icon} from "@iconify/vue";
import router from "@/router";
import {PageNavTree} from "@/router/page_navtree";

interface iprops {
    /**
     * Path with hash
     */
    to: string
    /**
     * Indicates that this hashlink is a heading, this would add it to the current page navigation tree.
     */
    heading?: number,
    noicon?:boolean
}

const props = defineProps<iprops>()

const to ={
    path: router.currentRoute.value.path,
    hash: "#" + props.to
}

PageNavTree.add({
    to:to,
    level:props.heading??0,
    name:props.to
})

function push() {
    router.push(to)
}

</script>

<style lang="scss" scoped>
a {
  letter-spacing: 0.1rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: calc(1em + 1rem);
  width: fit-content;
  overflow: visible;
}

a:hover {
  color: var(--txt-a);
}




.icon {
  color: var(--accent);
  height: 100%;
  position: relative;
  top: 0.05rem;
}

</style>
