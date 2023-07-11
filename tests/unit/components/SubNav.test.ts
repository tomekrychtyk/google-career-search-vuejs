import { Mock } from "vitest"
import { render, screen } from "@testing-library/vue"
import { createTestingPinia } from "@pinia/testing"
import { useRoute } from "vue-router"
import SubNav from "@/components/Navigation/SubNav.vue"
import { useJobsStore } from "@/stores/jobs"

vi.mock("vue-router")

describe("SubNav", () => {
  const renderSubNav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { jobsStore }
  }

  describe("when user is on Job page", () => {
    it("displays job count", async () => {
      ;(useRoute as Mock).mockReturnValue({
        name: "JobResults"
      })

      const { jobsStore } = renderSubNav()
      const numberOfJobs = 16
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe("when user is not on Job page", () => {
    it("does not display the job count", () => {
      ;(useRoute as Mock).mockReturnValue({
        name: "Home"
      })

      const { jobsStore } = renderSubNav()
      const numberOfJobs = 16
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
