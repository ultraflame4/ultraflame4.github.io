<template>
  <div id="site-back">

  </div>
  <div id="site-ctn" :data-open="menuOpen" @click.capture="returnToPage()">
    <TopNav :menu-open="menuOpen" @menuToggle="menuToggle()"/>
    <div id="page-content">
      <RouterView/>
    </div>
  </div>

</template>
<script setup lang="ts">
import TopNav from "@/components/TopNav.vue";
import {ref} from "vue";

const menuOpen = ref(false);
const isClosing = ref(false);

function returnToPage(){
  if (menuOpen.value) {
    menuOpen.value=false
    isClosing.value=true
    setTimeout(()=> {isClosing.value = false},0) // clean up
  }
}

function menuToggle() {
  // no need to deal with closing of menu because it will be closed by the returnToPage function
  menuOpen.value=!isClosing.value
}

</script>

<style lang="scss" scoped>
#site-back {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: var(--bg-1);
  z-index: -1;
}
#site-ctn {
  margin: 0;
  transition: all 500ms ease;
  border: 2px solid transparent;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: var(--bg-0);

}
#site-ctn[data-open="true"] {
  border-color: var(--bg-2);
  @media only screen and (max-width: 800px) {
    transform: translateX(-40vw) translateY(3vh);
  }
  @media only screen and (min-width: 801px) {
    margin-top: 3%;
    width: calc(100% - 20rem);
  }




  border-top-right-radius: 1rem;
}
#site-ctn::-webkit-scrollbar-track{
  margin-top: 1rem;
}

#page-content {
  padding-top: 1rem;
}

</style>
