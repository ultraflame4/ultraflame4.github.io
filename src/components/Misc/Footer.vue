<template>
  <footer id="footer">
    <div id="footer-ctn">
      <small id="copyright">&copy; Copyright 2022, ultraflame4 All rights reserved.</small>
      <ul>
        <p class="footer-heading">
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
      <ul class="footer-left">
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
  height: fit-content;
  width: 100%;
  overflow: hidden;
  padding: 0 16px;
  display: flex;
  flex-direction: column;


  #footer-ctn {
    --distance: 5%;
    display: flex;
    height: 100%;
    box-sizing: border-box;
    width: min(100%, 1500px);
    padding: 32px var(--distance);
    padding-bottom: 48px;

    gap: var(--distance);
    border-top: rgba(black,30%) solid 2px;
    position: relative;

    .footer-left{
      margin-left: auto;
    }

    #copyright{
      position: absolute;
      bottom: 10px;
      left: 64px;
      font-size: 14px;
    }

    @media only screen and (max-width: 600px){
      flex-direction: column;
      height: fit-content;
      gap: 24px;


      .footer-left{
        margin-left: 0;
      }
      #copyright{
        left: 50%;
        transform: translateX(-50%);
        width: fit-content;
        font-size: 13px;
        font-weight: 500;
      }
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