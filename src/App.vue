<template>
  <NavigationContext>
    <div id="site-back">
      <NavigationTree id="navtree" />
    </div>

    <div
      id="site-ctn"
      :data-open="menuOpen"
      @click.capture="returnToPage()"
      ref="site_ctn"
      class="scrollable"
    >
      <div class="background">
        <Background />
      </div>
      <TopNav
        :menu-open="menuOpen"
        @menuToggle="menuToggle()"
        @scroll-top="scrollTop()"
      />
      <div id="contact-floater" class="floater-shadow" >
        <SocialLinks class="links"/>
      </div>
      <div id="page-content">
        <RouterView v-slot="{ Component }">
          <PageView :component="Component" />
        </RouterView>
      </div>
      <hr />
      <div class="section-bg-start"></div>
      <Footer />
    </div>
  </NavigationContext>
</template>
<script setup lang="ts">
import TopNav from "@/components/page/TopNav.vue";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import NavigationTree from "@/components/core/NavigationTree.vue";
import NavigationContext from "@/components/navigation/NavigationContext.vue";
import Footer from "@/components/page/Footer.vue";
import { useSeoMeta, useHead } from "@unhead/vue";
import PageView from "@/components/core/PageView.vue";
import Background from "@/components/utils/Background.vue";
import { PageNavTree } from "@/router/page_navtree";
import { useRouter } from "vue-router";
import SocialLinks from "./components/content/SocialLinks.vue";

const router = useRouter();
const menuOpen = ref(false);
const isClosing = ref(false);
const site_ctn = ref<HTMLElement | null>(null);

onMounted(updateHead);
router.afterEach(updateHead);

function scrollTop() {
  site_ctn.value?.scrollTo({ top: 0, behavior: "smooth" });
}

function updateHead() {
  useSeoMeta({
    title:
      "ultr42 - " + router.currentRoute.value.name?.toString() ?? "unnamed",
    description: "Personal website & portfolio of ultr42",
    ogTitle: router.currentRoute.value?.toString() ?? "unnamed",
    ogType: "profile",
    author: "ultraflame4@gmail.com",
    generator: "null",
    themeColor: "#1a1a1a",
  });
}

function returnToPage() {
  if (menuOpen.value) {
    menuOpen.value = false;
    isClosing.value = true;
    setTimeout(() => {
      isClosing.value = false;
    }, 0); // clean up
  }
}

function menuToggle() {
  // no need to deal with closing of menu because it will be closed by the returnToPage function
  menuOpen.value = !isClosing.value;
}

onBeforeMount(() => PageNavTree.clear());
</script>

<style lang="scss" scoped>
:global(:root) {
  --navtree-width: min(50vw, 24rem);
}

.background {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  // pointer-events: none;
  z-index: -1;
  overflow: hidden;
  // background: white;
}

#site-back {
  display: flex;
}

#navtree {
  margin-top: 1rem;
  margin-left: auto;
  width: var(--navtree-width);
  padding-left: 1.5rem;
}

#site-back {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: var(--bg-0-5);
}

#site-ctn {
  position: fixed;
  margin: 0;
  transition: all 500ms ease;
  border: 2px solid transparent;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--bg-0);
  z-index: 1;
  #contact-floater {
    position: fixed;
    right: 0.5rem;
    bottom: 0.75rem;
    padding:  0.5rem;
    border: 2px solid var(--accent);
    border-radius: 0.9rem;
    height: 3rem;
    background: transparent;
    filter: drop-shadow(1px 1px 2px var(--bg-0-5));
    backdrop-filter: blur(24px) brightness(1.1) contrast(0.9);
    z-index: 10;
    display: flex;
    align-items: center;
    .links{
      margin: 0;
      padding: 0;
      font-size: 0.75em;
    }
  }
}

#site-ctn[data-open="true"] {
  border-color: var(--bg-2);
  filter: drop-shadow(3px 3px 1rem var(--bg-0));
  border-radius: 1rem;

  margin-left: 0;
  transform: translateX(calc(0px - var(--navtree-width))) translateY(2rem);
}

#site-ctn::-webkit-scrollbar-track {
  margin-top: 1rem;
}

#page-content {
  padding-top: 1rem;
  // overflow-x: hidden; MUST NOT BE UNCOMMENTED. WILL CAUSE STICKY ELEMENTS TO NOT WORK
}
</style>
