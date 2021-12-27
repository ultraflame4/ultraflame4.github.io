

<template>
  <HomeBanner></HomeBanner>
  <NavHeader></NavHeader>
  <About></About>
  <ProjectsView></ProjectsView>
  <Contact></Contact>
  <Others></Others>
</template>

<script lang="ts">
import NavHeader from "@/components/NavHeader/NavHeader.vue";
import HomeBanner from "@/views/Home/HomeBanner.vue";
import ProjectsView from "@/views/Home/ProjectsView.vue";
import Contact from "@/views/Home/Contact.vue";
import About from "@/views/Home/About.vue";
import Others from "@/views/Home/Others.vue";
export default {
  name: "Home",
  components:{Others, About, Contact, ProjectsView, HomeBanner, NavHeader}
}
</script>

<style lang="sass">

</style>