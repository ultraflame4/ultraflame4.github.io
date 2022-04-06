<template>
  <h2 class="section-heading">
    <slot></slot>
  </h2>
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
  font-size: 14px;
  //top: -10px
  margin-bottom: 24px;
}
</style>