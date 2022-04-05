<template>

  <h1 class="nav-title" @click="$router.push(href)"><slot></slot></h1>

</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavText from "@/components/NavBar/NavText.vue";

export default defineComponent({
  name: "NavTitle",
  components: {NavText},
  props:{
    href:{
      type:String,
      default:"."
    }
  }
})
</script>

<style lang="scss">
.isnot-pinned *.nav-title{

  font-size: 28px;
}

.nav-title{
  font-weight: 550;
  font-size: 24px;
  cursor: pointer;
}


</style>