<template>
    <main id="all">
        <section class="flex-center">
            <SectionTitle section_id="all" name="Project List">
                All Projects
            </SectionTitle>
            <SearchBar id="searchbar" v-model:search-term="searchTerm"/>

            <ul id="projects-container">
                <li v-for="(p, index) in searchResults" :key="index">
                    <SectionTitle :section_id="`project-${index}`" :name="p.item.title" :heading="2"
                                  class="proj-header">
                        {{ p.item.title }}
                    </SectionTitle>
                    <ProjectCard :item="p.item" :id="`project-${index}`" class="proj-item"/>
                </li>
            </ul>

        </section>

    </main>
</template>

<script lang="ts" setup>
import SectionTitle from "@/components/page/SectionTitle.vue";
import ProjectCard from "@/components/others/ProjectCard.vue";
import SearchBar from "@/components/others/SearchBar.vue";
import {type Ref, ref, watch} from "vue";
import Fuse from "fuse.js";
import {AllProjects} from "@/tools/api";
import type {proj_entry} from "@/assets/projects";

const searchTerm = ref("")

const fuse = new Fuse(AllProjects.value, {
    includeScore: true,
    useExtendedSearch: true,
    shouldSort: true,
    keys: [
        {name: "title", weight: 0.5},
        {name: "desc", weight: 0.2},
        {name: "skillsUsed", weight: 0.3}
    ],
    findAllMatches: true

})

const allProjectsResults: Fuse.FuseResult<proj_entry>[] = AllProjects.value.map((value, index) => {
    return {
        item: value,
        matches: [],
        refIndex: 0,
        score: 0
    }
})
const searchResults: Ref<Fuse.FuseResult<proj_entry>[]> = ref(allProjectsResults)
watch(searchTerm, value => {
    if (value.trim().length > 0) {
        searchResults.value = fuse.search(value)
        return
    }
    searchResults.value=allProjectsResults;
})

</script>

<style lang="scss" scoped>
#searchbar {
    width: 52rem;
}

#projects-container {
    width: fit-content;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.proj-header {
    width: fit-content;
    margin: 0 auto;
    display: none;
}

.proj-item {
    //--width: min(50rem, 80vw);
    //--height: min(30rem, 45vw);

}
</style>
