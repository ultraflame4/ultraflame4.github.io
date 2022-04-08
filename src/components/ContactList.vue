<template>
  <ul id="contact-list">
    <li>
      <SocialRef
          name="Github"
          text="ultraflame4"
          href="https://github.com/ultraflame4"
          icon="https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/github.svg"
      />
    </li>
    <li>
      <SocialRef
          name="Instagram"
          text="@ultraflame42"
          href="https://www.instagram.com/ultraflame42/"
          icon="https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/dark/instagram.svg"
      />
    </li>
    <li>
      <SocialRef
          name="Reddit"
          text="u/Ultraflame4"
          href="https://www.reddit.com/user/Ultraflame4"
          icon="https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/dark/reddit.svg"
      />
    </li>
    <li>
      <SocialRef
          name="Email"
          text="ultraflame4@gmail.com"
          href="mailto:ultraflame4@gmail.com"
          icon="https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/dark/gmail.svg"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import SocialRef from "@/components/Misc/SocialRef.vue";

export default defineComponent({
  name: "ContactList",
  components: {SocialRef}
})
</script>

<style lang="scss">
@use "src/assets/colors";
#contact-list {
  padding: 0;
  height: fit-content;
  & > li {
    list-style-type: none;
    display: flex;

    width: fit-content;
    margin-left: 0;
    margin-top: 16px;

  }
  & .link-underline{
    background-color: colors.$accent-2;
  }
}
</style>