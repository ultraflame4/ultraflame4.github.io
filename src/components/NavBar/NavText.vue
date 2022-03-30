<template>
<NavItem>
  <p class="nav-text"><slot></slot></p>
</NavItem>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavItem from "@/components/NavBar/NavItem.vue";

export default defineComponent({
  name: "NavText",
  components: {NavItem}
})
</script>

<style lang="scss">
.nav-text{
  font-size: 18px;
  font-weight: 500;
}
</style>