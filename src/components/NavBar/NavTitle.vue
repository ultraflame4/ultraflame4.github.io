<template>
  <NavText >
    <h1 class="nav-title"><slot></slot></h1>
  </NavText>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavText from "@/components/NavBar/NavText.vue";

export default defineComponent({
  name: "NavTitle",
  components: {NavText}
})
</script>

<style lang="scss">
.isnot-pinned *.nav-title{
  font-weight: 400;
  font-size: 32px;
}

.nav-title{
  font-weight: 500;
  font-size: 24px;

}


</style>