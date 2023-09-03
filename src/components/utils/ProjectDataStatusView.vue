<template>
    <div class="flex-center">
        <div v-if="ProjectDataStatus.loading.value" class="loading-ctn">
            <p>Fetching project data</p>
            <LoadingSpinner/>
        </div>
        <noscript>
            <p class="text-danger text-center">
                Javascript is disabled
                <br/>
                It is needed to fetch the latest project data & load the fallback data
            </p>
        </noscript>
        <p v-if="ProjectDataStatus.isfallback" class="text-warn text-center">
            Blocked? Outage? Offline? Who knows?
            <br/>
            Unable to fetch latest project data! Using (Outdated) fallback data!
            <br/>
            Server Unreachable
        </p>
    </div>
</template>
<script setup lang="ts">

import {ProjectDataStatus} from "@/tools/projects_api";
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue";


</script>
<style scoped lang="scss">

.loading-ctn {
    margin: 2rem 0 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & > p {
        margin: 1rem 0;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-family: Montserrat, serif;
        font-weight: 700;
        color: var(--bg-3);
    }
}

</style>