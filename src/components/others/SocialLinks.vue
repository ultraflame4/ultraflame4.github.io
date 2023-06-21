<template>
    <ul>
        <li><a href="https://github.com/ultraflame4" target="_blank"><Icon icon="mdi:github"/></a></li>
        <li><a href="https://www.linkedin.com/in/chester-lai-yu-heng/" target="_blank"><Icon icon="mdi:linkedin"/></a></li>
    </ul>
</template>

<script setup lang="ts">
import {Icon} from "@iconify/vue";

</script>


<style scoped lang="scss">
a {
    font-size: 2.35em;
    &::after{
        content: "" !important;
    }
    color: var(--txt-a-tinted);
    &:hover{
        color: var(--txt-a) !important;
    }
}
ul{
    display: flex;

    gap: 0.25rem;
}

</style>
