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
span,
.icon {
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

.dots {
  --cell-size: 4px;
  --dot-size: 0.1px;
  background: radial-gradient(
    circle at center,
    var(--bg-3) var(--dot-size),
    transparent var(--dot-size)
  );
  background-size: var(--cell-size) var(--cell-size);
  background-position: 10px 0px;

  z-index: 0;

  height: auto;
  aspect-ratio: 1 / 1;
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
span {
  background: inherit;
}

@keyframes shake-x {
  0%,
  100% {
    background-position-x: 10px;
  }
  50% {
    background-position-x: 13px;
  }
}

@keyframes shake-y {
  0%,
  100% {
    background-position-y: 20px;
  }
  50% {
    background-position-y: 23px;
  }
}

a:hover {
  border-color: white;
  border-width: 2px;
  padding: 0.3rem 0.4rem;

  .icon {
    color: black;
  }

  .dots {
    // animation-play-state: running;
    
    animation: shake-x 100ms linear infinite, shake-y 140ms linear infinite;
  }
}

a::after {
  display: none;
}
</style>
