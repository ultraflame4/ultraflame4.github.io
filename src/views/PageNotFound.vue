<template>
  <NavHeader></NavHeader>
  <div id="contents">
    <h3>
      Error 404: Page Not Found
    </h3>
    <div class="spacer"></div>
    <p id="a">
      The page requested could not be found. Hence you have been redirected here.
      If it was a link on this website that sent you here, report the issue <a href="https://github.com/ultraflame4/ultraflame4.github.io/issues">here</a>
    </p>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <p>
      ├┐ ┬───┬ ┌┤  /( ಠ_ಠ )\ ~ <small>Are you lost, perhaps?</small>
    </p>
  </div>
</template>

<script lang="ts">
import NavHeader from "@/components/NavHeader/NavHeader.vue";

export default {
  name: "PageNotFound",
  components: {NavHeader},
  mounted() {

  }
}
</script>

<style scoped lang="sass">
@import "src/assets/globals"
#contents
  height: calc(100% - $size-7 - $size-5)
  box-sizing: border-box
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  .spacer
    display: block
    height: $size-2

  #q
    color: $color-mid2

  #a
    color: $color-white2

    a
      text-decoration: underline
</style>