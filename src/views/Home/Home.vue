

<template>
  <HomeBanner></HomeBanner>
  <NavHeader></NavHeader>
  <ProjectsView></ProjectsView>
  <Contact></Contact>
</template>

<script lang="ts">
import NavHeader from "@/components/NavHeader/NavHeader.vue";
import HomeBanner from "@/views/Home/HomeBanner.vue";
import ProjectsView from "@/views/Home/ProjectsView.vue";
import Contact from "@/views/Home/Contact.vue";
export default {
  name: "Home",
  components:{Contact, ProjectsView, HomeBanner, NavHeader}
}
</script>

<style lang="sass">

</style>