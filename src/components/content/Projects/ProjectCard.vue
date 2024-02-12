<template>
    <li class="project-item">
        <div class="project-details">
            <h3>{{ props.item.title }}</h3>
            <sub>
                <template v-if="props.item.start_date||props.item.end_date">
                    <Icon inline icon="mdi:calendar-month" class="icon"/>
                    {{ props.item.start_date ? datetimeformat.format(props.item.start_date) : "unknown" }}
                    <Icon inline icon="material-symbols:arrow-range-rounded" class="icon"/>
                    {{ props.item.end_date ?datetimeformat.format(props.item.end_date) : "current" }}
                </template>
            </sub>

            <MarkdownView class="project-details-desc" :content="props.item.body" :remove_link="true"/>
            <ul class="project-links">
                <li v-if="props.item.source">
                    <GetProjectLink :value="{
                        name: props.item.source.label,
                        url: props.item.source.url,
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
            <template v-if="props.item.media[0] && props.item.media[0].type == 'video'">
                <YoutubeEmbed v-if="isYTUrl(props.item.media[0].url)" :src="props.item.media[0].url"/>
                <video v-else controls>
                    <source :src="props.item.media[0].url"/>
                </video>
            </template>
            <img v-else-if="props.item.media[0]" :src="props.item.media[0].url" alt=""/>
        </div>

        <ul class="project-skills">
            <li v-for="(value,index) in props.item.skills" :key="index">
                {{ value.toLowerCase() }}
            </li>

        </ul>
    </li>
</template>

<script lang="ts" setup>
import MarkdownView from "@/components/utils/MarkdownView.vue";
import GetProjectLink from "@/components/content/Projects/GetProjectLink.vue";
import YoutubeEmbed from "@/components/content/YoutubeEmbed.vue";
import {isYoutubeUrl} from "@/external/yt";
import type {NormalisedProjectData} from "@/assets/projects";
import {Icon} from "@iconify/vue";

const datetimeformat= new Intl.DateTimeFormat('en-sg', {month:'short', year: "numeric", day: "2-digit"})

const isYTUrl = isYoutubeUrl;

const props = defineProps<{ item: NormalisedProjectData }>()

</script>

<style lang="scss" scoped>

.project-item {
    --move-dist-x: 0.8rem;
    --move-dist-y: 0.9rem;
    --allow-space: 0.6rem;
    --width: min(40rem, 80vw);
    --height: 24rem;

    width: var(--width);
    height: var(--height);
    display: grid;
    grid-template-columns: 5fr 4fr;
    grid-template-rows: minmax(0, 1fr) auto;
    box-sizing: border-box;
    grid-gap: 1rem;
    overflow: hidden;

    max-height: 100%;
    max-width: 100%;
    border: 2px solid var(--bg-2);
    position: relative;
    right: 0;
    bottom: 0;
    border-radius: 1rem;
    padding: 1rem 1rem 0.65rem;
    margin: var(--allow-space) ;
    transition: all 100ms ease;

    &:hover, &:focus-within {

        right:  calc(var(--move-dist-x) / 2);
        bottom: calc(var(--move-dist-y) / 2);

        //width: calc(var(--width) + var(--move-dist));
        //height: calc(var(--height) + var(--move-dist));

        //border-width: var(--move-dist);
        box-shadow: var(--move-dist-x) var(--move-dist-y) color-mix(in oklab, var(--accent) 40%, var(--bg-0));
        //
        border-style: solid;
        border-color: var(--accent);


    }

}

.project-details-desc::v-deep(p), .project-details-desc::v-deep(li) {
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
    //gap: 1rem;
    height: 100%;
    overflow: hidden;


    & > sub {
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.215rem;

        .icon {
            font-size: 1.3em;
        }
    }

    & > h3 {
        margin: 0;
        font-size: 1.35rem;
        flex-shrink: 0;
    }

    .project-details-desc {
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

        & > li {
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
    width: 100%;
    background: black;
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
