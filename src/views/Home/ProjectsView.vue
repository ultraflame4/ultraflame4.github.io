<!-- A Sample of all projects-->
<template>
  <div id="projects-view">
    <h1>Projects</h1>
    <br>
    <p>The best of my projects</p>
    <div id="pview-container">

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProjectsView"
}
</script>

<style scoped lang="sass">
@import "src/assets/globals"
#projects-view
  @extend .full-page
  color: $color-white1

  #pview-container
    display: flex

</style>