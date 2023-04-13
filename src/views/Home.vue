<template>
    <div id="home-banner" v-iratio="iratio">
        <h1>Hello</h1>
        <video autoplay muted loop preload="auto">
            <source src="moon.webm">
        </video>
    </div>
    <main>

        <p v-for="i in 100">
            tset
        </p>
    </main>
</template>

<script lang="ts" setup>
import {iRatioObject} from "vyue42";

const iratio = new iRatioObject({
    exit: false,
    invert: false
})

</script>

<style lang="scss" scoped>
#home-banner {

  position: relative;
  height: calc(100vh - 5rem);
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 0;

  video {
    margin-top: auto;
    position: sticky;
    bottom: 0;
    height: 100%;
    transform: translateY(calc(var(--iratio) * -500px + 375px));
    filter: brightness(90%) saturate(75%) grayscale(30%);
  }

  &:after {
    content: "";
    position: absolute;
    height: 50%;
    width: 100%;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(0deg,var(--bg-0) 0%, transparent 50%);

  }

}

main {
  z-index: 3;
  background: var(--bg-0);
}
</style>
