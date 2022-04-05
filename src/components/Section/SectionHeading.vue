<template>
  <h4 class="section-heading">
    <slot></slot>
  </h4>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "SectionHeading"
})
</script>

<style lang="scss">
.section-heading {
  font-weight: 600;
  letter-spacing: 2px;
  position: relative;
  //top: -10px
  margin-bottom: 24px;
}
</style>