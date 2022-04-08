<template>
<NavItem>
  <VLink class="nav-link" :href="href">
    <slot></slot>
  </VLink>
</NavItem>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavItem from "@/components/NavBar/NavItem.vue";
import VLink from "@/components/Misc/Link.vue";

export default defineComponent({
  name: "NavLink",
  components: {VLink, NavItem},
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
  font-size: 13px;
  font-weight: 800 !important;

}

@media only screen and (max-width: 600px) {
  .nav-link{
    font-weight: 500 !important;
    font-size: 18px !important;
  }
}


</style>