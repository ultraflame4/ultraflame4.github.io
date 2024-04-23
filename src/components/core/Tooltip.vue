<template>
    <slot name="trigger" @mouseenter="mouse_enter" @mouseleave="active=false" />
    <Teleport to="body" >
        <div class="tooltip-content" :style="css_var" :data-open="active">
            <slot name="content" />
        </div>
    </Teleport>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";

const active = ref(false)
const position = ref<any>({left:"auto",top:"auto", right: "auto", "bottom":"auto"})
const css_var = computed(()=>position.value)

function mouse_enter(e: MouseEvent){
    active.value=true
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    position.value ={left:"auto",top:"auto", right: "auto", "bottom":"auto"}
    let center_x = rect.left + rect.width/2
    let center_y =  rect.top + rect.height/2

    let x_t = ""
    let y_t = ""

    if (center_y < window.innerHeight / 2){
        position.value["top"] =  rect.bottom + 'px'
    }
    else{
        position.value["top"] =  rect.top  + 'px'
        y_t =  `translateY(-100%)`
    }

    if (center_x > window.innerWidth / 2){
        position.value["left"] =  rect.right - 2 + 'px'
        x_t =  `translateX(-100% )`

    }
    else{
        position.value["left"] =  rect.left + 2 + 'px'
    }
    position.value["transform"] = `${x_t} ${y_t}`

}

</script>
<style scoped lang="scss">
.tooltip-content{
    position: fixed;

    color: black;
    font-weight: 700;
    font-family: "JetBrains Mono";
    letter-spacing: -0.2px;
    font-size: .75rem;
    background: rgb(246, 242, 226);
    border-radius: 0.5rem;
    
    z-index: 2000;

    padding: 0.2rem 0.25rem;
    margin: 0;
    pointer-events: none;

    max-width: 8rem;
    width: max-content;
    

    opacity: 0;
    transition: opacity 200ms ease;
    &[data-open="true"]{
        opacity: 1;
    }
}
</style>