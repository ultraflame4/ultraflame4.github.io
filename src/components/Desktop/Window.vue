<script lang="ts" setup>
import { computed } from 'vue';


const windowTitle = computed(()=>document.title)

</script>
<template>
    <div class="border-2 rounded-lg overflow-hidden border-mantle drop-shadow-xl grid"
        style="grid-template-rows: auto 1fr;">

        <div class="decoration h-8 bg-mantle" >
            
            {{  windowTitle }}

        </div>

        <div class="content p-2 bg-base">
            <slot ></slot>
        </div>
    </div>
</template>