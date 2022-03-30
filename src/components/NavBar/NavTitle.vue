<template>
  <NavText class="nav-title">
    <slot></slot>
  </NavText>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavText from "@/components/NavBar/NavText.vue";

export default defineComponent({
  name: "NavTitle",
  components: {NavText}
})
</script>

<style lang="scss">
.nav-title>.nav-text{
  font-weight: 600;
  font-size: 24px;
}
</style>