<template>
    <section id="foot" class="flex-center section-bg">
        <SectionTitle section_id="foot" no_heading>The End</SectionTitle>
        <Tooltip>
            <template v-slot:trigger="x">
                <pre class="cool-text" @click="cat_link()" :style="{'--angryness': catAngryMeter}" v-bind="x"><TrueMonospaced :text="logo_txt"/></pre>
            </template>
            <template v-slot:content>
                Click to poke him! See him turn <span style="color:red">RED</span>!
            </template>
        </Tooltip>
        <small><i>The above is a random logo i made on a random day.</i></small>
        <br/>
        <p>
            That's it, that is the end. Here are some other pages for you to check out:
        </p>
        <div id="foot-directory">
            <h1>This Page</h1>
            <ul>
                <li v-for="link in PageNavTree.links.value">
                    <NavLink :hash="router.resolve(link.to).hash" align>{{ link.name }}</NavLink>
                </li>
            </ul>
            <h1>index</h1>
            <ul>
                <li v-for="link in router.options.routes">
                    <NavLink :to="link.path" align>{{ link.name }}</NavLink>
                </li>
            </ul>
            <h1>Others</h1>
            <ul>
                <li>
                    <NavLink to="https://ultraflame4.github.io/SiteVersionPicker" align>Version Picker</NavLink>
                </li>
            </ul>
            <h1>Socials</h1>
            <SocialLinks class="social" />

        </div>


    </section>
    <div class="section-bg-end" style="--height: 2.5rem;"></div>
    <br />

    <br />

    <!-- <div id="socials-float"><SocialLinks/></div> -->
    <footer>
        <code>Site Version {{app_version}}</code>
        <small>© Copyright 2023, ultraflame4.github.io All rights reserved.</small>
    </footer>
    <br />
</template>
<script setup lang="ts">

import {PageNavTree} from "@/router/page_navtree";
import SocialLinks from "@/components/content/SocialLinks.vue";
import NavLink from "@/components/core/NavLink.vue";
import SectionTitle from "@/components/page/SectionTitle.vue";
import TrueMonospaced from "@/components/utils/TrueMonospaced.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import logo_txt from "@/assets/logo.txt?raw"
import Tooltip from "../core/Tooltip.vue";

const router = useRouter()

const catAngryMeter = ref(0)
//@ts-ignore
const app_version = __APP_VERSION__


function cat_link() {
    if (catAngryMeter.value >= 1) {
        window.location.assign("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        return
    }
    catAngryMeter.value += 0.2
    

}


</script>


<style scoped lang="scss">

footer {
    height: fit-content;
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 1rem;
    width: 100vw;
    overflow-x: hidden;

}
.social{
    height: fit-content;
}

#socials-float{
    position: sticky;
    //display: flex;
    width: fit-content;
    margin-left: auto;
    bottom: 0;

}

#foot-directory {
    display: grid;
    grid-template-rows: min-content min-content;

    font-size: 0.75rem;
    grid-column-gap: 6rem;
    justify-content: center;



    h1 {
        text-transform: uppercase;
        font-weight: 800;
        font-size: .95rem;
        letter-spacing: 0.1rem;
        grid-row: 1;
        margin: 0;
    }

    ul {
        grid-row: 2;
        padding: 0;
        margin: 0;

    }
}

.cool-text{
    font-family: monospace;
    color: color-mix(in srgb, #f00 calc(var(--angryness) * 100%), var(--txt-p));
    transition: all 200ms ease;
    
}

.cool-text:active {
    position: relative;
    color: var(--accent);
    cursor: not-allowed;
    &:before {
        content: "";
        position: absolute;
        top: 25%;
        left: 25%;
        background: var(--accent);
        color: white;
        font-size: 2rem;
        font-weight: 900;
    }

}
</style>
