<template>
  <button :class="$props.class+' vbutton'" @click="cycleState()">
    <div class="state-ctn" ref="ctn">
      <slot v-if="!stateful"></slot>
    </div>
  </button>
  <div style="display: none" ref="states">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "VButton",
  props: {
    class: {type: String, default: ""},
    ripple: {type: Boolean, default: true},
    stateful: {type: Boolean, default: false}
  },
  data() {
    return {
      statesHtml: <HTMLCollection | null>null,
      currentState: 0
    }
  },
  mounted() {
    this.statesHtml = (<HTMLDivElement>this.$refs.states).children;
    let ctn = <HTMLDivElement>this.$refs.ctn
    ctn.addEventListener("animationend",()=>{
      ctn.classList.remove("state-flip")
    })
    this.cycleState(0,true)
  },
  methods: {
    cycleState(stateIndex: number | null = null,supress:boolean=false) {
      if (this.statesHtml !== null) {
        this.currentState = stateIndex !== null ? stateIndex : this.currentState + 1
        if (this.currentState > this.statesHtml.length-1) {
          this.currentState = 0
        }
        if (!supress){this.$emit("click")}
        let ctn = <HTMLDivElement>this.$refs.ctn
        ctn.classList.toggle("state-flip")
        ctn.innerHTML = this.statesHtml[this.currentState].outerHTML


      }
    }
  }
})
</script>

<style lang="scss">
@use "src/assets/index";

.vbutton {
  background: inherit;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  height: 32px;
  width: 32px;
}

.state-ctn{
  margin: 0;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: none;
}
.state-ctn>*{
  animation: none;
}

.state-flip{
  animation: flip 500ms ease 0s;

}



</style>