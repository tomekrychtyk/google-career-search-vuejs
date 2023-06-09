import { Mock } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import axios from "axios"

import { useJobsStore, FETCH_JOBS } from "@/stores/jobs"
import { useUserStore } from "@/stores/user"
import { Job } from "@/api/types"
import createJob from "../../utils/createJob"

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
      ;(axios.get as Mock).mockResolvedValue({ data: ["job1", "job2"] })

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
      store.jobs = ["Google", "Google", "Facebook", "Amazon", "Facebook"].map((title) =>
        createJob({ organization: title })
      )

      const result = store.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(["Google", "Facebook", "Amazon"]))
    })
  })

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of all jobs", () => {
      const store = useJobsStore()
      store.jobs = ["Part time", "Part time", "Fulltime", "Fulltime", "Contract"].map((type) =>
        createJob({ jobType: type })
      )

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
        } as Job

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
      } as Job

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
        } as Job

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

        expect(result).toBe(true)
      })
    })

    it("identifies if job is associated with given job type", () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ["Full time"]
      const store = useJobsStore()
      const job = createJob({ degree: "Masters" })

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

      expect(result).toBe(true)
    })
  })

  describe("INCLUDE_JOB_BY_DEGREE", () => {
    describe("when the user has not selected any degrees", () => {
      it("includes job", () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = []
        const store = useJobsStore()
        const job = createJob()

        const result = store.INCLUDE_JOB_BY_DEGREE(job)

        expect(result).toBe(true)
      })
    })

    it("identifies if job is associated with given degrees", () => {
      const userStore = useUserStore()
      userStore.selectedDegrees = ["Masters"]
      const store = useJobsStore()
      const job = createJob({ degree: "Masters" })

      const result = store.INCLUDE_JOB_BY_DEGREE(job)

      expect(result).toBe(true)
    })
  })
})
