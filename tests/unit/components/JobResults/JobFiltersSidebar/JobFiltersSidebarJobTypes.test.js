import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import { createTestingPinia } from "@pinia/testing"
import { useRouter } from "vue-router"

import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarJobTypes.vue"
import { useJobsStore } from "@/stores/jobs"
import { useUserStore } from "@/stores/user"

vi.mock("vue-router")

describe("JobsFiltersSidebarJobTypes", () => {
  const renderJobsFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    const jobsStore = useJobsStore()

    render(JobFiltersSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { userStore, jobsStore }
  }

  it("renders unique list of job types from jobs", async () => {
    const { jobsStore } = renderJobsFiltersSidebarJobTypes()
    jobsStore.UNIQUE_JOB_TYPES = new Set(["Full time", "Part time"])

    const button = screen.getByRole("button", {
      name: /job types/i
    })
    await userEvent.click(button)

    const jobTypesListItems = screen.getAllByRole("listitem")
    const jobTypes = jobTypesListItems.map((node) => {
      return node.textContent
    })

    expect(jobTypes).toEqual(["Full time", "Part time"])
  })

  describe("when user clicks checkbox", () => {
    it("communicated that user has selected checkbox for job type", async () => {
      useRouter.mockReturnValue({
        push: vi.fn()
      })
      const { userStore, jobsStore } = renderJobsFiltersSidebarJobTypes()
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Full time", "Part time"])

      const button = screen.getByRole("button", {
        name: /job types/i
      })
      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full time/i
      })

      await userEvent.click(fullTimeCheckbox)

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith(["Full time"])
    })

    it("navigates user to JobResults page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })
      const { jobsStore } = renderJobsFiltersSidebarJobTypes()
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Full time"])

      const button = screen.getByRole("button", {
        name: /job types/i
      })
      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full time/i
      })

      await userEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({
        name: "JobResults"
      })
    })
  })
})
