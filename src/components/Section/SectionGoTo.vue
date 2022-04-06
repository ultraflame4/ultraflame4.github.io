<!--Redirects to another section, most commonly below-->
<template>
  <router-link :to="href" class="sect-goto" :title="`Go to ${href}`">
    <span v-if="brackets" class="material-icons" style="left: -24px">keyboard_arrow_left</span>
    <slot></slot>
    <span v-if="brackets" class="material-icons" style="right: -24px">keyboard_arrow_right</span>
    <div v-if="!brackets" class="sect-goto-underline1"></div>
    <div class="sect-goto-underline"></div>
  </router-link>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "SectionGoTo",
  props: {
    href: {type: String, default: "."},
    brackets: {type: Boolean, default: true},
  }
})
</script>

<style lang="scss">
@use "src/assets/colors";

.sect-goto {
  position: absolute;
  bottom: 16px;
  color: black;
  letter-spacing: 2px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: rgba(black, 0.8);

  &>.material-icons{
    position: absolute;
    bottom: 50%;
    transform: translateY(calc(50%));

  }

}

.sect-goto-underline1 {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: colors.$accent-1;
  right: 0;
  left: auto;
  bottom: 0;
}

.sect-goto-underline {
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  background-color: colors.$accent-2;
  right: 0;
  left: auto;
}

.sect-goto:hover {
  transform: translateY(-6px);
}

.sect-goto:hover > .sect-goto-underline {
  left: 0;
  right: auto;
  width: 100%;

}
</style>