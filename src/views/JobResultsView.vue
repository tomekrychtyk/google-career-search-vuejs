<template>
  <div class="flex-no-wrap flex w-full flex-row">
    <JobFiltersSidebar />
    <JobListings />
  </div>
</template>

<script lang="ts" setup>
import JobFiltersSidebar from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebar.vue"
import JobListings from "@/components/JobResults/JobListings.vue"
</script>
