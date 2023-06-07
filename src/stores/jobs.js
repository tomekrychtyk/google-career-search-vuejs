import { defineStore } from "pinia"
import getJobs from "@/api/getJobs"

export const FETCH_JOBS = "FETCH_JOBS"
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS"

export const useJobsStore = defineStore("jobs", {
  state: () => {
    return {
      jobs: []
    }
  },

  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs()
      this.jobs = jobs
    }
  },

  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrgnanizations = new Set()
      state.jobs.forEach((job) => {
        uniqueOrgnanizations.add(job.organization)
      })
      return uniqueOrgnanizations
    }
  }
})
