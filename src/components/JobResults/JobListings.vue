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

<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages"
import { useJobsStore } from "@/stores/jobs"
import { useDegreesStore } from "@/stores/degrees"
import JobListing from "@/components/JobResults/JobListing.vue"

const route = useRoute()
const jobsStore = useJobsStore()
const degreesStore = useDegreesStore()

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))

const currentPage = computed(() => {
  return Number.parseInt((route.query.page as string) || "1")
})

const { nextPage, previousPage } = usePreviousAndNextPages(currentPage, maxPage)

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10

  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})

onMounted(async () => {
  await jobsStore.FETCH_JOBS()
  await degreesStore.FETCH_DEGREES()
})
</script>
