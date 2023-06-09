import { render, screen } from "@testing-library/vue"
import { RouterLinkStub } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import { useRoute } from "vue-router"
import { Mock } from "vitest"

import JobListings from "@/components/JobResults/JobListings.vue"
import { useJobsStore } from "@/stores/jobs"
import { useDegreesStore } from "@/stores/degrees"

vi.mock("vue-router")

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const degreesStore = useDegreesStore()
    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    return { jobsStore, degreesStore }
  }

  it("fetches jobs", () => {
    ;(useRoute as Mock).mockReturnValue({ query: {} })
    const { jobsStore } = renderJobListings()
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  // it("fetches degrees", () => {
  //   ;(useRoute as Mock).mockReturnValue({ query: {} })
  //   const { degreesStore } = renderJobListings()
  //   expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled()
  // })

  it("displays maximum of 10 jobs", async () => {
    ;(useRoute as Mock).mockReturnValue({ query: { page: "1" } })
    renderJobListings()

    const jobListings = await screen.findAllByRole("listitem")
    expect(jobListings).toHaveLength(10)
  })

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      ;(useRoute as Mock).mockReturnValue({ query: {} })
      renderJobListings()

      expect(screen.getByText("Page 1")).toBeInTheDocument()
    })
  })

  describe("when params include page number", () => {
    it("displays page number", () => {
      ;(useRoute as Mock).mockReturnValue({ query: { page: "3" } })
      renderJobListings()

      expect(screen.getByText("Page 3")).toBeInTheDocument()
    })
  })

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      ;(useRoute as Mock).mockReturnValue({ query: { page: "1" } })
      renderJobListings()

      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole("listitem")
      const link = screen.queryByRole("link", {
        name: "Previous"
      })
      expect(link).not.toBeInTheDocument()
    })

    it("shows link to next page", async () => {
      ;(useRoute as Mock).mockReturnValue({ query: { page: "1" } })
      renderJobListings()

      await screen.findAllByRole("listitem")
      const link = screen.queryByRole("link", {
        name: "Next"
      })

      expect(link).toBeInTheDocument()
    })
  })

  describe("when user is on last page", () => {
    it("shows link to the previous page", async () => {
      ;(useRoute as Mock).mockReturnValue({ query: { page: "2" } })
      renderJobListings()

      await screen.findAllByRole("listitem")
      const link = screen.queryByRole("link", {
        name: "Previous"
      })
      expect(link).toBeInTheDocument()
    })

    it("does not show link to next page", async () => {
      ;(useRoute as Mock).mockReturnValue({ query: { page: "2" } })
      renderJobListings()

      await screen.findAllByRole("listitem")
      const link = screen.queryByRole("link", {
        name: "Next"
      })
      expect(link).not.toBeInTheDocument()
    })
  })
})
