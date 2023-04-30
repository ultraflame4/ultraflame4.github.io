<template>
    <div id="home-banner" v-iratio="iratio">
        <video autoplay muted loop preload="auto" class="iratio-parallax">
            <source src="moon.webm">
        </video>
        <div id="banner-content">
            <h1><span id="handwave">👋</span> Hello ! &nbsp;</h1>
            <h2>I'm Chester</h2>
            <p>Welcome to my little corner of the internet!</p>
            <br/>
            <p>Look around</p>
        </div>
    </div>
    <main>
        <section>
            <h1 id="about">
                <HashLink to="about">About</HashLink>
            </h1>
        </section>
        <p v-for="i in 100">
            tset
        </p>
    </main>
</template>

<script lang="ts" setup>
import {iRatioObject} from "vyue42";
import HashLink from "@/components/HashLink.vue";
import {PageNavTree} from "../router/page_navtree";

const iratio = new iRatioObject({
    exit: false,
    invert: false
})

</script>

<style lang="scss" scoped>
#home-banner {

    position: relative;
    height: calc(100vh - 10rem);
    width: 100%;
    z-index: 0;

    video {
        position: absolute;
        bottom: 0;
        height: 100%;

        filter: brightness(90%) saturate(75%) grayscale(30%);
    }


    &:after {
        content: "";
        position: absolute;
        height: 50%;
        width: 100%;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(0deg, var(--bg-0) 0%, transparent 50%);
    }

    #banner-content {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        z-index: 2;

        h1, h2, p {
            margin: 0;
            margin-bottom: 1rem;
            filter: drop-shadow(0 0 0.2rem var(--bg-0));
        }

        h1 {
            font-size: 4rem;
            font-family: "Poppins";
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
        }

        p {
            font-weight: 500;
            font-size: 1.1rem;
            letter-spacing: 0.05rem;
        }

        #handwave {
            display: inline-block;
            animation: wave 2.5s ease infinite;
            transform-origin: 70% 80%;
        }
    }

}

main {
    z-index: 3;
    background: var(--bg-0);
}

@keyframes wave {
    0%, 30% {
        transform: rotate(0);
    }
    5%, 15% {
        transform: rotate(-15deg);
    }
    10%, 20% {
        transform: rotate(15deg);
    }

}
</style>
