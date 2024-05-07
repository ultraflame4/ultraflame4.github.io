<template>

  <App />
</template>
<script setup lang="ts">
import App from "./App.vue";
const IS_DEV = import.meta.env.DEV;
(window as any).IsDev = IS_DEV;




</script>
<style lang="sass"></style>
