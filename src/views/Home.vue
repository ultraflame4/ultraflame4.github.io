<template>
  <main>
    <video id="bg-anim" src="/moon.webm" type="video/webm" loop autoplay muted ref="anim"/>
    <section id="home">
      <SectionHeading>
        <SiteTitle/>
      </SectionHeading>
      <h1 id="homeHeading" ref="bigtext">Hello!</h1>
      <p style="animation-delay: 1s">Welcome to my website!</p>
      <br>
      <small>No.4 is looking kinda out of place.</small>
      <SectionGoTo href="/#about">About</SectionGoTo>
    </section>
    <section id="about">
      <SectionHeading>
        ABOUT ME
      </SectionHeading>
      <p>I'm an amateur self-taught programmer,</p>
      <p> learned programming at the age of 12, learning from various </p>
      <p> youtube videos & online courses.</p>
      <br>
      <p>Since then, I've dabbled in a bunch of stuff and have done a variety projects</p>

      <br>
      <p>These are some of the projects I've worked on. </p>
      <br>
      <small>Hopefully I'll finish them someday...</small>
      <SectionGoTo href="/#projects">Projects</SectionGoTo>
    </section>
    <section id="projects">
      <SectionHeading>Projects</SectionHeading>
      <p>Here are some of the projects I've done.</p>

        <div id="feature-projects-card-ctn">
          <!--        // todo: Change repo link to preview on full projects page-->
          <Card class="project-card" v-for="item in getFeaturedProjects()"
                :style="`background-image: url(${item.image_url});`"
                :title="item.name"
                :href="item.repo"
          >
            <h3 class="absCenter" style="letter-spacing: 2px;mix-blend-mode: difference;color: white">{{ item.name }}</h3>
          </Card>
        </div>


      <br>
      <br>
      <VLink href="/projects">See all projects <span class="material-icons absYcenter">arrow_right_alt</span></VLink>
      <SectionGoTo href="/#contact">Contact</SectionGoTo>
    </section>
    <section id="contact">
      <SectionHeading>Contact</SectionHeading>
      <p>You can contact me at:</p>
      <ContactList/>
      <SectionGoTo href="/#others">Others</SectionGoTo>
    </section>
    <section id="others" style="height: 500px">
      <SectionHeading>Others</SectionHeading>
      <p>There seems to be nothing here.</p>
      <p>Why dont u check out the suspicous No.4 I was talking about <VLink href="/#home" class="inherit-txtsize">earlier</VLink>.</p>
    </section>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue"

import {Lrc, Runner} from "lrc-kit";
import gvars from "@/gvars";
import SectionHeading from "@/components/Section/SectionHeading.vue";
import SectionGoTo from "@/components/Section/SectionGoTo.vue";
import Card from "@/components/Card.vue";
import VLink from "@/components/Misc/Link.vue";
import {getProjects, ProjectListItem} from "@/projectlist";
import SocialRef from "@/components/Misc/SocialRef.vue";
import SiteTitle from "@/components/Misc/SiteTitle.vue";
import ContactList from "@/components/ContactList.vue";

const lyricsRunner = new Runner()
fetch("ricksubs.lrc").then(value => {
  value.text().then(txt => {
    lyricsRunner.setLrc(Lrc.parse(txt))
  })
})

function setText(text: string) {
  let e = document.querySelector<HTMLHeadingElement>("#homeHeading")
  if (e) {
    e.textContent = text
  }
}

function getNowSeconds() {
  return new Date().getTime() / 1000;
}

let t = 0
const vidend = 360
gvars.discomode_callback = () => {
  setTimeout(() => {
    setText("DISCO TIME")
    let e = document.querySelector<HTMLHeadingElement>("#homeHeading")
    if (e) {
      e.style.fontSize = "96px"
    }
  }, 0)
  setTimeout(() => {
    setText("NOW PLAYING:")
  }, 3000)
  setTimeout(() => {
    setText("NEVER GONNA GIVE YOU UP")
  }, 6000)
  setTimeout(() => {
    setText("BY:")
  }, 9000)
  setTimeout(() => {
    setText("RICK ASTLEY")
  }, 12000)

  t = getNowSeconds();
  setTimeout(() => {

    setInterval(() => {
      let current = getNowSeconds();
      let timestamp = current - t;
      lyricsRunner.timeUpdate(timestamp)
      let e = document.querySelector<HTMLHeadingElement>("#homeHeading")
      if (e) {
        setText(lyricsRunner.curLyric().content)
      }

    }, 10)
  }, 18000)
}

export default defineComponent({
  name: "Home",
  components: {ContactList, SiteTitle, SocialRef, VLink, Card, SectionGoTo, SectionHeading},
  mounted() {
    window.addEventListener("load", () => {
      // (<HTMLVideoElement>this.$refs.anim).play();
    })
  },
  methods: {
    getFeaturedProjects(): ProjectListItem[] {
      return getProjects().slice(0, 5)
    }
  }
})
</script>

<style lang="scss">
@use "src/assets/vars";

#bg-anim {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
  opacity: 15%;
  filter: brightness(180%) grayscale(.5);
  animation-duration: 6s;

  background: transparent;
}

#center-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
}

#homeHeading {
  font-size: min(128px, 20vw);
  font-weight: 100;
  transition: none;
  animation-delay: 500ms;
  text-align: center;
  color: black;
  mix-blend-mode: difference;


}

#projects {

  & > #feature-projects-card-ctn {


    margin-top: 32px;
    min-width: calc(90% - 256px);
    max-width: 1000px;
    max-height: 50%;

    display: flex;
    gap: 18px;
    overflow-x: hidden;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 16px;

    @media only screen and (max-height: vars.$minscreen-h) {
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 600px;
    }

    & > .project-card:nth-child(1){ // force the first two card to be bigger (increased width of first card pushes the rest to next row)
      @media only screen and (min-width: vars.$minscreen-w) { // check if screen is big enough
        min-width: 400px;
      }

    }

    & > .project-card {
      flex-grow: 1;
      min-width: 300px;
      min-height: 200px;

      @media only screen and (max-width: vars.$minscreen-w) {
        min-width: 200px;
        min-height: 150px;
        font-size: 14px;
      }

      margin: auto; //use flexbox auto margin instead of justify content so that when overflowing, we can scroll to top
    }

  }


}

</style>