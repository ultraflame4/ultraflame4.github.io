<template>
  <div id="container">
    <SlideShow :images="getImages()">
      <img ref="im" src="/src/assets/tiledimage0.png"
           alt="A beautiful picture created by tiling together many minecraft blocks"/>
    </SlideShow>
    <div id="layer">

    </div>
  </div>
</template>

<script lang="ts">
import SlideShow from "@/components/SlideShow/SlideShow.vue";

export default {
  name: "HomeBanner",
  components: {SlideShow},
  methods: {
    getImages() {
      //https://wallpapercave.com/wp/wp2077533.jpg,
      return [
        "/src/assets/tiledimage0.png",
        "/src/assets/tiledimage0.png"
      ]
    }
  }
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#container
  height: 100%
  width: 100%
  position: relative

  #layer
    width: 100%
    height: 100%

    background-color: rgba($color-dark2, 0.5)
    position: absolute
    left: 0
    top: 0
    pointer-events: none


</style>