<template>
  <button @click="open(url)">
    <img v-if="iconUrl.length>0" :src="iconUrl"/>
    <p>{{ text }}</p>
  </button>
</template>

<script>
export default {
  name: "BaseLink",
  props:{
    iconUrl:{
      type:String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    url:{
      type:String,
      default: "/404"
    }
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/globals"
button
  min-width: $size-30
  max-width: $size-30
  min-height: $size-5
  max-height: $size-5
  border-radius: $size-1
  border: none
  display: flex
  align-items: center
  padding-left: $size-1
  padding-right: $size-1

  p
    justify-self: flex-end
    margin: auto
    font-size: $size-2
    flex-grow: 1
    text-shadow: none
  img
    margin: auto
    justify-self: flex-start
    height: $size-3

  cursor: pointer
  pointer-events: all
button:hover
  filter: brightness(95%)
button:active
  filter: brightness(90%)
</style>