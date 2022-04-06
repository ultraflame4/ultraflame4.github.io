<template>
    <router-link :to="href" :class="`${$props.class} link`">
      <slot></slot>
      <div class="link-underline"></div>
    </router-link>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavItem from "@/components/NavBar/NavItem.vue";

export default defineComponent({
  name: "VLink",
  components: {NavItem},
  props:{
    href:{
      type: String,
      default: "/404"
    },
    class:{
      type: String,
      default: ""
    }
  },

})
</script>

<style lang="scss">
@use "src/assets/colors" as colors;
.link{
  position: relative;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.link-underline{
  position: absolute;
  bottom: -1px;
  right: 0;
  left: auto;
  height: 2px;
  width: 0;
  background-color: colors.$accent-1;
  transition-property: width;
}

.link:hover{

  &>.link-underline{
    left: 0;
    right: auto;
    width: 100%;
  }
}



</style>