<template>
  <header class="windowframe-shadow" ref="he">
    <div id="header-items-container">
      <NavTitle href="/#home"  id="header-title">ultr<ButtonFour/>2</NavTitle>
      <NavGroup style="margin-right:0;margin-left: auto;justify-self: flex-end">
        <NavLink href="/#about">About</NavLink>
        <NavLink href="/#projects">Projects</NavLink>
        <NavLink>Contact</NavLink>
        <NavLink>Others</NavLink>
      </NavGroup>
    </div>

  </header>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ButtonFour from "@/components/ButtonFour.vue";
import NavGroup from "@/components/NavBar/NavGroup.vue";
import NavLink from "@/components/NavBar/NavLink.vue";
import NavTitle from "@/components/NavBar/NavTitle.vue";

export default defineComponent({
  name: "Header",
  components: {NavTitle, NavLink, NavGroup, ButtonFour},
  data() {
    return {
      observer: <IntersectionObserver | null>null
    }
  },
  mounted() {

    this.observer = new IntersectionObserver(
        ([e]) => {
          e.target.classList.toggle("isnot-pinned", !(e.intersectionRatio < 1))
          e.target.classList.toggle("windowframe-shadow", (e.intersectionRatio < 1))
        },
        {threshold: [1]})
    this.observer.observe(<HTMLElement>this.$refs.he)

  }
})
</script>

<style scoped lang="scss">
@use "/src/assets/vars";

header {
  display: flex;
  padding: 0 24px;
  height: vars.$header-height;
  background-color: rgba(white, 95%);
  backdrop-filter: blur(8px);
  z-index: 100;
  top: -1px;
  position: sticky;

}

#header-items-container {
  width: min(100%, 1200px);
  height: 100%;
  display: flex;
  margin: auto;
}

header.isnot-pinned {
  background-color: transparent;
  height: vars.$header-unpinned-height;
}

.isnot-pinned #header-title {
  font-size: 28px;
}

#header-title {
  margin-left: 0;
  margin-right: auto;
  font-weight: 550;
  font-size: 24px;

}

</style>