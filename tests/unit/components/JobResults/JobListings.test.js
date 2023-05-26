import { render, screen } from "@testing-library/vue"
import { RouterLinkStub } from "@vue/test-utils"
import axios from "axios"

import JobListings from "@/components/JobResults/JobListings.vue"

vi.mock("axios")

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
    render(JobListings, {
      global: {
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
    axios.get.mockResolvedValue({ data: [] })
    renderJobListings(createRoute())
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs")
  })

  it("maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) })
    renderJobListings(createRoute({ query: { page: "5" } }))
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
})
