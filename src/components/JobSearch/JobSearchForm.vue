<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-grey-3"
    @submit.prevent="searchForJobs"
  >
    <FontAwesomeIcon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label class="absolute -top-10 left-0" for="role">Role</label>
        <TextInput id="role" v-model="role" placeholder="Software engineer" />
      </div>
      <span
        class="flex h-full items-center border-l border-r border-brand-grey-3 bg-brand-grey-2 px-3"
      >
        in
      </span>
      <div class="relative flex h-full flex-1 items-center pl-3 pr-1">
        <label class="absolute -top-10 left-0" for="location">Where?</label>
        <TextInput id="location" v-model="location" placeholder="Los Angeles" />
      </div>
    </div>
    <ActionButton type="secondary" text="Search" class="rounded-r-3xl" />
  </form>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue"
import TextInput from "@/components/Shared/TextInput.vue"

export default {
  name: "JobSearchForm",
  components: {
    ActionButton,
    TextInput
  },
  data() {
    return {
      role: "",
      location: ""
    }
  },
  methods: {
    searchForJobs() {
      this.$router.push({
        name: "JobResults",
        query: {
          role: this.role,
          location: this.location
        }
      })
    }
  }
}
</script>
