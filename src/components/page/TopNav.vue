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

    <ul class="floater-shadow header-item" id="index-pages">
      <template v-for="link in router.options.routes">
        <li>
          <RouterLink :to="link.path"
                      class="no-deco"
                      active-class="active">
            {{ link.name }}
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
import {PageNavTree} from "@/router/page_navtree";
import {useRouter} from "vue-router";
import NavLink from "@/components/core/NavLink.vue";

const router = useRouter()

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
  height: 2.9rem;
  transition: all 500ms ease, padding 500ms ease;
  display: flex;
  align-items: center;
  position: sticky;
  top: -1px;
  z-index: 100;
  background: transparent;
  font-size: 1.25rem;
  pointer-events: none;
  gap: 0.5rem;

  & > * {
    margin: 0;
    pointer-events: auto;
  }

  &[stuck] {
    font-size: 0.95rem;

    & .header-item {
      background: var(--bg-1);
      border-color: var(--accent);
    }

  }
}

.header-center {
  margin-left: auto;
  margin-right: auto;
}

.header-item {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: transparent;
  box-sizing: border-box;
  border: 2px solid transparent;
  padding: 0 0.9rem;
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

.header-item ul, ul.header-item {
  gap: 0.5em;
  display: flex;
  align-items: center;

  list-style-type: none;

  & li {
    font-size: 0.9em;
    display: flex;
    align-items: center;

    &:has(.parent_hover-underline) {
      position: relative;
      bottom: 1px;

      [stuck] & {
        bottom: 0;
        top: 1px; // Alignment
      }

      & > a {
        --underline-mult: 1.1;
        letter-spacing: 0.075rem;
        font-weight: 600;
        font-family: "Poppins";
        text-transform: uppercase;
      }

      &:hover > a {
        color: #fff;
      }
    }

  }

}

#header-left {
  [data-open="true"] & { // This css makes sure the logo stays on screen when in mobile mode (screen <1000)
    position: relative;
    transform: translateX(var(--navtree-width));
  }
  h1{
    font-size: 1.1em;
  }

  & li > a:not(:hover) {
    color: var(--txt-a-tinted);
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


  @media only screen and (max-width: 1000px) {
    display: none;
  }
}

#index-pages {
  @media only screen and (max-width: 1000px) {
    display: none;
  }


  gap: 1.25rem;
  padding-left: 1rem;
  padding-right: 1rem;

  & li {
    overflow: visible;
  }

  & li > a {

    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    letter-spacing: 0.075rem;
    transition: font-size 100ms linear, font-weight 100ms linear, background-position 300ms ease;
    [stuck] &{
      font-weight: 700;
    }
    &.active {

      color: var(--active-color);
      position: relative;

      font-weight: 800;
      font-size: 1.1em;
    }
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
  transition: transform 100ms ease;
  transform: scale(0.8);
}

</style>

