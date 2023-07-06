<template>
  <main class="bg-brand-gray-2 flex-auto p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"

import { useJobsStore } from "@/stores/jobs"
import JobListing from "@/components/JobResults/JobListing.vue"

const route = useRoute()
const jobsStore = useJobsStore()

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)

const currentPage = computed(() => {
  return Number.parseInt(route.query.page || 1)
})

const previousPage = computed(() => {
  const previousPage = currentPage.value - 1
  const firstPage = 1

  return previousPage >= firstPage ? previousPage : undefined
})

const nextPage = computed(() => {
  const nextPage = currentPage.value + 1
  const lastPage = Math.ceil(FILTERED_JOBS.value.length / 10)

  return nextPage <= lastPage ? nextPage : undefined
})

const displayedJobs = computed(() => {
  const pageNumber = currentPage
  const firstJobIndex = (pageNumber.value - 1) * 10
  const lastJobIndex = pageNumber.value * 10

  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})

onMounted(async () => {
  await jobsStore.FETCH_JOBS()
})
</script>
