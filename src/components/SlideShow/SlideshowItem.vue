<template>
  <div>
    <img :src="url" :alt="text">
    <p v-html="formatText(text)"></p>
  </div>
</template>

<script lang="ts">
export default {
  name: "SlideshowItem",
  props:["url","text"],
  methods:{
    formatText (text:string){
      return linkify(text);
    }
  }
}

function linkify(inputText: string) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
}
</script>

<style scoped lang="sass">
@import "src/assets/globals"
div

  overflow: hidden
  flex-shrink: 0
  position: relative
  width: 100%
  height: 100%
  scroll-snap-align: start
  img
    object-fit: cover
  p
    position: absolute
    bottom: $size-1
    left: $size-1
    color: $color-white1
    letter-spacing: 1px
    @extend .txt-shadow
</style>