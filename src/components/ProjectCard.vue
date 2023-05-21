<template>
    <li class="project-item">
        <div class="project-details">
            <h3>{{ props.item.title }}</h3>
            <p>
                {{ props.item.desc}}
            </p>
            <ul class="project-links">
                <li v-if="props.item.source">
                    <a :href="props.item.source" target="_blank">
                        <Icon icon="humbleicons:code" class="icon"/>
                        {{ props.item.sourceLabel ?? "Source" }}
                    </a>
                </li>
                <li v-if="props.item.links" v-for="(value,key,index) in props.item.links" :key="index">

                    <a :href="value.url" :style="{
                        '--color': value.fillColor ?? 'var(--accent-color)',
                        '--fill-text-color': value.filledTextColor ?? 'white'
                    }"
                       target="_blank"
                       data-filled={value.filled}>
                        <Icon :icon="value.icon ?? 'eva:external-link-fill'" class="icon"/>
                        {{ value.name }}
                    </a>
                </li>

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

const props = defineProps<{ item: proj_entry }>()

</script>

<style lang="scss" scoped>
.project-item {
    width: min(40rem, 80vw);
    height: 24rem;
    display: grid;
    grid-template-columns: 5fr 4fr;
    grid-template-rows: auto min-content;
    box-sizing: border-box;
    grid-gap: 1rem;

    max-height: 100%;
    max-width: 100%;
    border: 2px dashed var(--accent);
    border-radius: 1rem;
    padding: 1rem 1rem 0.65rem;

}

.project-details {
    grid-column: 1/1;
    grid-row: 1/1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > h3 {
        margin: 0;
        font-size: 1.35rem;
    }

    & > p {
        margin: 0;
        font-size: 0.9em;
        font-weight: 400;
        letter-spacing: 0.2px;
        font-family: "Open sans";
        white-space: pre-wrap;
    }

    & > .project-links {
        padding: 0;
        list-style-type: none;
        display: flex;
        margin-top: auto;
        gap: 1rem;
    }
}

.project-image {
    grid-column: 2/2;
    grid-row: 1/1;
    width: 100%;
    overflow: hidden;
    border-radius: 0.5rem;
    aspect-ratio: 1/1;
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
