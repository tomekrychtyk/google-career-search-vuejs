import { render, screen } from "@testing-library/vue"
import { RouterLinkStub } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

import JobListings from "@/components/JobResults/JobListings.vue"
import { useJobsStore } from "@/stores/jobs"

describe("JobListings", () => {
  const createRoute = (queryParams) => {
    return {
      query: {
        page: "1",
        ...queryParams
      }
    }
  }

  const renderJobListings = ($route) => {
    const pinia = createTestingPinia()

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub
        },
        mocks: {
          $route
        }
      }
    })
  }

  it("fetches jobs", () => {
    const $route = createRoute()
    renderJobListings($route)

    const jobsStore = useJobsStore()
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it("displays maximum of 10 jobs", async () => {
    const $route = createRoute({ query: { page: "5" } })
    renderJobListings($route)

    const jobsStore = useJobsStore()
    jobsStore.jobs = Array(15).fill({})

    const jobListings = await screen.findAllByRole("listitem")
    expect(jobListings).toHaveLength(10)
  })

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      expect(screen.getByText("Page 1")).toBeInTheDocument()
    })
  })

  describe("when params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "3" }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      expect(screen.getByText("Page 3")).toBeInTheDocument()
    })
  })

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      const queryParams = { page: "1" }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole("listitem")
      const link = screen.queryByRole("link", {
        name: "Previous"
      })
      expect(link).not.toBeInTheDocument()
    })

    it("shows link to next page", async () => {
      const queryParams = { page: "1" }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole("listitem")
      const link = screen.queryByRole("link", {
        name: "Next"
      })

      expect(link).toBeInTheDocument()
    })
  })

  describe("when user is on last page", () => {
    it("shows link to the previous page", async () => {
      const queryParams = { page: "2" }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole("listitem")
      const link = screen.queryByRole("link", {
        name: "Previous"
      })
      expect(link).toBeInTheDocument()
    })

    it("does not show link to next page", async () => {
      const queryParams = { page: "2" }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole("listitem")
      const link = screen.queryByRole("link", {
        name: "Next"
      })
      expect(link).not.toBeInTheDocument()
    })
  })
})
