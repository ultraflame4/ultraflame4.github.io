<template>
  <nav class="grpnav">
<!--    <button class="menu-button" @click="toggleMenu"><span class="material-icons">menu</span></button>-->
<!--    <button class="menu-button" @click="toggleMenu"><span class="material-icons">menu</span></button>-->
    <VButton class="menu-button" :stateful="true" @click="toggleMenu()">
      <span class="material-icons">menu</span>
      <span class="material-icons">close</span>
    </VButton>
    <div>
      <ul  class="navbar-items" ref="navitems" :style="{justifySelf:align}">
        <slot></slot>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import VButton from "@/components/VButton.vue";

export default defineComponent({
  name: "NavGroup",
  components: {VButton},
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
  border-radius: 32px;
  transition-duration: 100ms;
}



@media only screen and (max-width: 600px) {
  .menu-button {
    display: flex;
  }


  .navbar-items {
    display: none;
    padding: 16px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 50%;
    padding: 64px 0;
    gap: 24px;
    flex-direction: column;
    background-color: white;

  }
}
.navbaritems-active{
  @extend .windowframe-shadow;
  display: flex;


}


</style>