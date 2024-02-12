<template>
    <div v-if="isopen" class="modal-ctn" @click="close" :data-blur="!props.noblur" >
        <div class="menu" @click.stop :data-pad="!nopad">
            <button v-if="!noclosebtn" class="reset-btn close-btn" @click="close"><Icon icon="ep:close-bold"/> </button>
                <slot/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {Icon} from "@iconify/vue";

interface props{
    noblur?: boolean
    noclosebtn?: boolean
    nopad?: boolean
}

const props = defineProps<props>()

const emit = defineEmits(["close"])
const isopen = defineModel<boolean>("isopen")

function close(){
    emit('close')
    isopen.value=false
}

</script>
<style scoped lang="scss">
.modal-ctn{
    z-index: 2000;
    position: fixed;
    height: 100vh;
    width: 100vw;
    padding: 0;
    top: 0;
    background: none;
    border: none;
    &[data-blur="true"]{
        backdrop-filter: blur(12px) brightness(.9);
    }

    display: flex;
    align-items: center;
    justify-content: center;
}
.menu{
    position: relative;
    &[data-pad="true"]{
        padding: 1rem 2.5rem;
    }

    background: var(--bg-0);
    border: solid 2px var(--bg-2);
    border-radius: 0.9rem;
    pointer-events: all;
    min-width: 10rem;
    min-height: 10rem;
}
.close-btn{
    color: var(--bg-3);
    font-size: 1.25rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}
</style>