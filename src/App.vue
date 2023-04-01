<template>

  <TopNav/>
  <div id="page-content">

    <RouterView/>
  </div>
</template>
<script setup lang="ts">

import TopNav from "@/components/TopNav.vue";
</script>

<style lang="scss" scoped>

#page-content {
  padding-top: 5rem;
}

</style>
