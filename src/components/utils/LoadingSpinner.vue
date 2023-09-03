<template>
    <div class="loader-ctn">
        <span class="loader"></span>
    </div>
</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">
.loader-ctn {
    padding: 0.25em 3em;
    overflow: visible;
}

.loader, .loader:before, .loader:after {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    animation-fill-mode: both;
    box-sizing: border-box;
    animation: bblFadInOut 1s ease-in-out infinite;
    overflow: visible;
    position: relative;
    bottom: 2em;

}

.loader {
    display: inline-block;
    color: #FFF;
    font-size: 7px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
}

.loader:before,
.loader:after {
    content: '';
    position: absolute;
    top: 0;
}

.loader:before {
    left: -4em;
    animation-delay: -0.2s;
}

.loader:after {
    left: 4em;
    animation-delay: 0.2s;
}

@keyframes bblFadInOut {
    0%,20%,100% {
        box-shadow: 0 2.5em 0 -0.75em  var(--bg-3);
    }
    60% {
        box-shadow: 0 2.5em 0 0  var(--bg-3);
    }

}

</style>