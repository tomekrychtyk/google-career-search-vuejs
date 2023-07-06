<template>
  <collapsible-accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="jobType in UNIQUE_JOB_TYPES" :key="jobType" class="h-8 w-1/2">
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobType"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useJobsStore } from "@/stores/jobs"
import { useUserStore } from "@/stores/user"
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue"

const router = useRouter()

const selectedJobTypes = ref([])
const jobsStore = useJobsStore()
const userStore = useUserStore()
const UNIQUE_JOB_TYPES = computed(() => {
  return jobsStore.UNIQUE_JOB_TYPES
})
const selectJobType = () => {
  userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value)
  router.push({
    name: "JobResults"
  })
}
</script>
