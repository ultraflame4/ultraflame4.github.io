<template>
  <nav class="navbar windowframe-shadow" ref="nav">
    <NavGroup class="navbar-rootgroup">
      <slot></slot>
    </NavGroup>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavGroup from "@/components/NavBar/NavGroup.vue";

let stickyNavbars = 0
export default defineComponent({
  name: "NavBar",
  components: {NavGroup},
  props: {
    stickTop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      observer: <IntersectionObserver | null>null
    }
  },
  mounted() {
    if (this.stickTop) {
      (<HTMLElement>this.$refs.nav).style.position = "sticky";
      (<HTMLElement>this.$refs.nav).style.top = (64 * stickyNavbars -1).toString() + "px";
      // (<HTMLElement>this.$refs.nav).classList.add("isnot-pinned");
      console.log((64 * stickyNavbars).toString())
      stickyNavbars += 1
      this.observer = new IntersectionObserver(
          ([e]) => {
            e.target.classList.toggle("isnot-pinned", !(e.intersectionRatio < 1))
            e.target.classList.toggle("windowframe-shadow", (e.intersectionRatio < 1))
          },
          {threshold: [1]})
      this.observer.observe(<HTMLElement>this.$refs.nav)


    }
  }
})
</script>

<style lang="scss">

.navbar {
  display: flex;
  padding: 0 24px;
  height: 64px;
  background-color: rgba(white,0.5);
  backdrop-filter: blur(6px);
}

.navbar.isnot-pinned {
  background-color: transparent;
  height: 96px;
}

.navbar-rootgroup {
  width: min(100%, 1200px);
  margin: auto;
}
</style>