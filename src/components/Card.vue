<template>
  <div :class="`${$props.class} card`"  @click="$vroute(href)">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "Card",
  props:{
    class:{
      type:String
    },
    href:{
      type: String,
      default:"."
    }
  }
})
</script>

<style lang="scss">
@use "src/assets/index";
.card {
  @extend .windowframe-shadow;
  position: relative;
  background-color: rgba(white,90%);
  backdrop-filter: blur(5px);
  cursor: pointer;
  padding: 16px;
  border-radius: 14px;
  z-index: 100;
  background-size: cover;

  &:hover{
    transform: scale(1.03);
    z-index: 300;
  }
  &:active{
    transform: scale(.97);
  }

}
</style>