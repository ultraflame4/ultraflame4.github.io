<script setup lang="ts">

import NavBar from "@/components/NavBar/NavBar.vue";
import NavTitle from "@/components/NavBar/NavTitle.vue";
import NavText from "@/components/NavBar/NavText.vue";
import NavGroup from "@/components/NavBar/NavGroup.vue";
</script>

<template>
  <header>
    <NavBar>
      <NavTitle>Ultr<span id="titles1">4</span>2</NavTitle>
      <NavGroup align="end">
        <NavText>test</NavText>
        <NavText>test</NavText>
        <NavText>test</NavText>
        <NavText>test</NavText>
      </NavGroup>
    </NavBar>
  </header>
  <router-view></router-view>

</template>

<style lang="scss">
@use "assets/colors.scss" as colors;
#titles1{
  color: colors.$accent-1;
}

</style>
