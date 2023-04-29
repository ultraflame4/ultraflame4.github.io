<template>
    <a @click="push()">
        <Icon icon="fa6-solid:hashtag" :inline="true" class="icon"/>
        <div class="txt">
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
    heading?: number
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

.txt {
  display: inline-block;
  margin-left: 0.5rem;
  position: relative;
  overflow: visible;

  & > * {
    margin: 0;
  }

}

.txt::after {
  overflow: visible;
  content: "";
  position: absolute;

  right: 0;
  top: 95%;
  border-radius: 1rem;
  height: 0.25rem;
  width: 0;
  transition: width 150ms ease;
  background: var(--accent);

}

a:hover > .txt::after {
  left: 0;
  right: auto;
  width: 100%;
}

.icon {
  color: var(--accent);
  height: 100%;
  position: relative;
  top: 0.05rem;
}

</style>
