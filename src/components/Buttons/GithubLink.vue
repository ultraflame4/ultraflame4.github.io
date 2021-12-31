<template>
  <BaseLink class="github-link" text="View on Github" icon-url="/GitHub-Mark-64px.png" :url="url">
  </BaseLink>
</template>

<script>

import BaseLink from "@/components/Buttons/BaseLink.vue";

export default {
  name: "GithubLink",
  components: {BaseLink},
  props: {
    url: String
  }
}
</script>

<style scoped lang="sass">
.github-link
  background-color: #dadcd8

</style>