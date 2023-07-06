import { defineStore } from "pinia"
import getJobs from "@/api/getJobs"
import { useUserStore } from "@/stores/user"
import { Job } from "@/api/types"

export const FETCH_JOBS = "FETCH_JOBS"
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS"
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES"
export const FILTERED_JOBS = "FILTERED_JOBS"

export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION"
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE"

export interface JobState {
  jobs: Job[]
}

export const useJobsStore = defineStore("jobs", {
  state: (): JobState => {
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
      const uniqueOrgnanizations = new Set<string>()
      state.jobs.forEach((job) => {
        uniqueOrgnanizations.add(job.organization)
      })
      return uniqueOrgnanizations
    },

    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set<string>()
      state.jobs.forEach((job) => {
        uniqueJobTypes.add(job.jobType)
      })

      return uniqueJobTypes
    },

    [INCLUDE_JOB_BY_ORGANIZATION]: () => {
      return (job: Job) => {
        const userStore = useUserStore()
        if (userStore.selectedOrganizations.length === 0) {
          return true
        }

        return userStore.selectedOrganizations.includes(job.organization)
      }
    },

    [INCLUDE_JOB_BY_JOB_TYPE]: () => {
      return (job: Job) => {
        const userStore = useUserStore()
        if (userStore.selectedJobTypes.length === 0) {
          return true
        }

        return userStore.selectedJobTypes.includes(job.jobType)
      }
    },

    [FILTERED_JOBS](state): Job[] {
      return state.jobs
        .filter((job) => {
          return this.INCLUDE_JOB_BY_JOB_TYPE(job)
        })
        .filter((job) => {
          return this.INCLUDE_JOB_BY_ORGANIZATION(job)
        })
    }
  }
})
