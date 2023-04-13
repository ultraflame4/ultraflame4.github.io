<template>
<main>
    <div id="banner-video">
        <video autoplay muted loop preload="auto">
            <source src="moon.webm">
        </video>
    </div>
</main>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
#banner-video{
    min-height: 100vh;
    width: 100%;
    filter: brightness(120%) saturate(45%);


}
</style>
