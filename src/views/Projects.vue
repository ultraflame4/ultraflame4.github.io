<template>
<main id="all">
    <section class="flex-center">
        <SectionTitle section_id="all" name="Project List">
            All Projects
        </SectionTitle>
<!--        TODO ADD SEARCH BAR -->
    </section>
    <section class="flex-center">

        <ul id="projects-container">
            <li v-for="(p, index) in allProjects" :key="index">
                <SectionTitle :section_id="`project-${index}`" :name="p.title" heading="2" class="proj-header">
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
</script>

<style lang="scss" scoped>
#projects-container{
    width: fit-content;
    padding: 0;
}
.proj-header{
    width: fit-content;
    margin: 0 auto;
}

.proj-item{
    --width: min(50rem, 80vw);
    --height: min(30rem, 45vw);

}
</style>
