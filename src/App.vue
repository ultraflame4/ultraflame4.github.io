<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Footer from "@/components/Footer.vue";
</script>

<template>

  <router-view></router-view>
  <Footer></Footer>
</template>

<style lang="sass">
@import "assets/globals"
body
  background-color: $color-dark2


#app
  @extend .box-0
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  width: 100%
  height: 100vh
  overflow-y: auto


</style>
