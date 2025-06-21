<template>

    <div class="project-item bg-background p-4 pt-3">

        <div class="project-details">
            <h3 class="text-xl font-semibold font-poppins">
                {{ props.data.title }}
                <!-- <Tooltip>
                        <template v-slot:trigger="propsb">
                            <a v-if="props.anchor" :href="hash_s" class="no-deco anchor" @click="anchor_clicked" v-bind="propsb">
                                <Icon icon="ph:link-bold"/>
                            </a>
                        </template>
<template v-slot:content>
                            Copy direct link
                        </template>
</Tooltip> -->

            </h3>
            <sub>
                <template v-if="props.data.start_date || props.data.end_date">
                    <Icon inline icon="mdi:calendar-month" class="search-icon text-lg" />
                    {{ props.data.start_date ? datetimeformat.format(props.data.start_date) : "unknown" }}
                    <Icon inline icon="material-symbols:arrow-range-rounded" class="search-icon text-lg" />
                    {{ props.data.end_date ? datetimeformat.format(props.data.end_date) : "current" }}
                </template>
            </sub>
            <div class="project-details-desc markdown">
                <slot></slot>
            </div>
            <ul class="project-links">
                <li v-if="props.data.source">
                    <GetProjectLink :value="{
                        name: props.data.source.label,
                        url: props.data.source.url,
                        icon: 'humbleicons:code'
                    }" />

                </li>
                <li v-if="props.data.links" v-for="(value, index) in props.data.links" :key="index">
                    <GetProjectLink :value="value" />

                </li>
            </ul>
        </div>

        <div class="project-media w-full min-w-0  overflow-scroll ">
            <template v-if="props.data.media[0] && props.data.media[0].type == 'video'">
                <YoutubeEmbed v-if="isYTUrl(props.data.media[0].url)" :src="props.data.media[0].url" />
                <video v-else controls>
                    <source :src="props.data.media[0].url" />
                </video>
            </template>
            <img v-else-if="props.data.media[0]" :src="props.data.media[0].url" alt="" />
        </div>

        <ul class="project-skills">
            <li v-for="(value, index) in props.data.skills" :key="index" class="font-semibold text-sm">
                {{ value.toLowerCase() }}
            </li>
        </ul>

        <ul class="badges">
            <li v-if="props.data.featured" class="featured-badge badge">
                <Icon icon="mage:stars-a-fill" class="icon text-lg" />
                featured
            </li>
            <li v-if="props.data.status == 'completed'" class="badge">
                <Icon icon="material-symbols:rocket-launch-rounded" class="icon text-lg text-green-400" />
                completed
            </li>
            <li v-else-if="props.data.status == 'in dev'" class="badge">
                <Icon icon="fluent-emoji:construction" class="icon text-lg" />
                In development
            </li>
            <li v-else-if="props.data.status == 'inactive'" class="badge">
                <Icon icon="mingcute:sleep-fill" class="icon text-lg text-purple-400" />
                inactive
            </li>
        </ul>
    </div>


</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { YoutubeEmbed } from "@/components/ui";
import GetProjectLink from "./GetProjectLink.vue";
import type { NormalisedProjectData } from "@/lib/project_utils";
import { isYoutubeUrl as isYTUrl } from "@/lib/external/yt";

const datetimeformat = new Intl.DateTimeFormat('en-sg', { month: 'short', year: "numeric", day: "2-digit" })

interface props {
    data: NormalisedProjectData,
    anchor?: string
}

const props = defineProps<props>()

</script>

<style lang="scss" scoped>
.project-item {
    width: 100%;
    max-height: 32rem;
    min-width: 0;
    overflow: hidden;
    display: grid;
    overflow: hidden;
    grid-template-columns: 5fr 4fr;
    grid-template-rows: minmax(0, 1fr) auto;
    box-sizing: border-box;
    grid-gap: 0.75rem;
    position: relative;
    transition: all 100ms ease;

    .badges {
        display: flex;
        gap: .5rem;
        list-style-type: none;
        position: absolute;
        top: .5rem;
        right: .5rem;
        // z-index: 2;
        overflow: visible;
        // font and color moved to Tailwind
    }

    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr;
    }
}


.project-details {
    grid-column: 1/1;
    grid-row: 1/1;
    display: flex;
    flex-direction: column;
    //gap: 1rem;
    height: 100%;
    overflow: hidden;


    &>sub {
        margin-top: 0.3rem;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.215rem;
        // font-size moved to Tailwind
    }

    &>h3 {
        margin: 0;
        /* font-size moved to Tailwind */
        flex-shrink: 0;
    }

    &>.project-details-desc {
        flex-shrink: 1;
        flex-grow: 1;
        overflow-y: auto;
        padding-bottom: 0.75rem;
    }

    &>.project-links::before {
        content: "";
        background: linear-gradient(to top, var(--bg-0) 0%, transparent 100%);
        position: absolute;
        bottom: 100%;
        height: 1rem;
        width: 100%;
    }

    &>.project-links {
        padding: 0;
        list-style-type: none;
        display: flex;
        margin-top: auto;
        gap: 0.5rem;
        flex-wrap: wrap;
        flex-shrink: 0;
        position: relative;
        overflow: visible;

        &>li {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            gap: 0.2rem;
        }
    }
}

.project-media {
    grid-column: 2/2;
    grid-row: 1/-1;
    width: 100%;
    //background: var(--bg-0-5);
    overflow: hidden;
    border-radius: 0.5rem;
    aspect-ratio: 1/1;
    margin-left: auto;


    @media screen and (max-width: 900px) {
        grid-column: 1/1;
        grid-row: auto;
    }


}

.project-media>img {
    transition: transform 200ms ease;
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.project-media:hover>img {
    transform: scale(1.1);
}

.project-media>video {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.project-skills {
    display: flex;
    gap: 0.5rem;
    grid-column: 1/2;
    grid-row: -1;
    padding: 0;
    height: fit-content;
    // font-weight and font-size moved to Tailwind
}
</style>