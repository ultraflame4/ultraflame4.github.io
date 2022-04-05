<template>
  <main>
    <video id="bg-anim" src="/moon.webm" type="video/webm" loop autoplay muted ref="anim"/>
    <section id="home-section">

      <div id="center-text">
        <h5 style="font-weight: 600;letter-spacing: 2px;position: absolute;top: -10px">ultr<span class="b4-color">4</span>2</h5>
        <h1 id="homeHeading" ref="bigtext">Hello !</h1>
        <p>I'm an amateur teen programmer and I do a variety things.</p>
        <br>
        <p>These are some of the projects I've worked on. </p>
        <p>Hopefully I'll finish them someday...</p>
      </div>


    </section>
    <section style="height: 100vh">

    </section>

  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue"

import {Lrc, Runner} from "lrc-kit";
import gvars from "@/gvars";

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


#home-section {
  height: calc(100vh - vars.$header-unpinned-height);
  width: 100%;
  position: relative;
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
}

#homeHeading {
  font-size: 128px;
  font-weight: 100;
  transition: none;
  animation-delay: 500ms;
  text-align: center;
  color: black;
  mix-blend-mode: difference;

}

</style>