<template>
    <div id="home-banner" v-iratio="bannerIRatio">
        <video autoplay muted loop preload="auto" class="iratio-parallax fadein" style="filter: brightness(50%)">
            <source src="/moon.webm">
        </video>
        <div id="banner-content" class="fadein">
            <h1><span id="handwave">👋</span> Hello ! &nbsp;</h1>
            <h2>I'm Chester</h2>
            <p>Welcome to my little corner of the internet!</p>
            <br/>
            <p>Look around</p>
        </div>
    </div>
    <main>
        <section class="flex-center" id="about">
            <SectionTitle section_id="about">About</SectionTitle>

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
            <SectionTitle section_id="skills">Skills</SectionTitle>
            <div id="skills-section-layout">
                <div id="skills-txt">
                    <h1>What I know 📖</h1>
                    <p>These are some of the&nbsp;<wbr>
                        🛠️<b>skills</b>,&nbsp;<wbr>
                        📜<b>languages</b>&nbsp;&amp;&nbsp;<wbr>
                        🪜<b>frameworks</b>,<br>
                        <wbr>
                        I've picked up over the years.
                    </p>
                </div>
                <div id="skills-ctn">
                    <ScrollingColumn v-for="i in 3" :speed="AllSkills.length*700+1000*i" :offset="i*1.5"
                                     class="scrolling-skills">
                        <ul id="skills-list">
                            <li v-for="i in repeatArray(shuffleArray(AllSkills), 2)">
                                <SkillCard :image="i.image" :name="i.name" :invert="i.invert" :level="i.level"/>
                            </li>
                        </ul>
                    </ScrollingColumn>
                </div>
            </div>
        </section>
        <hr/>
        <section id="featured" class="flex-center">
            <SectionTitle section_id="featured">Featured Projects</SectionTitle>
            <ul id="projects-container">
                <ProjectCard :item="p" v-for="p in FeaturedProjects"/>
            </ul>
            <RouterLink id="btn-allprojects" to="projects">all Projects</RouterLink>

        </section>

    </main>
</template>

<script lang="ts" setup>
import {iRatioObject} from "vyue42";
import SkillCard from "@/components/others/SkillCard.vue";
import ScrollingColumn from "@/components/utils/ScrollingColumn.vue";
import {AllSkills} from "@/tools/skills";
import ProjectCard from "@/components/others/ProjectCard.vue";
import SectionTitle from "@/components/page/SectionTitle.vue";
import {FeaturedProjects} from "@/tools/api";

const bannerIRatio = new iRatioObject({
    exit: false,
    invert: false
})

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray<T>(array_: T[]): T[] {
    let array = [...array_]
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function repeatArray<T>(array: T[], count: number): T[] {
    let a: T[] = []
    for (let i = 0; i < count; i++) {
        a = a.concat(array);
    }

    return a
}

</script>

<style lang="scss" scoped>
#home-banner {

    position: relative;
    height: 100vh;
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

#skills {

    #skills-section-layout {
        display: flex;
        width: 100%;
        padding: 2rem;

        justify-content: center;
        align-items: center;
        gap: 4rem;


        #skills-txt {
            h1{
                margin-left: 0;
                margin-right: 0;
            }
            p{
                margin-left: 0;
            }
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


#featured {
    #projects-container {
        display: flex;
        list-style-type: none;
        justify-content: center;
        flex-wrap: wrap;

        padding: 0;
        gap: 1rem;
    }

    #btn-allprojects {
        border: 2px solid var(--accent);
        border-radius: 0.75rem;
        padding: 0.5rem 1rem;
        margin: 1rem;
        position: sticky;
        bottom: 1rem;
        background-clip: border-box;
        --passive-color: var(--bg-0);
        font-size: 1em;

        &:hover {
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
