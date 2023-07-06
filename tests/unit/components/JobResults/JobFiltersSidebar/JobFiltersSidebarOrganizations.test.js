import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import { createTestingPinia } from "@pinia/testing"
import { useRouter } from "vue-router"

import JobsFiltersSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganizations.vue"
import { useJobsStore } from "@/stores/jobs"
import { useUserStore } from "@/stores/user"

vi.mock("vue-router")

describe("JobsFiltersSidebarOrganizations", () => {
  const renderJobsFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    const jobsStore = useJobsStore()
    const $router = {
      push: vi.fn()
    }

    render(JobsFiltersSidebarOrganizations, {
      global: {
        mocks: {
          $router
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { userStore, jobsStore, $router }
  }

  it("renders unique list of organizations", async () => {
    const { jobsStore } = renderJobsFiltersSidebarOrganizations()
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Facebook", "Google"])

    const button = screen.getByRole("button", {
      name: /organizations/i
    })
    await userEvent.click(button)

    const organizationListItems = screen.getAllByRole("listitem")
    const organizations = organizationListItems.map((node) => {
      return node.textContent
    })

    expect(organizations).toEqual(["Facebook", "Google"])
  })

  describe("when user clicks checkbox", () => {
    it("communicated that user has selected checkbox for organization", async () => {
      useRouter.mockReturnValue({
        push: vi.fn()
      })
      const { userStore, jobsStore } = renderJobsFiltersSidebarOrganizations()
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Facebook", "Google"])

      const button = screen.getByRole("button", {
        name: /organizations/i
      })
      await userEvent.click(button)

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i
      })

      await userEvent.click(googleCheckbox)

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(["Google"])
    })

    it("navigates users to job results page to see fresh batch of job results", async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })
      const { jobsStore } = renderJobsFiltersSidebarOrganizations()
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google"])

      const button = screen.getByRole("button", {
        name: /organizations/i
      })
      await userEvent.click(button)

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i
      })

      await userEvent.click(googleCheckbox)

      expect(push).toHaveBeenCalledWith({
        name: "JobResults"
      })
    })
  })
})
