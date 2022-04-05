<template>
  <main>
    <video id="bg-anim" src="/moon.webm" type="video/webm" loop autoplay muted ref="anim"/>
    <section id="home">
      <SectionHeading>
        ultr<span class="b4-color">4</span>2
      </SectionHeading>
      <h1 id="homeHeading" ref="bigtext">Hello!</h1>
      <p>Welcome to my website!</p>
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
    </section>
    <section id="projects">

    </section>

  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue"

import {Lrc, Runner} from "lrc-kit";
import gvars from "@/gvars";
import SectionHeading from "@/components/Section/SectionHeading.vue";
import SectionGoTo from "@/components/Section/SectionGoTo.vue";

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
  components: {SectionGoTo, SectionHeading},
  mounted() {
    window.addEventListener("load", () => {
      // (<HTMLVideoElement>this.$refs.anim).play();
    })
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
  animation-delay: 1s;
  text-align: center;
  color: black;
  mix-blend-mode: difference;


}

</style>