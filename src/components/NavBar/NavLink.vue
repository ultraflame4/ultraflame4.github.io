<template>
<NavItem>
  <router-link :to="href" class="nav-link">
    <slot></slot>
    <div class="nav-link-underline"></div>
  </router-link>
</NavItem>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavItem from "@/components/NavBar/NavItem.vue";

export default defineComponent({
  name: "NavLink",
  components: {NavItem},
  props:{
    href:{
      type: String,
      default: "/404"
    }
  },

})
</script>

<style lang="scss">
@use "src/assets/colors" as colors;
.nav-link{
  position: relative;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.2px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.nav-link-underline{
  position: absolute;
  bottom: -1px;
  right: 0;
  left: auto;
  height: 2px;
  width: 0;
  background-color: colors.$accent-1;
  transition-property: width;
}

.nav-link:hover>.nav-link-underline{
  left: 0;
  right: auto;
  width: 100%;
}



</style>