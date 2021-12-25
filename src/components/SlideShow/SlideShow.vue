<template>
  <div id="container">
    <img v-for="image in images"
         :src="image"
    >
    <button class="arrows" id="arrow-l">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
           style="fill: rgba(255, 255, 255, 1);">
        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
      </svg>
    </button>
    <button class="arrows" id="arrow-r">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
           style="fill: rgba(255, 255, 255, 1);">
        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
      </svg>
    </button>
  </div>

</template>

<script lang="ts">
export default {
  name: "SlideShow",
  props: ["images"],

}

</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#container
  height: 100%
  width: 100%
  position: relative

  .arrows
    cursor: pointer
    position: absolute
    top: 0
    bottom: 0
    height: 100px
    margin-top: auto
    margin-bottom: auto
    background-color: transparent
    border: none
    transition: transform 0.1s ease-in
    svg
      filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7))

  .arrows:hover
    transform: scale(1.1)

  #arrow-l
    left: 0

  #arrow-r
    right: 0

</style>