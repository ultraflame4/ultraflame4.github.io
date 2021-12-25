<template>
  <div class="navbaritem-container">
    <button @click="open_link(link)">
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
    open_link(url:string){
      window.open(url,"_self")
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