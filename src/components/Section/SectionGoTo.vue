<!--Redirects to another section, most commonly below-->
<template>
<router-link :to="href" class="sect-goto"><slot></slot></router-link>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "SectionGoTo",
  props:{
    href: {type:String,default:"."}
  }
})
</script>

<style lang="scss">
.sect-goto{
  position: absolute;
  bottom: 24px;
  color: black;
  letter-spacing: 2px;
  text-decoration: none;
  height: 48px;
  background-color: white;
}

.sect-goto:hover{
  transform: translateY(-10px);
}
</style>