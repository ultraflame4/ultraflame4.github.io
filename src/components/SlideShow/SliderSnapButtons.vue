<template>

  <svg ref="snapbutton" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" data-s="false" @click="scrollToHere(true)">
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path>
  </svg>

</template>

<script lang="ts">
export default {
  name: "SliderSnapButtons",
  props:["index"],

  mounted() {
    this.$refs.snapbutton.dataset.index=this.index
  },
  methods:{
    setSelected(isSelected: boolean = false){
      this.$refs.snapbutton.dataset.s = isSelected
    },

    scrollToHere(){
      this.$parent.scrollToIndex(this.index)
    }
  }
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"

svg

  cursor: pointer

  fill: $color-white1
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7))

svg:hover, svg[data-s="true"]
  fill: mix($color-white1,$color-mid2,0.1)



</style>