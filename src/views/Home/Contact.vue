<template>
  <div id="contact">
    <h1>
      Contact
    </h1>
    <div id="contacts-ctn">
      <ContactItem img="/src/assets/glyph-logo_May2016.png" text="@ultraflame42" url="https://www.instagram.com/ultraflame42/"/>
      <ContactItem img="/src/assets/Reddit_Mark_OnDark.png" text="u/Ultraflame4" url="https://www.reddit.com/user/Ultraflame4"/>
      <ContactItem img="/src/assets/GitHub-Mark-64px.png" text="ultraflame42" url="https://github.com/ultraflame4/"/>
    </div>
  </div>
</template>

<script lang="ts">
import ContactItem from "@/views/Home/ContactItem.vue";

export default {
  name: "Contact",
  components: {ContactItem}
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#contact
  color: $color-white1
  @extend .full-page
  position: relative
  h1
    margin-top: $size-5

  #contacts-ctn
    display: flex
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

    justify-content: center
    flex-direction: column
    align-items: center
    gap: $size-2
</style>