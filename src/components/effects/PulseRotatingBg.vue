<template>
    <div class="pulse-bg">
        <div class="dots"> </div>
        <div class="gradient"></div>
        <div class="gradient"></div>
    </div>


</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">
.pulse-bg {
    // When changing cell size, you may also need to adjust dot size
    --cell-size: 9px;
    --dot-size: 1px;

    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;

    display: flex;
    align-items: center;
    justify-content: center;

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
    0% {
        opacity: 0.25;

    }

    100% {
        opacity: 1;
    }
}

.dots {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    place-content: center;

    background-image: radial-gradient(circle at center, black var(--dot-size), transparent 0);

    background-size: var(--cell-size) var(--cell-size);
    background-position: 0px 0px;
}

.gradient {
    --size: 800px;
    width: var(--size);
    height: var(--size);
    filter: blur(calc(var(--size) / 5));
    position: absolute;
    background-image: linear-gradient(20deg, hsl(334, 100%, 60%) 0%, hsl(281, 100%, 62%) 18%, hsl(240, 40%, 45%) 38%, hsl(215, 67%, 50%) 57%, hsl(162, 64%, 50%) 74%, hsl(188, 100%, 42%) 100%);
    animation: rotate 14s linear infinite, pulsing 5s ease-in-out alternate infinite;
    border-radius: 70% 30% 50% 30% / 30% 30% 40% 70%;
    z-index: -1;
}

.gradient:nth-child(2) {
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