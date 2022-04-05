<template>
  <nav class="grpnav">
    <button class="menu-button" @click="toggleMenu"><span class="material-icons">menu</span></button>
    <ul class="navbar-items" ref="navitems" :style="{justifySelf:align}">
      <slot></slot>
    </ul>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "NavGroup",
  methods:{
    toggleMenu(){
      (<HTMLElement>this.$refs.navitems).classList.toggle("navbaritems-active")
    }
  }
})
</script>

<style lang="scss">
@use "src/assets/index";
.grpnav {
  height: 32px;
  display: flex;
  align-items: center;
  position: relative;
}

.navbar-items {
  display: flex;
  width: fit-content;
  margin: 0;
  margin-left: auto;
  padding: 0;
}

.menu-button {
  border: none;
  background: white;
  display: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 300;
  cursor: pointer;
  height: fit-content;
  aspect-ratio: 1;
  border-radius: 8px;
  transition-duration: 100ms;
}

.menu-button:hover{
  @extend .windowframe-shadow;

}
.menu-button:active{
  transform: translateY(-50%) scale(90%);
  box-shadow: none;

}

@media only screen and (max-width: 600px) {
  .menu-button {
    display: flex;
  }

  .navbar-items {
    display: none;
    padding: 16px;
    position: relative;
    bottom: -50%;
    transform: translateY(50%);
    gap: 24px;
    flex-direction: column;
    background-color: white;
  }
}
.navbaritems-active{
  @extend .windowframe-shadow;
  height: fit-content;
  display: flex;
}


</style>