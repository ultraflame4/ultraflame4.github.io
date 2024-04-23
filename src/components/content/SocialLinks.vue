<template>
  <ul>
    <li>
      <Tooltip>
        <template v-slot:trigger="props">
          <a
            href="https://github.com/ultraflame4"
            target="_blank"
            v-bind="props"
          >
            <Icon icon="mdi:github" />
          </a>
        </template>
        <template v-slot:content> My github </template>
      </Tooltip>
    </li>

    <li>
      <Tooltip>
        <template v-slot:trigger="props">
          <a
            href="https://www.linkedin.com/in/chester-lai-yu-heng/"
            target="_blank"
            v-bind="props"
          >
            <Icon icon="mdi:linkedin" />
          </a>
        </template>
        <template v-slot:content> My linkedin </template>
      </Tooltip>
    </li>
    <li>
      <Tooltip>
        <template v-slot:trigger="props">
          <a
            href="https://notlivingstudios.itch.io/chuckles-ggj-2024"
            target="_blank"
            v-bind="props"
            ><Icon icon="fa6-brands:itch-io" />
          </a>
        </template>
        <template v-slot:content> My itch.io </template>
      </Tooltip>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Tooltip from "../core/Tooltip.vue";
</script>

<style scoped lang="scss">
@keyframes shake {
  0%,
  100% {
    transform: rotateZ(10deg);
  }
  50% {
    transform: rotateZ(-10deg);
  }
}
a {
  display: flex;
  font-size: 2.75em;
  transition: color 200ms ease !important;
  &::after {
    content: "" !important;
    display: none;
  }
  color: var(--txt-a-tinted);
  &:hover {
    color: var(--active-color) !important;
  }
}
ul {
  display: flex;

  gap: 0.25rem;

  & > li:has(a:hover) {
    animation: shake 150ms infinite linear;
  }
}
</style>
