import { render, screen } from "@testing-library/vue"
import { createTestingPinia } from "@pinia/testing"
import SubNav from "@/components/Navigation/SubNav.vue"
import { useJobsStore } from "@/stores/jobs"

describe("SubNav", () => {
  const renderSubNav = (routeName) => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    render(SubNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName
          }
        },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { jobsStore }
  }

  describe("when user is on Job page", () => {
    it("displays job count", async () => {
      const { jobsStore } = renderSubNav("JobResults")
      const numberOfJobs = 16
      jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({})

      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe("when user is not on Job page", () => {
    it("does not display the job count", () => {
      const { jobsStore } = renderSubNav("Home")
      const numberOfJobs = 16
      jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({})

      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
