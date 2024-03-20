<template>
    <li class="project-item-ctn">
        <div class="project-item">
            <ul class="badges">
                <li v-if="props.item.featured" class="featured-badge">
                    <Icon icon="mage:stars-a-fill" class="icon"/>
                    featured
                </li>
                <li v-if="props.item.status=='completed'">
                    <Icon icon="material-symbols:rocket-launch-rounded" class="icon" style="color: #8ec97d"/>
                    completed
                </li>
                <li v-else-if="props.item.status=='in dev'" >
                    <Icon icon="fluent-emoji:construction" class="icon"/>
                    In development
                </li>
                <li v-else-if="props.item.status=='inactive'" >
                    <Icon icon="mingcute:sleep-fill" class="icon" style="color: #9174c9"/>
                    inactive
                </li>
            </ul>
            <div class="project-details">
                <h3>{{ props.item.title }}
                    <a v-if="props.anchor" :href="'#'+props.anchor" class="no-deco anchor">
                        <Icon icon="ph:link-bold"/>
                    </a>
                </h3>
                <sub>
                    <template v-if="props.item.start_date||props.item.end_date">
                        <Icon inline icon="mdi:calendar-month" class="search-icon"/>
                        {{ props.item.start_date ? datetimeformat.format(props.item.start_date) : "unknown" }}
                        <Icon inline icon="material-symbols:arrow-range-rounded" class="search-icon"/>
                        {{ props.item.end_date ? datetimeformat.format(props.item.end_date) : "current" }}
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
        </div>

    </li>
</template>

<script lang="ts" setup>
import MarkdownView from "@/components/utils/MarkdownView.vue";
import GetProjectLink from "@/components/content/Projects/GetProjectLink.vue";
import YoutubeEmbed from "@/components/content/YoutubeEmbed.vue";
import {isYoutubeUrl} from "@/external/yt";
import type {NormalisedProjectData} from "@/assets/projects";
import {Icon} from "@iconify/vue";

const datetimeformat = new Intl.DateTimeFormat('en-sg', {month: 'short', year: "numeric", day: "2-digit"})

const isYTUrl = isYoutubeUrl;

interface props {
    item: NormalisedProjectData,
    anchor?: string
}

const props = defineProps<props>()

</script>

<style lang="scss" scoped>
.anchor {
    opacity: 0;
    color: var(--accent);
    transition: all 100ms ease !important;
    font-size: 1.5rem;
    position: relative;
    top: 0.2rem;

    &:hover {
        color: var(--accent);
    }

    &:active {
        color: white;
    }
}

.project-item-ctn {
    --move-dist-x: 1rem;
    --move-dist-y: 1.25rem;
    --allow-space: 0.65rem;
    --width: min(60rem, 90vw);
    --height: 30rem;
    width: var(--width);
    height: var(--height);

    overflow: visible;
    margin: var(--allow-space);

    &:hover, &:focus-within {
        .anchor {
            opacity: 1;
        }

        .project-item {
            right: calc(var(--move-dist-x) / 2);
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
}

.project-item {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 5fr 4fr;
    grid-template-rows: minmax(0, 1fr) auto;
    box-sizing: border-box;
    grid-gap: 1rem;
    border: 2px solid var(--bg-2);
    position: relative;
    right: 0;
    bottom: 0;
    border-radius: 1rem;
    padding: 0.65rem 1rem;
    transition: all 100ms ease;
    position: relative;


    .badges {
        display: flex;
        gap: .5rem;
        list-style-type: none;
        position: absolute;
        top: .5rem;
        right: .5rem;
        z-index: 2;
        overflow: visible;

        & > li .icon {

            font-size: 1.25em;
            margin-right: 0.2rem;

        }


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
        margin-top: 0.3rem;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.215rem;

        .search-icon {
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
    //background: var(--bg-0-5);
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
