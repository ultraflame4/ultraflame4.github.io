<template>
  <main>
    <section>
      <div id="home-section">
        <video id="bg-anim" src="/moon.webm" type="video/webm" loop autoplay muted ref="anim"/>
        <div id="center-text">
          <h1 id="bigtext" ref="bigtext">Hello</h1>
        </div>
      </div>
    </section>

  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import NavBar from "@/components/NavBar/NavBar.vue";
import {Lrc, Runner} from "lrc-kit";
import gvars from "@/gvars";

const lyricsRunner = new Runner()
fetch("ricksubs.lrc").then(value => {
  value.text().then(txt => {
    lyricsRunner.setLrc(Lrc.parse(txt))
  })
})

function setText(text: string) {
  let e = document.querySelector<HTMLHeadingElement>("#bigtext")
  if (e){e.textContent = text}
}

function getNowSeconds() {
  return new Date().getTime() / 1000;
}

let t = 0
const vidend = 360
gvars.discomode_callback=()=>{
  setTimeout(()=>{
    setText("DISCO TIME")
    let e = document.querySelector<HTMLHeadingElement>("#bigtext")
    if (e){e.style.fontSize="96px"}
  },0)
  setTimeout(()=>{
    setText("NOW PLAYING:")
  },3000)
  setTimeout(()=>{
    setText("NEVER GONNA GIVE YOU UP")
  },6000)
  setTimeout(()=>{
    setText("BY:")
  },9000)
  setTimeout(()=>{
    setText("RICK ASTLEY")
  },12000)

  t = getNowSeconds();
  setTimeout(()=>{

    setInterval(()=>{
      let current = getNowSeconds();
      let timestamp = current-t;
      lyricsRunner.timeUpdate(timestamp)
      let e = document.querySelector<HTMLHeadingElement>("#bigtext")
      if (e){setText(lyricsRunner.curLyric().content)}

    },10)
  },18000)
}

export default defineComponent({
  name: "Home",
  components: {NavBar},
  mounted() {
    window.addEventListener("load",()=>{
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
  opacity: 30%;
  filter: brightness(180%) grayscale(.5);
  animation-duration: 6s;
  background: transparent;
}


#home-section {
  height: calc(100vh - vars.$navbar-unpinned-height);
  width: 100%;
  position: relative;
}

#center-text {
  height: 100vh;
  width: 100%;
  top: calc(100% - 100vh);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

}

#bigtext{
  font-size: 128px;
  font-weight: 100;
  animation-duration: 3s;
  text-align: center;
  margin: 0 64px;
  color: black;
  mix-blend-mode: difference;

}

</style>