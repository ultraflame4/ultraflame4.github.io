<template>
  <div class="ci-ctn" @click="open()">
    <img :src="img">
    <h4>{{text}}</h4>
  </div>
</template>

<script lang="ts">
export default {
  name: "ContactItem",
  props:["img","text","url"],
  methods:{
    open(){
      window.open(this.url);
    }
  }
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
.ci-ctn
  display: flex
  align-items: center
  justify-content: space-between
  flex-direction: row
  width: $size-30
  background-color: $color-white1
  padding: $size-1 $size-3
  border-radius: $size-2
  color: black
  img
    height: 64px
    width: 64px
  cursor: pointer

.ci-ctn:hover
  filter: brightness(95%)

.ci-ctn:active
  filter: brightness(90%)


</style>