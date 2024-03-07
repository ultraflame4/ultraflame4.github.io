<template>
    <main id="all">
        <section class="flex-center">
            <SectionTitle section_id="all" name="Project List">
                All Projects
            </SectionTitle>
            <SearchBar id="searchbar" v-model:search-term="searchTerm">
                <template v-slot:other-items v-if="isDev">
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
            <TabBar :items="tabs" v-model:value="active_tab"/>
            <p v-if="active_tab.toLowerCase()=='featured'">
                The bests of my works
            </p>
            <p v-else-if="active_tab.toLowerCase()=='all'" style="text-align: center">
                The entire list of my projects* <br/> <i>(more can be found on my <a href="https://github.com/ultraflame4?tab=repositories">github</a>)</i>
            </p>
            <p v-else-if="active_tab.toLowerCase()=='completed'" style="text-align: center">
                Projects that I consider to be completed & released.
            </p>
            <p v-else-if="active_tab.toLowerCase()=='in dev'" style="text-align: center">
                Projects that in active development or likely to have major changes in the future.
            </p>
            <p v-else-if="active_tab.toLowerCase()=='inactive'" style="text-align: center">
                Incomplete projects that have been put on hold due to various reasons including but not limited to<br/>
                1. lack of time, 2. loss of interest & motivation, 3. technical difficulties
            </p>
            <ProjectDataStatusView/>
            <ul v-if="!ProjectDataStatus.loading.value" id="projects-container">
                <li v-for="(p, index) in project_list" :key="hashCode(p.item, true)">
                    <SectionTitle :section_id="`project-${index}`"
                                  :key="`project-${index}`"
                                  :name="p.item.title"
                                  :heading="2"
                                  class="proj-header"
                    >
                        {{ p.item.title }}
                    </SectionTitle>
                    <ProjectCard :item="p.item" :id="`project-${index}`" class="proj-item" :anchor="`project-${index}`" />
                </li>
            </ul>

        </section>

    </main>
</template>

<script lang="ts" setup>
import SectionTitle from "@/components/page/SectionTitle.vue";
import ProjectCard from "@/components/content/Projects/ProjectCard.vue";
import SearchBar from "@/components/content/SearchBar.vue";
import {computed, ref, watch} from "vue";
import Fuse from "fuse.js";
import {AllProjects, ProjectDataStatus} from "@/tools/projects_api";
import type {NormalisedProjectData, oldFormat} from "@/assets/projects";
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue";
import ProjectDataStatusView from "@/components/utils/ProjectDataStatusView.vue";
import {hashCode} from "@/utils";

import {useRoute, useRouter} from "vue-router";
import ChildPopupMenu from "@/components/core/ChildPopupMenu.vue";
import {Icon} from "@iconify/vue";
import TabBar, {type TabItem} from "@/components/core/TabBar.vue";

const isDev = import.meta.env.DEV
const route = useRoute()
const router = useRouter()
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


const searchTerm = ref(route.query.q as string ?? "")
const filterMenuActive = ref(false)
const active_tab = ref(route.query.t as string ?? "All")
const tabs: TabItem[] = [
    {
        icon: "bi:stars",
        text: "Featured"
    },
    {
        icon: "ic:outline-format-list-bulleted",
        text: "All"
    },
    {
        icon: "material-symbols:rocket-launch-rounded",
        text: "Completed"
    },
    {
        icon: "fluent-emoji-high-contrast:building-construction",
        text: "In dev"
    },
    {
        icon: "mingcute:sleep-line",
        text: "Inactive"
    }
]

const projects_as_results = computed<Fuse.FuseResult<NormalisedProjectData>[]>(()=>AllProjects.value.map((value) => {
    return {
        item: value,
        matches: [],
        refIndex: 0,
        score: 0
    }
}))
const project_list = computed<Fuse.FuseResult<NormalisedProjectData>[]>(() => {
    fuse.setCollection(AllProjects.value)
    let results = searchTerm.value.trim().length > 0?fuse.search(searchTerm.value):projects_as_results.value
    results = results.filter(x=>{
        let a =x.item.status.toLowerCase();
        let b =active_tab.value.toLowerCase();
        if (b=="featured") return x.item.featured
        return a==b || b == "all"
    })
    return results
})


watch([searchTerm, active_tab], ([search_term, t]) => {
    router.push({
        replace: true,
        query: {
            t: t,
            q: search_term == "" ? undefined : search_term
        }
    })
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
    --width: min(56rem, 90vw);
    --height: min(28rem, 50vw);

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
