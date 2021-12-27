<template>
  <button class="pview-link" ref="plink" @click="open(url)">
    <img v-if="iconName.length>0" :src="getIconUrl(iconName)"/>
    <p>{{ text }}</p>
  </button>
</template>

<script lang="ts">
import {PropType} from "vue";
type iconNames = "github" | "web"

export default {
  name: "PViewItemLink",
  props: {
    "iconName":{
      default: "",
      type:Object as PropType<iconNames>
    },
    "text":String,
    "url":String
  },
  methods:{
    getIconUrl(name: iconNames) {
      switch (name) {
        case "github":
          return "/GitHub-Mark-64px.png"

        default:
          return ""
      }
    },
    open(url:string){
      window.open(url)
    }
  },
  mounted() {
    this.$refs.plink.dataset.type = this.iconName;
  }
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
.pview-link
  width: $size-30
  height: $size-5
  border-radius: $size-1
  border: none
  display: flex
  align-items: center
  padding-left: $size-1
  padding-right: $size-1
  p
    justify-self: flex-end
    margin: auto
    font-size: $size-2
    flex-grow: 1
  img
    margin: auto
    justify-self: flex-start
    height: $size-3
  pointer-events: auto
.pview-link[data-type="github"]
  background-color: #dadcd8
.pview-link[data-type="web"]
  background-color: $color-mid1
  color: $color-white1
.pview-link:hover
  filter: brightness(95%)
.pview-link:active
  filter: brightness(90%)
</style>