<template>
  <div class="navbaritem-container">
    <h5>
    <router-link :to="link">

        {{title}}

    </router-link>
    </h5>
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
  h5
    height: 100%
    background-color: rgba($color-white1,0)
    border: none
    border-radius: 10px
    cursor: pointer
    display: flex

  a
    margin: auto
    color: $color-white2

    @extend .p-sides-30px

  h5:hover
    background-color: rgba($color-white1,.2)

  h5:active
    background-color: rgba($color-white1,.3)

</style>
