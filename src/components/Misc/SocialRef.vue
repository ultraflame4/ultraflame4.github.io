<template>
  <div class="social-ref">
    <img class="social-ref-img" :src="icon" :alt="`logo of ${name}`">
    <VLink :href="href" class="social-ref-link">

      {{ name }}
      {{ text!==undefined ? ":" : "" }}
      <span v-if="text!==undefined" class="social-ref-text">{{ text }}</span>
    </VLink>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import VLink from "@/components/Misc/Link.vue";

export default defineComponent({
  name: "SocialRef",
  components: {VLink},
  props: {
    href: {type: String, defaut: ""},
    icon: {type: String, defaut: ""},
    name: {type: String, defaut: ""},
    text: String
  }
})
</script>

<style lang="scss">
.social-ref{
  display: flex;
  font-size: 13px;

  gap: 8px;
  align-items: center;
  animation-delay: 1s;

  &>.social-ref-link{
    font-size: inherit;

    &>.social-ref-text{
      font-size: inherit;
      font-weight: 600;
    }
  }

  &>.social-ref-img{
    height: 1.5em;

  }

}
</style>