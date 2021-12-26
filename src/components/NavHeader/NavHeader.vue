<template>
  <div id="nav-header">
    <h4 id="title"><a href="/">ultr42</a></h4>
    <div id="items">
      <NavHeaderPageLink title="Projects" link="/#projects"/>
      <NavHeaderPageLink title="Contact" link="/#contact"/>
      <NavHeaderPageLink title="Socials" link="/#socials"/>
      <NavHeaderPageLink title="About" link="/#about"/>
      <NavHeaderPageLink title="Others" link="/#others"/>
    </div>
  </div>
</template>

<script lang="ts">

import NavHeaderPageLink from "./NavHeaderPageLink.vue";
export default {
  name: "Header",
  components: {NavHeaderPageLink},
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#nav-header
  @extend .m-0
  @extend .fw
  @extend .row-v-center
  height: $size-8
  background-color: $color-dark1
  color: $color-white1
  display: flex

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