<!-- A Sample of the best projects-->
<!-- Scrolling background with images of best project?-->

<script lang="ts">
import SlideShow from "@/components/SlideShow/SlideShow.vue";
import SlideshowItem from "@/components/SlideShow/SlideshowItem.vue";
import PViewItem from "@/views/Home/PViewItem.vue";
import {getProjects, ProjectListItem} from "@/projectlist";


export default {
  name: "ProjectsView",
  components: {PViewItem, SlideshowItem, SlideShow},
  methods:{
    getProjectList(): ProjectListItem[] {
      return getProjects().slice(0,5);
    }
  }
}
</script>

<template>
  <div id="projects-view">
    <div id="pview-slideshow-ctn">
      <SlideShow enable-overlay=true>
        <SlideshowItem v-for="item in getProjectList()"
                       :url = "item.image_url"
                       text=""
        >
          <PViewItem :title="item.name"
                     :desc="item.desc"
                     :repo="item.repo"
                     :web="item.web"
          />
        </SlideshowItem>
      </SlideShow>
    </div>
    <div id="pview-layer">
      <h1>Projects</h1>
      <br>
      <p>The best of my projects</p>
    </div>

  </div>
</template>

<style scoped lang="sass">
@import "src/assets/globals"
#projects-view
  @extend .fullpage-section
  color: $color-white1
  position: relative
  padding-top: $size-7
  #pview-layer
    h1
      @extend .txt-shadow
    p
      @extend .txt-shadow
    position: absolute
    top: $size-5
    left: 0
    width: 100%
    height: 100%
    padding-top: $size-8
    pointer-events: none
  #pview-slideshow-ctn
    height: calc(100% - $size-7)

</style>