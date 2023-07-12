<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-grey-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear filters"
            type="secondary"
            @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
          />
        </div>
      </div>

      <collapsible-accordion header="Degrees">
        <job-filter-sidebar-degrees />
      </collapsible-accordion>

      <collapsible-accordion header="Job Types">
        <job-filter-sidebar-job-types />
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filter-sidebar-organizations />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue"

import JobFilterSidebarDegrees from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarDegrees.vue"
import JobFilterSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarJobTypes.vue"
import JobFilterSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganizations.vue"

import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
</script>
