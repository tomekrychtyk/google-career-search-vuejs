import { createPinia, setActivePinia } from "pinia"
import axios from "axios"

import { useJobsStore, FETCH_JOBS } from "@/stores/jobs"

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
        {
          organization: "Google"
        },
        {
          organization: "Google"
        },
        {
          organization: "Facebook"
        },
        {
          organization: "Amazon"
        },
        {
          organization: "Facebook"
        }
      ]

      const result = store.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(["Google", "Facebook", "Amazon"]))
    })
  })
})
