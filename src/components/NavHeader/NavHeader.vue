<template>
  <div id="nav-header">
    <h4 id="title"><a href="/">ultr42</a></h4>
    <div id="items">
      <NavHeaderPageLink title="Home" link="/#home"/>
      <NavHeaderPageLink title="About" link="/#about"/>
      <NavHeaderPageLink title="Projects" link="/#projects-view"/>
      <NavHeaderPageLink title="Contact" link="/#contact"/>
      <NavHeaderPageLink title="Others" link="/#others"/>
    </div>
  </div>
</template>

<script lang="ts">

import NavHeaderPageLink from "./NavHeaderPageLink.vue";
export default {
  name: "NavHeader",
  components: {NavHeaderPageLink},
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#nav-header
  @extend .m-0
  @extend .fw
  @extend .row-v-center
  height: $size-7
  background-color: $color-dark1
  color: $color-white1
  display: flex
  position: sticky
  top: 0
  z-index: 100
  #title
    width: 200px

  #items
    display: flex
    flex-grow: 1
    justify-content: flex-end
    column-gap: $size-1
    height: 100%
    padding-right: 100px



</style>