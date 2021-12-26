<template>
  <div id="container">
    <div id="images-container" ref="slideshow">
      <SlideshowItem v-for="image in images"
                     :url="image.url"
                     :text="image.text"
      >
      </SlideshowItem>
    </div>

    <button class="arrows" id="arrow-l" @click="scrollNext(true)">
      <svg xmlns="http://www.w3.org/2000/svg" width="76" height="72" viewBox="0 0 24 24"
           style="fill: rgba(255, 255, 255, 1);">
        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
      </svg>
    </button>
    <button class="arrows" id="arrow-r" @click="scrollNext()">
      <svg xmlns="http://www.w3.org/2000/svg" width="76" height="72" viewBox="0 0 24 24"
           style="fill: rgba(255, 255, 255, 1);">
        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
      </svg>
    </button>

    <div id="slidersnap-buttons" ref="snapbuttons">
      <SliderSnapButtons v-for="(image,index) in images"
                         :index="index"
      ></SliderSnapButtons>
    </div>
  </div>

</template>

<script lang="ts">
import SlideshowItem from "@/components/SlideShow/SlideshowItem.vue";
import SliderSnapButtons from "@/components/SlideShow/SliderSnapButtons.vue";

export default {
  name: "SlideShow",
  components: {SliderSnapButtons, SlideshowItem},
  props: ["images"],

  data: function () {
    return {
      currentIndex: 0,
      slideshowLoop: null
    }
  },
  created() {
    this.slideshowLoop = setInterval(()=>this.slideShowLoop(),5000)
  },
  beforeUnmount() {
    clearInterval(this.slideshowLoop)
  },
  mounted() {
    this.updateSnapButtons()
  },
  methods: {

    slideShowLoop(){
      if (this.currentIndex==this.images.length-1){
        this.scrollToIndex(0)
      }
      else{
        this.scrollToIndex(this.currentIndex+1)
      }
    },
    scrollNext(left: boolean = false) {
      let direction = (left ? -1 : 1)
      this.scrollToIndex(this.currentIndex+direction)
      this.updateSnapButtons()
    },

    scrollToIndex(index: number) {
      if (index >= this.images.length){
        index=0
      }
      else if (index < 0)
      {
        index = this.images.length-1
      }

      this.$refs.slideshow.scroll({
        left: this.$refs.slideshow.offsetWidth * index,
        behavior: "smooth"
      })
      this.currentIndex = index
      this.updateSnapButtons()
    },

    updateSnapButtons() {
      let children = this.$refs.snapbuttons.children
      console.log(children)
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.dataset.index == this.currentIndex){
          child.dataset.s="true"
        }
        else{
          child.dataset.s="false"
        }
      }
    }
  }
}

</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#container
  position: relative
  height: 100%
  max-width: 100%
  display: flex

  #slidersnap-buttons
    position: absolute
    bottom: $size-5
    width: 100%
    display: flex
    justify-content: center
    gap: $size-1

  #images-container
    display: flex
    overflow-x: auto
    scroll-snap-type: x mandatory

    -ms-overflow-style: none
    /* IE and Edge */
    scrollbar-width: none
  /* Firefox */



  #images-container::-webkit-scrollbar
    display: none

  .arrows
    cursor: pointer
    position: absolute
    top: 0
    bottom: 0
    height: 100px
    margin-top: auto
    margin-bottom: auto
    background-color: transparent
    border: none
    transition: transform 0.1s ease-in

    svg
      filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7))

  .arrows:hover
    transform: scale(1.5)

  .arrows:active
    transform: scale(1)

  #arrow-l
    left: 0

  #arrow-r
    right: 0

</style>