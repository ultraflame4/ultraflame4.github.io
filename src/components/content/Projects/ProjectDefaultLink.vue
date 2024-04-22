<template>
  <a
    :href="value.url"
    :style="{
      '--color': value.fillColor ?? 'var(--accent-color)',
      '--fill-text-color': value.filledTextColor ?? 'white',
    }"
    target="_blank"
    :data-filled="value.filled"
  >
  
    <Icon :icon="value.icon ?? 'eva:external-link-fill'" class="icon" />
    <div class="bg dots"></div>
    <span>{{ value.name }}</span>
    <!-- <div class="bg dots"></div> -->
  </a>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { proj_entry_link } from "@/assets/projects";
import { inject } from "vue";

const value = inject("link") as proj_entry_link;
</script>
<style scoped lang="scss">

.icon {
  font-size: 1.4em;
  margin-right: 0.25em;
  color: var(--accent);
  display: block;
}
span, .icon{
  z-index: 1;
}
:has(> .icon):hover > .icon {
  color: white;
}

.bg {
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;

  transition: all 200ms ease;
}


@keyframes spin{
    0%{
        transform: rotateZ(20deg) translateX(-50%) translateY(-50%);
    }
    50%{
        transform: rotateZ(200deg) translateX(-50%) translateY(-50%);
    }
    100%{
        transform: rotateZ(380deg) translateX(-50%) translateY(-50%);
    }
}

.dots {
  --dot-bg: var(--bg-0);
  --dot-color: #FFF;
  --dot-size: 1px;
  --dot-space: 10px;
  background: linear-gradient(
        90deg,
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    linear-gradient(
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    var(--dot-color);

  z-index: 0;

  left: 50%;
  top: 50%;
  width: 125%;
  height: auto;
  aspect-ratio: 1 / 1;
  
  transform-origin: 0% 0%;
  animation: spin 3s linear infinite;
  animation-play-state: paused;

}


a {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--bg-3);
  border-radius: 0.5rem;
  padding: calc(0.3rem + 1px) calc(0.4rem + 1px);
}
span{
  background: inherit;
}
a:hover {
  border-color: white;
  border-width: 2px;
  padding: 0.3rem 0.4rem;

  .icon {
    color: black;

  }

  .dots{
    animation-play-state: running;
    --dot-space: 8px;
    transition: all 200ms linear;
  }
}

a::after {
  display: none;
}
</style>
