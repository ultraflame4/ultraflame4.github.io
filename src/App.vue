<script setup lang="ts">

import Header from "@/components/Misc/Header.vue";
import Footer from "@/components/Misc/Footer.vue";
</script>

<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style lang="scss">
@use "assets/colors.scss" as colors;


</style>
