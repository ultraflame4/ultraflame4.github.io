<template>
  <ul class="navbar-items" :style="{justifySelf:align}">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"

export default defineComponent({
  name: "NavGroup",
  props:{
    align:{
      type: String as PropType<"start" | "center" | "end">,
      default: "start",
    }
  }
})
</script>

<style lang="scss">
.navbar-items {
  display: flex;
  width: fit-content;
  margin: 0;
  margin-left: auto;
  padding: 0;
}

</style>