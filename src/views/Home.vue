<template>
    <div id="home-banner" v-iratio="bannerIRatio">
        <video autoplay muted loop preload="auto" class="iratio-parallax">
            <source src="/moon.webm">
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
        <section class="flex-center" id="about">
            <SectionTitle to="about">About</SectionTitle>

            <p class="text-center">
                I'm an aspiring <b>self-taught</b> developer
                <wbr>
                who started programming in 2018-2019.<br>I don't really remember.<br><br>Started with
                <wbr>
                <a href="https://minecraft.net" class="link-underline" target="_blank">⛏️minecraft</a> redstone and
                command
                blocks.<br>Then I learned python from
                <wbr>
                various youtube tutorials &amp; various online courses.<br><br>Since then,
                <wbr>
                I've come a long way and have done a wide variety of projects<br><br><small>Hopefully I'll finish the
                mountain of side projects someday... <small>maybe</small>...</small>
            </p>
        </section>
        <hr/>
        <section class="flex-center" id="skills">
            <SectionTitle to="skills">Skills</SectionTitle>
            <div id="skills-section-layout">
                <div id="skills-txt">
                    <h1>🎓 What I know</h1>
                    <p>These are the&nbsp;<wbr>
                        <span style="color: lightgreen;">📜<b>skills</b></span>,&nbsp;<wbr>
                        <span style="color: orchid;">🔤<b>languages</b></span>&nbsp;&amp;&nbsp;<wbr>
                        <span style="color: peru;">🛠️<b>frameworks</b></span>,<br>
                        <wbr>
                        I've learned over the years. <br><br>The numbers below
                        <wbr>
                        represents my confidence 🔥
                        <wbr>
                        in each of them.
                    </p>
                </div>
                <div id="skills-ctn">
                    <ScrollingColumn v-for="i in 3" :delay="i*300" :speed="AllSkills.length*3000+1000*i*i"
                                     :style="`--index:${i}`" class="scrolling-skills">
                        <ul id="skills-list">
                            <li v-for="i in AllSkills">
                                <SkillCard :image="i.image" :name="i.name" :invert="i.invert" :level="i.level"/>
                            </li>
                            <li v-for="i in AllSkills">
                                <SkillCard :image="i.image" :name="i.name" :invert="i.invert" :level="i.level"/>
                            </li>
                        </ul>
                    </ScrollingColumn>
                </div>
            </div>
        </section>
        <hr/>
        <section id="featured" class="flex-center">
            <SectionTitle to="featured">Featured Projects</SectionTitle>
            <ul id="projects-container">
                <ProjectCard :item="p" v-for="p in featuredProjects"/>
            </ul>
            <RouterLink id="btn-allprojects" to="allprojects">all Projects</RouterLink>

        </section>

    </main>
</template>

<script lang="ts" setup>
import {iRatioObject} from "vyue42";
import HashLink from "@/components/core/HashLink.vue";
import SkillCard from "@/components/others/SkillCard.vue";
import ScrollingColumn from "@/components/utils/ScrollingColumn.vue";
import {AllSkills} from "@/tools/skills";
import ProjectCard from "@/components/others/ProjectCard.vue";
import {featuredProjects} from "@/assets/projects";
import TopSticky from "@/components/core/TopSticky.vue";
import SectionTitle from "@/components/page/SectionTitle.vue";


const bannerIRatio = new iRatioObject({
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
#skills{
    #skills-section-layout {
        display: flex;
        width: 100%;
        padding: 2rem;

        justify-content: center;
        align-items: center;
        gap: 4rem;


        #skills-txts {

        }

        #skills-ctn {
            display: flex;
            justify-content: flex-start;
            min-width: fit-content;
            max-width: 40%;
            gap: 0.5em;
            height: 35rem;

        }

        #skills-list {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
            padding: 0;
            list-style-type: none;
        }

        .scrolling-skills {
            z-index: var(--index);
            background: transparent;
        }

        // Remove 3rd spinning column on smaller devices
        @media only screen and (max-width: 450px) {
            .scrolling-skills:nth-of-type(3) {
                display: none;
            }
        }
    }
}


#featured{
    #projects-container{
        display: flex;
        list-style-type: none;
        justify-content: center;
        flex-wrap: wrap;

        padding: 0;
        gap: 1rem;
    }

    #btn-allprojects{
        border: 2px solid var(--accent);
        border-radius: 0.75rem;
        padding: 0.5rem 1rem;
        margin: 1rem;
        position: sticky;
        bottom: 1rem;
        background-clip: border-box;
        --passive-color: var(--bg-0);
        font-size: 1em;
        &:hover{
            color: white;
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
