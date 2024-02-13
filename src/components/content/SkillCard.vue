<template>
    <div class="skill-card" @click="searchProjects">
        <img v-if="props.invert" :src="props.image"
             :alt="props.name" :title="props.name" style="filter: invert();">
        <img v-else :src="props.image" :alt="props.name"
             :title="props.name">
        <h3>{{ props.name }}</h3>
        <p style="font-weight: 700; font-size: 0.9em; color: rgb(120, 194, 10);">
            <span>{{ props.level.toFixed(2) }}</span></p>
    </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

interface props {
    name: string,
    id: string,
    image: string,
    invert?: boolean
    level: number
}

const props = defineProps<props>()
const router = useRouter()

function searchProjects() {
    router.push({
        path: "projects",
        query: {
            q: `="${props.id}"`
        }
    })
}
</script>

<style lang="scss" scoped>
.skill-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25em;
    padding: 1em 1em 0.5em;
    border: 0.2em solid var(--accent);
    border-radius: 0.75em;
    aspect-ratio: 6/9;
    height: 9.5em;
    box-sizing: border-box;
    transition: all 200ms;
    filter: saturate(5%) brightness(90%);
    cursor: pointer;

    &:hover {
        filter: saturate(100%) brightness(120%);
    }


    & > p, h5 {
        margin: 0;

    }

    p {
        //margin-top: auto;
    }

    h3 {
        margin: auto 0 0.1em;

        text-transform: lowercase;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.75em;
        letter-spacing: -0.5px;
        font-weight: 400;
    }

    img {

    }
}
</style>
