<template>
  <NavHeader></NavHeader>
  <div id="bg-slideshow">
    <SlideShow ref="bg" :enable-overlay="true" :enable-snap-buttons="false" :enable-arrows="false"
               :enable-auto-play="false">
      <SlideshowItem v-for="i in getProjectList()"
                     :url="i.image_url ? i.image_url : ''"
                     :text="i.name"
      >

      </SlideshowItem>
    </SlideShow>
  </div>

  <div class="container" ref="ctn">
    <div class="items-ctn">
      <PListItem v-for="(i,index) in getProjectList()"
                 :project_name="i.name"
                 :item_index="index"
      />
    </div>
    <div class="item-preview-ctn">
      <h3 ref="ptitle" id="prview-title">
        {{ currentProject.name }}
      </h3>
      <div id="p-summary">
        <p ref="psummary">
          {{ currentProject.desc }}
        </p>
      </div>
      <div id="links-ctn">
        <Weblink v-if="currentProject.web" :url="currentProject.web"></Weblink>
        <GithubLink v-if="currentProject.repo" :url="currentProject.web"></GithubLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavHeader from "@/components/NavHeader/NavHeader.vue";
import PListItem from "@/views/ProjectsList/PListItem.vue";
import {getProjects, ProjectListItem} from "@/projectlist";
import Weblink from "@/components/Buttons/Weblink.vue";
import GithubLink from "@/components/Buttons/GithubLink.vue";
import SlideShow from "@/components/SlideShow/SlideShow.vue";
import SlideshowItem from "@/components/SlideShow/SlideshowItem.vue";

export default {
  name: "ProjectsList",
  components: {SlideshowItem, SlideShow, GithubLink, Weblink, PListItem, NavHeader},
  data: function () {
    return {
      currentProject: getProjects()[0]
    }
  },
  methods: {
    getProjectList(): ProjectListItem[] {
      return getProjects()
    },
    openItemInPreview(index: number) {
      let projectItem = this.getProjectList()[index]
      this.currentProject = projectItem
      this.$refs.bg.scrollToIndex(index)

    }
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/globals"
#bg-slideshow
  @extend .fullpage-end-section
  position: absolute
  padding-top: 0
  z-index: -1
.container
  @extend .fullpage-end-section
  padding: $size-5
  box-sizing: border-box
  display: flex
  gap: $size-2

  .items-ctn
    width: 35%
    height: 100%
    overflow-y: auto
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    gap: $size-2

  // Background will be image preview
  .item-preview-ctn
    width: calc(65% - $size-2)
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    gap: $size-2

    #prview-title
      height: fit-content
      width: 100%


    #p-summary
      height: 60%
      width: 50%
      overflow-y: auto
      background-color: rgba($color-mid2, 0.3)
      box-sizing: border-box
      padding: $size-3
      border-radius: $size-1
      display: flex
      align-items: flex-start
      justify-content: center

      p
        white-space: break-spaces
        color: $color-white2
        line-height: 30px

    #links-ctn
      min-height: $size-6
      max-height: calc($size-6 * 3 + $size-1 * 2)
      display: flex
      width: 50%
      align-items: center
      justify-content: center
      gap: $size-1 $size-3
      flex-wrap: wrap

      *
        min-width: $size-20
        max-width: 100%
        flex-grow: 1

</style>