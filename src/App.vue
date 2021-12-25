<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import NavHeader from './components/NavHeader/NavHeader.vue'
</script>

<template>
  <NavHeader></NavHeader>
</template>

<style lang="sass">
@import "assets/globals"
#app
  @extend .box-0
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

</style>
