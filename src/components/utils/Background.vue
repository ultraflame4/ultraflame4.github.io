<template>
    <div id="pulse">
        <div class="gradient"></div>
        <div class="gradient"></div>
    </div>


</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">


#pulse {
    // When changing cell size, you may also need to adjust dot size
    --cell-size: 8px;
    --dot-size: 0.1px;
    
    height: 100vh;
    width: 100vw;

    display: flex;
    place-content: center;
    align-items: center;
    overflow: hidden;
    background-image: radial-gradient(circle at center, black var(--dot-size), transparent var(--dot-size));
                      
    background-size: var(--cell-size) var(--cell-size);
    background-position: 0px 0px;
    
    // background-repeat: round;
    // transform: rotate(25deg);

}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes pulsing {
    0%{
        opacity: 0.25;
     
    }
    100%{
        opacity: 1;
    }
}

.gradient {
    --size: 800px;
    width: var(--size);
    height: var(--size);
    filter: blur(calc(var(--size) / 5));
    position: absolute;
    background-image: linear-gradient(20deg, rgb(255, 51, 126) 0%, rgb(188, 62, 255) 18%, rgba(9,9,121,1) 38%, rgba(8,49,121,1) 57%, rgba(5,175,120,1) 74%, rgba(0,212,255,1) 100%);
    animation: rotate 14s linear infinite, pulsing 5s ease-in-out alternate infinite;
    border-radius: 70% 30% 50% 30% / 30% 30% 40% 70%;
    z-index: -1;
}

.gradient:nth-child(2){
    filter: blur(64px);
    background: rgba(white, 10%);
    border-radius: 10% / 40%;
    animation-duration: 12s;
    animation-delay: 4s;
    
}

.version_text {

    text-transform: lowercase;
    font-family: "Poppins";
    letter-spacing: 1px;
    font-size: 0.9em;
    font-weight: 600;
    background: var(--bg-2);
    padding: 0 0.45rem;
    border-radius: 0.35rem;

}

p {
    letter-spacing: 0.1px;
}


</style>