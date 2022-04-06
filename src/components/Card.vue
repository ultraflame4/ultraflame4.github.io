<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "Card"
})
</script>

<style lang="scss">
@use "src/assets/index";
.card {
  @extend .windowframe-shadow;
  background-color: rgba(white,95%);
  padding: 16px;
  border-radius: 14px;
}
</style>