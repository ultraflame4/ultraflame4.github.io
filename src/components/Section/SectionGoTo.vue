<!--Redirects to another section, most commonly below-->
<template>
  <router-link :to="href" class="sect-goto">
    <slot></slot>
    <div class="sect-goto-underline1"></div>
    <div class="sect-goto-underline"></div>
  </router-link>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "SectionGoTo",
  props: {
    href: {type: String, default: "."}
  }
})
</script>

<style lang="scss">
@use "src/assets/colors";
.sect-goto {
  position: absolute;
  bottom: 24px;
  color: black;
  letter-spacing: 2px;
  text-decoration: none;

}

.sect-goto-underline1{
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: colors.$accent-1;
  right: 0;
  left: auto;
}

.sect-goto-underline{
  position: absolute;
  width: 0;
  height: 2px;
  background-color: colors.$accent-2;
  right: 0;
  left: auto;
}

.sect-goto:hover {
  transform: translateY(-10px);
}

.sect-goto:hover>.sect-goto-underline {
  left: 0;
  right: auto;
  width: 100%;
}
</style>