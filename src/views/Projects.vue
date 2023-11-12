<template>
    <main id="all">
        <section class="flex-center">
            <SectionTitle section_id="all" name="Project List">
                All Projects
            </SectionTitle>
            <SearchBar id="searchbar" v-model:search-term="searchTerm"/>
            <ProjectDataStatusView/>
            <ul v-if="!ProjectDataStatus.loading.value" id="projects-container">
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
import ProjectCard from "@/components/content/ProjectCard.vue";
import SearchBar from "@/components/content/SearchBar.vue";
import {type Ref, ref, watch} from "vue";
import Fuse from "fuse.js";
import {AllProjects, ProjectDataStatus} from "@/tools/projects_api";
import type {proj_entry} from "@/assets/projects";
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue";
import ProjectDataStatusView from "@/components/utils/ProjectDataStatusView.vue";

const searchTerm = ref("")

let allProjectsResults: Fuse.FuseResult<proj_entry>[] = []
const fuse = new Fuse<proj_entry>([], {
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

refreshProjectList(AllProjects.value)

function refreshProjectList(project_list: proj_entry[]) {
    allProjectsResults = project_list.map((value, index) => {
        return {
            item: value,
            matches: [],
            refIndex: 0,
            score: 0
        }
    })
    fuse.setCollection(project_list)
}

const searchResults: Ref<Fuse.FuseResult<proj_entry>[]> = ref(allProjectsResults)

watch(AllProjects, value => refreshProjectList(value))

watch([searchTerm, AllProjects], ([search_term, _]) => {

    if (search_term.trim().length > 0) {
        searchResults.value = fuse.search(search_term)
        return
    }
    searchResults.value = allProjectsResults;
})

</script>

<style lang="scss" scoped>
#searchbar {
    width: min(50rem, 90vw);
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
    --width: min(55rem, 90vw);
    //--height: min(30rem, 100vw);

}
</style>
