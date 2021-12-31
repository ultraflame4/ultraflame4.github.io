<template>

  <Header></Header>
  <div id ="contents">

    <iframe id="video" style="height: 100vh; width: 100vw"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube video player"
    ></iframe>

    <div id="dance-ctn">
      <h1 id="dancing_guy" style="font-size: 128px;background: white;padding: 8px;width: fit-content">
        \( ' v ' )/
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/NavHeader/NavHeader.vue";

function updateDanceGuy(){
  let ele =document.getElementById("dancing_guy")
  if (ele == null){
    return
  }
  if (ele.textContent === "<( ' v ' <)-") {
    ele.textContent = "-(> ' v ' )>"
  } else {
    ele.textContent = "<( ' v ' <)-"
  }
}

let handle = setInterval(updateDanceGuy,300)


export default {
  name: "RouteR",
  components: {Header},

  unmounted() {
    clearInterval(handle)
  }
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#contents
  color: black
  @extend .fullpage-end-section
  padding: 0
  #dance-ctn
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    pointer-events: all
</style>