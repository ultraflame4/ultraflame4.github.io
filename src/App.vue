<script setup lang="ts">

import NavBar from "@/components/NavBar/NavBar.vue";
import NavTitle from "@/components/NavBar/NavTitle.vue";
import NavText from "@/components/NavBar/NavText.vue";
import NavGroup from "@/components/NavBar/NavGroup.vue";
import NavLink from "@/components/NavBar/NavLink.vue";
import ButtonFour from "@/components/ButtonFour.vue";
</script>

<template>

    <NavBar :stickTop=true>
      <NavTitle style="cursor: pointer;letter-spacing: 1px" @click="$router.push('/')">ultr<ButtonFour/>2</NavTitle>
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


</style>
