<template>
    <div class="anchor" ref="anchor"></div>
    <Teleport to="body">
        <Modal v-model:isopen="menuactive" noblur noclosebtn nopad class="popup" :style="{
            '--x': left+'px',
            '--y': top+'px'
        }">
            <slot/>
        </Modal>
    </Teleport>
</template>
<script setup lang="ts">
import Modal from "@/components/core/Modal.vue";
import {onMounted, onUpdated, ref} from "vue";

const menuactive = defineModel<boolean>("active")
const anchor = ref<HTMLDivElement|null>(null)
const top = ref(0)
const left = ref(0)
const right = ref(0)
const bottom = ref(0)

function updatePosition(){
    const rect = anchor.value?.getBoundingClientRect();
    console.log("Update pos", rect)
    if (!rect) return
    top.value=rect.top;
    left.value=rect.left;
    bottom.value=rect.bottom;
    right.value=rect.right;
}

onMounted(() => updatePosition())
onUpdated(() => updatePosition())

</script>
<style scoped lang="scss">
.anchor{
    position: absolute;
    width: 0;
    height: 0;
}
.popup{
    display: flex;
    position: fixed;
    align-items: flex-start;
    justify-content: flex-start;
}
.popup:deep(.menu){
    position: relative;
    top: var(--y);
    left: var(--x);
    padding: 0.5rem 0.75rem;
}
</style>