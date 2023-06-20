<template>
<main id="all">
    <section class="flex-center">
        <SectionTitle section_id="all" name="Project List">
            All Projects
        </SectionTitle>
        <SearchBar id="searchbar"/>

        <ul id="projects-container">
            <li v-for="(p, index) in allProjects" :key="index">
                <SectionTitle :section_id="`project-${index}`" :name="p.title" :heading="2" class="proj-header">
                    {{p.title}}
                </SectionTitle>
                <ProjectCard :item="p" :id="`project-${index}`" class="proj-item"/>
            </li>
        </ul>

    </section>

</main>
</template>

<script lang="ts" setup>
import SectionTitle from "@/components/page/SectionTitle.vue";
import {allProjects} from "@/assets/projects";
import ProjectCard from "@/components/others/ProjectCard.vue";
import SearchBar from "@/components/others/SearchBar.vue";
</script>

<style lang="scss" scoped>
#searchbar{
    width: 52rem;
}
#projects-container{
    width: fit-content;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
.proj-header{
    width: fit-content;
    margin: 0 auto;
    display: none;
}

.proj-item{
    //--width: min(50rem, 80vw);
    //--height: min(30rem, 45vw);

}
</style>
