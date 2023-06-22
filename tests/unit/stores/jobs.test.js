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

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected organizations", () => {
      it("includes job", () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const store = useJobsStore()
        const job = {
          organization: "Google"
        }

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

        expect(result).toBe(true)
      })
    })

    it("identifies if job is associated with given organization", () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ["Google", "Microsoft"]
      const store = useJobsStore()
      const job = {
        organization: "Google"
      }

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

      expect(result).toBe(true)
    })
  })

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected job types", () => {
      it("includes job", () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []
        const store = useJobsStore()
        const job = {
          jobType: "Google"
        }

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

        expect(result).toBe(true)
      })
    })

    it("identifies if job is associated with given job type", () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ["Full time"]
      const store = useJobsStore()
      const job = {
        jobType: "Full time"
      }

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

      expect(result).toBe(true)
    })
  })
})
