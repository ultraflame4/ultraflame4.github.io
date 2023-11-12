<template>
    <li class="project-item">
        <div class="project-details">
            <h3>{{ props.item.title }}</h3>
            <MarkdownView class="project-details-desc" v-if="props.item.desc!==undefined" :content="props.item.desc" :remove_link="true"/>
            <ul class="project-links">
                <li v-if="props.item.source">
                    <GetProjectLink :value="{
                        name: props.item.sourceLabel ?? 'Source',
                        url: props.item.source,
                        icon: 'humbleicons:code'
                    }"/>

                </li>
<!--                <template v-for="i in 10">-->
                <li v-if="props.item.links" v-for="(value,key,index) in props.item.links" :key="index">
                    <GetProjectLink :value="value"/>

                </li>
<!--                </template>-->
            </ul>
        </div>

        <div class="project-image">
            <video v-if="props.item.bannerImgIsVideo && props.item.bannerSrc" controls>
                <source :src="props.item.bannerSrc"/>
            </video>

            <img v-else-if="props.item.bannerSrc" :src="props.item.bannerSrc" alt=""/>
        </div>

        <ul class="project-skills">
            <li v-for="(value,index) in props.item.skillsUsed" :key="index">
                {{ value.toLowerCase() }}
            </li>

        </ul>
    </li>
</template>

<script lang="ts" setup>
import type {proj_entry} from "@/assets/projects";
import {Icon} from "@iconify/vue";
import MarkdownView from "@/components/utils/MarkdownView.vue";
import GetProjectLink from "@/components/content/Projects/GetProjectLink.vue";

const props = defineProps<{ item: proj_entry }>()

</script>

<style lang="scss" scoped>

.project-item {
    --move-dist: 0.4rem;
    --allow-space: 0.5rem;
    --width: min(40rem, 80vw);
    --height: 24rem;

    width: var(--width);
    height: var(--height);
    display: grid;
    grid-template-columns: 5fr 4fr;
    grid-template-rows: minmax(0,1fr) auto;
    box-sizing: border-box;
    grid-gap: 1rem;
    overflow: hidden;

    max-height: 100%;
    max-width: 100%;
    border: 2px solid var(--bg-2);

    border-radius: 1rem;
    padding: 1rem 1rem 0.65rem;
    margin: var(--allow-space);

    &:hover, &:focus-within {
        margin-left: calc(var(--allow-space) - var(--move-dist) + 0.01px); // 0.01px is a weirdly specific value that stops the other cards from jiggling/moving when hovered
        margin-top: calc(var(--allow-space) - var(--move-dist) - 1px);
        width: calc(var(--width) + var(--move-dist));
        height: calc(var(--height) + var(--move-dist));

        border-width: var(--move-dist);
        border-left-width: 1px;
        border-top-width: 1px;

        border-style: solid;
        border-color: var(--accent);
    }

}

.project-details-desc::v-deep(p), .project-details-desc::v-deep(li){
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.2px;
    font-family: "Open sans";
}
.project-details {
    grid-column: 1/1;
    grid-row: 1/1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    overflow: hidden;

    & > h3 {
        margin: 0;
        font-size: 1.35rem;
        flex-shrink: 0;
    }
    .project-details-desc{
        flex-shrink: 1;
        flex-grow: 1;
        overflow-y: scroll;
    }

    & > .project-links {
        padding: 0;
        list-style-type: none;
        display: flex;
        margin-top: auto;
        gap: 1rem;
        flex-wrap: wrap;

        &>li{
            flex-shrink: 0;
            display: flex;
            align-items: center;
            gap: 0.2rem;


        }



    }
}

.project-image {
    grid-column: 2/2;
    grid-row: 1/-1;
    height: 100%;
    overflow: hidden;
    border-radius: 0.5rem;
    aspect-ratio: 1/1;
    margin-left: auto;
}

.project-image > img {
    transition: transform 200ms ease;
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.project-image:hover > img {
    transform: scale(1.1);
}

.project-image > video {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.project-skills {
    display: flex;
    gap: 0.5rem;
    grid-column: 1/2;
    grid-row: 2;
    padding: 0;
    height: fit-content;

    & > li {
        font-weight: 600;
        font-family: "Poppins";
        font-size: 0.8em;
    }
}


</style>
