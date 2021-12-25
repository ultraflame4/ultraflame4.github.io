

<template>
  <HomeBanner></HomeBanner>
  <NavHeader></NavHeader>
</template>

<script lang="ts">
import NavHeader from "@/components/NavHeader/NavHeader.vue";
import HomeBanner from "@/components/HomeBanner.vue";
export default {
  name: "Home",
  components:{HomeBanner, NavHeader}
}
</script>

<style scoped>

</style>