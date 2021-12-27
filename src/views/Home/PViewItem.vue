

<template>
  <div class="pview-item-container">
    <div class="pview-item">
      <h4 class="pview-title">
        {{title}}
      </h4>
      <p class="pview-desc">{{desc}}</p>
      <div class="pview-links-ctn">
        <PViewItemLink icon-name="web" :text="'Goto website'" :url="web" v-if="web.length>0"/>
        <PViewItemLink icon-name="github" :text="'Visit the github repository'" :url="repo" v-if="repo.length>0"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PViewItemLink from "@/views/Home/PViewItemLink.vue";
export default {
  name: "PViewItem",
  components: {PViewItemLink},
  props:{
    title: String,
    desc: String,
    repo: {
      default: "",
      type: String
    },
    web: {
      default: "",
      type: String
    }
  }
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
.pview-item-container
  position: absolute
  top: 0
  left: 0
  z-index: 1
  pointer-events: none
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  @extend .txt-shadow
  .pview-item
    background-color: rgba($color-mid3,0.3)
    border-radius: $size-1
    padding: $size-2
    width: $size-60
    height: $size-40
    box-sizing: border-box
    position: relative
    .pview-title
      margin-top: $size-2
      margin-bottom: $size-3

    .pview-desc
      white-space: normal

    .pview-links-ctn
      width: 100%
      position: absolute
      left: 0
      height: fit-content

      padding-bottom: $size-2
      bottom: 0
      display: flex
      flex-direction: column
      align-items: center
      gap: $size-1

</style>