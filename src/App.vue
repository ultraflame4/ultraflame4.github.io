<script setup lang="ts">

import NavBar from "@/components/NavBar/NavBar.vue";
import NavTitle from "@/components/NavBar/NavTitle.vue";
import NavText from "@/components/NavBar/NavText.vue";
import NavGroup from "@/components/NavBar/NavGroup.vue";
import NavLink from "@/components/NavBar/NavLink.vue";
</script>

<template>

    <NavBar :stickTop=true>
      <NavTitle>ultr<span id="titles1">4</span>2</NavTitle>
      <NavGroup align="end">
        <NavLink>About</NavLink>
        <NavLink>Projects</NavLink>
        <NavLink>Contact</NavLink>
        <NavLink>Others</NavLink>
      </NavGroup>
    </NavBar>


  <router-view></router-view>

</template>

<style lang="scss">
@use "assets/colors.scss" as colors;
#titles1{
  color: colors.$accent-1;
}

</style>
