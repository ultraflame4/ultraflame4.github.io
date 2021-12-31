<template>
  <div class="plist-item-ctn" @click="openInPreview">
    <p class="plist-item-title">{{ project_name }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "PListItem",
  props: {
    project_name: String,
    item_index: Number
  },
  methods:{
    openInPreview(){
      this.$parent.openItemInPreview(this.item_index);
    }
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/globals"
.plist-item-ctn
  width: calc(100% - $size-2)
  min-height: $size-7

  background-color: rgba($color-mid3,0.45)
  border-radius: 5px
  display: flex
  align-items: center
  justify-content: flex-start
  box-sizing: border-box
  padding: 0 $size-2
  cursor: pointer

  .plist-item-title
    font-size: $size-2
    font-weight: bold

.plist-item-ctn:hover
  background-color: rgba($color-mid3,0.7)

.plist-item-ctn:active
  background-color: rgba($color-mid3,0.5)


</style>