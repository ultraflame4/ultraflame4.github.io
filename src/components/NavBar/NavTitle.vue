<template>
  <NavText >
    <h1 class="nav-title"><slot></slot></h1>
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
.nav-title{
  //font-weight: 600;
  //font-size: 24px;
}
</style>