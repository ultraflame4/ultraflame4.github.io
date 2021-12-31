<template>
  <BaseLink class="web-link" text="Go to Website" :url="url"/>
</template>

<script>
import BaseLink from "@/components/Buttons/BaseLink.vue";
export default {
  name: "Weblink",
  components: {BaseLink},
  props:{
    url:String
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/globals"
.web-link
  background-color: $color-mid1
  color: $color-white1
</style>