<template>
  <div class="navbaritem-container">
    <button @click="scrollto(link)">
      <h5>
        {{title}}
      </h5>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "NavHeaderPageLink",
  props:["title","link"],
  methods:{
    scrollto(url:string){
      window.location.assign(url)
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/assets/globals"
div
  button
    height: 70%
    background-color: rgba($color-white1,0)
    border: none
    border-radius: 10px
    h5
      color: $color-white2

    @extend .p-sides-30px

  button:hover
    background-color: rgba($color-white1,.2)

  button:active
    background-color: rgba($color-white1,.3)

</style>