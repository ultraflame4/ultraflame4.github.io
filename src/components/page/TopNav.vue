<template>


  <header v-stuck>
    <div id="header-left" class="floater-shadow header-item">
      <h1>ultr42</h1>
      <ul id="topnav-quick">
        <Icon icon="vaadin:hash" class="icon"/>
        <template v-for="link in PageNavTree.links.value">
          <li v-if="link.level<1">
            <RouterLink :to="link.to" class="parent_hover-underline no-hover no-deco">{{ link.name }}
            </RouterLink>
          </li>
        </template>
      </ul>
    </div>
    <div class="header-center"></div>
    <ul class="floater-shadow header-item">
      <template v-for="link in PageNavTree.links.value">
        <li v-if="link.level==0">
          <RouterLink :to="link.to" class="parent_hover-underline no-hover no-deco">{{ link.name }}
          </RouterLink>
        </li>

      </template>
    </ul>
    <button id="menu-btn" @click="emit('menuToggle')" :data-open="menuOpen" class="floater-shadow header-item">
      <Icon icon="ic:baseline-menu"/>
    </button>
  </header>

</template>

<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {type Ref, watch} from "vue";
import {PageNavTree} from "@/router/page_navtree";

const emit = defineEmits<{
  (e: 'menuToggle'): void
}>()

const props = defineProps<{
  menuOpen: boolean
}>()


</script>

<style lang="scss" scoped>

header {
  width: auto;
  padding: 0.75rem 1rem;
  box-sizing: content-box;
  height: 2.75rem;
  transition: all 500ms ease, padding 500ms ease;
  display: flex;
  align-items: center;
  position: sticky;
  top: -1px;
  z-index: 100;
  background: transparent;
  font-size: 1.25rem;
  pointer-events: none;
  gap: 0.74rem;

  & > * {
    margin: 0;
    pointer-events: auto;
  }

  &[stuck] {
    font-size: 0.95rem;
    & .header-item{
      background: var(--bg-1);
      border-color: var(--accent);
    }

  }
}

.header-center{
  margin-left: auto;
  margin-right: auto;
}

.header-item{
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: transparent;
  box-sizing: border-box;
  border: 2px solid transparent;
  padding: 0 0.75rem;
  transition: border 500ms ease, transform 500ms ease;
  border-radius: 0.9rem;

  & > h1 {
    font-family: "Poppins";
    font-weight: 700;
    font-size: 1em;
    letter-spacing: 0.1rem;
    margin: 0 0.25rem 0 0.5rem;
    @media only screen and (max-width: 1000px) {
      margin: 0 auto;
    }
  }
}

.header-item ul,ul.header-item{
  gap: 0.5em;
  display: flex;
  align-items: center;
  list-style-type: none;
}

#header-left {
  [data-open="true"] & { // This css makes sure the logo stays on screen when in mobile mode (screen <1000)
    position: relative;
    transform: translateX(var(--navtree-width));
  }
  & > * {
    margin: 0;
  }
}

#topnav-quick {
  padding: 0;
  margin-left: 0.5rem;

  height: 100%;


  & > .icon {
    font-weight: 600;
    font-size: 1em;
    color: var(--accent);
  }

  & > li {
    display: flex;
    font-size: 0.75em;
    align-items: center;
    position: relative;
    bottom: 2px;
    [stuck] &{
      bottom: 0;
      top: 1px; // Alignment
    }

    & > a {
      color: var(--txt-a-tinted);
      --underline-mult: 1.1;
      letter-spacing: 0.05rem;
      font-weight: 700;
      font-family: "Poppins";
      text-transform: uppercase;

    }

    &:hover > a {
      color: #fff;
    }
  }

  @media only screen and (max-width: 1000px) {
    display: none;
  }
}

#menu-btn {
  aspect-ratio: 1;
  color: white;
  font-size: 1.5em;
}

#menu-btn:hover, #menu-btn[data-open="true"] {
  color: var(--accent);
}

#menu-btn:active {
  transition:  transform 100ms ease;
  transform: scale(0.8);
}

</style>

