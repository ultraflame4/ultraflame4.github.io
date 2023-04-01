<template>
  <br/>
  <div id="header-ctn" v-stuck="headerStuck">
    <header>
      <h1>ultr42</h1>
      {{headerStuck}}
    </header>
  </div>

  <div id="page-content">

    <RouterView/>
  </div>
</template>
<script setup lang="ts">
import {RouterView} from 'vue-router'
import {ref} from "vue";
const headerStuck = ref({stuck:false})

</script>

<style lang="scss" scoped>
#header-ctn{
  padding: 0 1rem;
  position: sticky;
  top: 0;
  height: 8rem;
  display: flex;
  align-items: center;
}
#header-ctn[stuck] {
  background: white;
}
header {
  padding: 1rem;
  width: 100%;

  &> *{
    margin: 0;
  }
}

#page-content {
  padding-top: 5rem;
}

</style>
