<template>
  <footer id="footer">
    <div id="footer-ctn">
      <small id="copyright">&copy; Copyright 2022, ultraflame4 All rights reserved.</small>
      <ul>
        <p style="font-weight: 600;letter-spacing: 4px;">
          <SiteTitle/>
        </p>
        <VLink href="/#about">Home</VLink>
        <VLink href="/#about">About</VLink>
        <VLink href="/#projects">Projects</VLink>
        <VLink href="/#contact">Contact</VLink>
        <VLink href="/#others">Others</VLink>
      </ul>
      <ul>
        <p class="footer-heading">Projects</p>
        <VLink href="/projects">All projects</VLink>
      </ul>
      <ul style="margin-left: auto">
        <p class="footer-heading">Socials</p>
        <ContactList/>
      </ul>

    </div>
  </footer>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import SiteTitle from "@/components/Misc/SiteTitle.vue";
import VLink from "@/components/Misc/Link.vue";
import ContactList from "@/components/ContactList.vue";

export default defineComponent({
  name: "Footer",
  components: {ContactList, VLink, SiteTitle}
})
</script>

<style lang="scss">
@use "src/assets/colors";
.footer-heading{
  font-weight: 600;letter-spacing: 2px;font-size: 14px;
}

#footer {
  //background-color: white;
  box-sizing: border-box;
  height: min(30vh, 300px);
  width: 100%;
  overflow: hidden;
  padding: 0 16px;
  display: flex;
  flex-direction: column;


  & > #footer-ctn {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    width: min(100%, 1500px);
    padding: 32px 128px;
    border-top: rgba(black,30%) solid 2px;
    gap: 128px;
    position: relative;


    #copyright{
      position: absolute;
      bottom: 10px;
      left: 64px;
      font-size: 14px;
    }

    & > ul {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin: 0;
      width: fit-content;
      align-items: flex-start;
      gap: 12px;
      & > * {
        margin: 0;
      }
      & > .link{

        font-weight: 400;
        width: fit-content;
        letter-spacing: 3px;
      }
    }


  }
}
</style>