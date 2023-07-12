<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-grey-1 bg-white p-4">
    <section class="pb-5">
      <job-filter-sidebar-prompt />

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
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue"
import JobFilterSidebarDegrees from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarDegrees.vue"
import JobFilterSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarJobTypes.vue"
import JobFilterSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganizations.vue"
import JobFilterSidebarPrompt from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarPrompt.vue"
</script>
