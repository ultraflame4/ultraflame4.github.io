<template>
    <main id="all">
        <section class="flex-center">
            <SectionTitle section_id="all" name="Project List">
                All Projects
            </SectionTitle>
            <SearchBar id="searchbar" v-model:search-term="searchTerm">
                <template v-slot:other-items>
                    <button class="reset-btn"  @click="filterMenuActive=!filterMenuActive">
                        <Icon icon="material-symbols:filter-alt" class="filter-icon icon" role="button" :data-active="filterMenuActive"/>
                        <ChildPopupMenu v-model:active="filterMenuActive">
                            <div class="filter-menu no-deco">
                                <h1>Skills</h1>
                            </div>
                        </ChildPopupMenu>
                    </button>
                </template>
            </SearchBar>
            <ProjectDataStatusView/>
            <ul v-if="!ProjectDataStatus.loading.value" id="projects-container">
                <li v-for="(p, index) in searchResults" :key="hashCode(p.item)">
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
import ProjectCard from "@/components/content/Projects/ProjectCard.vue";
import SearchBar from "@/components/content/SearchBar.vue";
import {onMounted, type Ref, ref, watch} from "vue";
import Fuse from "fuse.js";
import {AllProjects, ProjectDataStatus} from "@/tools/projects_api";
import type {NormalisedProjectData, oldFormat} from "@/assets/projects";
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue";
import ProjectDataStatusView from "@/components/utils/ProjectDataStatusView.vue";
import {hashCode} from "@/utils";

import {normalise_oldFormat} from "@/assets/projects_utils";
import {useRoute} from "vue-router";
import ChildPopupMenu from "@/components/core/ChildPopupMenu.vue";
import {Icon} from "@iconify/vue";

const route = useRoute()
const searchTerm = ref(route.query.q as string ?? "")
const filterMenuActive = ref(false)

let allProjectsResults: Fuse.FuseResult<NormalisedProjectData>[] = []
const fuse = new Fuse<NormalisedProjectData>([], {
    includeScore: true,
    useExtendedSearch: true,
    shouldSort: true,
    keys: [
        {name: "title", weight: 0.5},
        {name: "body", weight: 0.2},
        {name: "skills", weight: 0.3}
    ],
    findAllMatches: true

})

refreshProjectList(AllProjects.value)

function refreshProjectList(project_list: NormalisedProjectData[]) {
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

const searchResults: Ref<Fuse.FuseResult<NormalisedProjectData>[]> = ref(allProjectsResults)

watch(AllProjects, value => refreshProjectList(value))

onMounted(() => {
    processSearch(searchTerm.value)
})

watch([searchTerm, AllProjects], ([search_term, _]) => {
    processSearch(search_term)
})

function processSearch(search_term: string){

    if (search_term.trim().length > 0) {
        searchResults.value = fuse.search(search_term)
        return
    }
    searchResults.value = allProjectsResults;
}

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

.filter-icon{
    cursor: pointer;

    &:focus-within, &:active, &[data-active="true"] {
        color: var(--accent);
    }
}

.filter-menu{
    &>h1{
        //letter-spacing: 0.1px;
        font-size: 0.95rem;
        margin: 0;
    }
}
</style>
