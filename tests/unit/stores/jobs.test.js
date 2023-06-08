import { createPinia, setActivePinia } from "pinia"
import axios from "axios"

import { useJobsStore, FETCH_JOBS } from "@/stores/jobs"
import { useUserStore } from "@/stores/user"

vi.mock("axios")

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("stores jobs listings", () => {
    const store = useJobsStore()

    expect(store.jobs).toEqual([])
  })
})

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axios.get.mockResolvedValue({ data: ["job1", "job2"] })

      const store = useJobsStore()
      await store[FETCH_JOBS]()

      expect(store.jobs).toEqual(["job1", "job2"])
    })
  })
})

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const store = useJobsStore()
      store.jobs = [
        { organization: "Google" },
        { organization: "Google" },
        { organization: "Facebook" },
        { organization: "Amazon" },
        { organization: "Facebook" }
      ]

      const result = store.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(["Google", "Facebook", "Amazon"]))
    })
  })

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of all jobs", () => {
      const store = useJobsStore()
      store.jobs = [
        { jobType: "Part time" },
        { jobType: "Part time" },
        { jobType: "Fulltime" },
        { jobType: "Fulltime" },
        { jobType: "Contract" }
      ]

      const result = store.UNIQUE_JOB_TYPES
      expect(result).toEqual(new Set(["Part time", "Fulltime", "Contract"]))
    })
  })

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that are filtered by given organizations", () => {
      const jobsStore = useJobsStore()
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Facebook" },
        { organization: "Amazon" }
      ]

      const userStore = useUserStore()
      userStore.selectedOrganizations = ["Google", "Amazon"]

      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS

      expect(result).toEqual([{ organization: "Google" }, { organization: "Amazon" }])
    })

    describe("when user has not selected any organization", () => {
      it("should return all jobs", () => {
        const jobsStore = useJobsStore()
        jobsStore.jobs = [
          { organization: "Google" },
          { organization: "Facebook" },
          { organization: "Amazon" }
        ]

        const userStore = useUserStore()
        userStore.selectedOrganizations = []

        const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS

        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Facebook" },
          { organization: "Amazon" }
        ])
      })
    })
  })

  describe("FILTERED_JOBS_BY_JOB_TYPE", () => {
    it("identifies jobs that are filtered by given job type", () => {
      const jobsStore = useJobsStore()
      jobsStore.jobs = [{ jobType: "Fulltime" }, { jobType: "Part time" }, { jobType: "Contract" }]

      const userStore = useUserStore()
      userStore.selectedJobTypes = ["Fulltime", "Part time"]

      const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPE
      expect(result).toEqual([{ jobType: "Fulltime" }, { jobType: "Part time" }])
    })

    it("returns all jobs when user has not selected any job types", () => {
      const jobsStore = useJobsStore()
      jobsStore.jobs = [{ jobType: "Fulltime" }, { jobType: "Part time" }, { jobType: "Contract" }]

      const userStore = useUserStore()
      userStore.selectedJobTypes = []

      const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPE
      expect(result).toEqual([
        { jobType: "Fulltime" },
        { jobType: "Part time" },
        { jobType: "Contract" }
      ])
    })
  })
})
