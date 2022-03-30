<template>
  <nav class="navbar windowframe-shadow">
    <NavGroup class="navbar-rootgroup">
      <slot></slot>
    </NavGroup>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavGroup from "@/components/NavBar/NavGroup.vue";

export default defineComponent({
  name: "NavBar",
  components: {NavGroup}
})
</script>

<style lang="scss">

.navbar{
  display: flex;
  padding: 0 24px;
  height: 64px;
}

.navbar-rootgroup{
  width: min(100%,1200px);
  margin: auto;
}
</style>