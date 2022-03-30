<template>
  <li class="navitem">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "NavItem"
})
</script>

<style lang="scss">
.navitem{
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  margin: 0;
  width: fit-content;
}
</style>