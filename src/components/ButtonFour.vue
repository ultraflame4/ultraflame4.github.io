<!--easter egg component-->

<template>
  <div id="b4" ref="button">4
    <iframe v-if="discomode" id="thevideo" width="560" height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=0"></iframe>
    <div v-if="discomode" class="cover"
         style="width: 565px;height: 300px;left: 0;transform:translate(-50%,-14px)"></div>
    <div v-if="discomode" class="cover" style="width: 565px;height: 50px;left: 0;transform:translate(-50%,-88px)"></div>
    <div v-if="discomode" class="cover"
         style="width: 100px;height: 50px;left: 0;transform:translate(-100%,-50px)"></div>
    <div v-if="discomode" class="cover" style="width: 265px;height: 50px;left: 0;transform:translate(20px,-50px)"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import "@/gvars"
import gvars from "@/gvars";

export default defineComponent({
  name: "ButtonFour",
  data() {
    return {
      count: 0,
      discomode: false,
      mouseOver: false
    }
  },
  mounted() {
    let el = <HTMLDivElement>this.$refs.button;
    let anim = el.getAnimations()[0];


    let a = () => {
      if (anim.playState != "running") {
        anim.play()
        el.style.color = `hsl(${Math.random() * 360},68%,58%)`
      }

    }
    let c = (ev: FocusEvent) => {
      if (document.activeElement?.tagName === "IFRAME") {
        el.style.pointerEvents = "all"
        window.removeEventListener("click", c)
        el.attributes.removeNamedItem("style")
        el.classList.add("b4-disco")
        gvars.discomode = true
        gvars.discomode_callback()

      }
    }

    let b = () => {
      this.count += 1;

      if (this.count > 3) {
        alert("Woah Woah There, sloooww dooown..")
        el.removeEventListener("click", a);
        anim.removeEventListener("finish", b);
        this.discomode = true
        window.addEventListener("blur", c)
        el.style.pointerEvents = "none"
      }

    }

    if (this.$route.path === "/") {
      el.addEventListener("click", a)
      anim.addEventListener("finish", b);
    }
  }
})
</script>

<style scoped lang="scss">
@use "src/assets/colors";

#thevideo {
  position: absolute;
  z-index: -1;
  opacity: 0;
  left: 0;
  transform: translate(-50%, -20%);
  pointer-events: auto;
}

.cover {
  position: absolute;
  background-color: white;
  opacity: 0;
  pointer-events: all;
  cursor: auto;

}

#b4 {
  color: colors.$accent-1;
  display: inline-block;
  user-select: none;

  animation: shake 0.5s linear both;
  animation-play-state: paused;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;

  perspective: 1000px;
  position: relative;

}

#b4:hover {
  font-size: 105%;
  cursor: zoom-in;
}

.b4-disco {
  animation: rainbow !important;
  animation: rainbow 2.5s linear !important;
  animation-iteration-count: infinite !important;
}


@keyframes rainbow {
  100%, 0% {
    color: rgb(255, 0, 0);
  }
  8% {
    color: rgb(255, 127, 0);
  }
  16% {
    color: rgb(255, 255, 0);
  }
  25% {
    color: rgb(127, 255, 0);
  }
  33% {
    color: rgb(0, 255, 0);
  }
  41% {
    color: rgb(0, 255, 127);
  }
  50% {
    color: rgb(0, 255, 255);
  }
  58% {
    color: rgb(0, 127, 255);
  }
  66% {
    color: rgb(0, 0, 255);
  }
  75% {
    color: rgb(127, 0, 255);
  }
  83% {
    color: rgb(255, 0, 255);
  }
  91% {
    color: rgb(255, 0, 127);
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-1px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
}

</style>