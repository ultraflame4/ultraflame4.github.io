<template>
  <br/>
  <div id="header-ctn" v-stuck>
    <header>
      <h1>ultr42</h1>
      <button id="menu-btn" @click="emit('menuToggle')" :data-open="menuOpen">
        <Icon icon="ic:baseline-menu"/>
      </button>
    </header>
  </div>
</template>

<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {type Ref} from "vue";

const emit = defineEmits<{
  (e: 'menuToggle'): void
}>()

const props = defineProps<{
  menuOpen:boolean
}>()


</script>

<style lang="scss" scoped>

#menu-btn {
  background: none;
  border: none;
  color: white;
  height: fit-content;
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 1.3em;
  transition: color 200ms ease, transform 100ms linear;
  margin-left: auto;
}

#menu-btn:hover, #menu-btn[data-open="true"]{
  color: var(--accent);
}

#menu-btn:active{
  transform: scale(0.8);
}

#header-ctn {

  position: sticky;

  height: 8rem;
  pointer-events: none;
  font-size: 1.6rem;
  top: -1px;
}

header {
  height: 100%;
  width: 100%;
  transition: all 200ms ease;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  pointer-events: all;

  & > h1{
    margin-left: 3vw;
    transition: all 200ms ease;
    font-family: "Poppins";
    font-weight: 700;
    font-size: 1em;
    letter-spacing: 0.1rem;
  }

  & > * {
    margin: 0;
  }
}

#header-ctn[stuck] > header {
  height: 4rem;
  padding: 0;

}

#header-ctn[stuck]{
  font-size: 1.25rem;
  background: linear-gradient(180deg, var(--bg-0) 4rem, transparent 6rem);
}

</style>

