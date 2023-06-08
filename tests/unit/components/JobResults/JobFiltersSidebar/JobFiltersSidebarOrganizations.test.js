import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import { createTestingPinia } from "@pinia/testing"

import JobsFiltersSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganizations.vue"
import { useJobsStore } from "@/stores/jobs"
import { useUserStore } from "@/stores/user"

describe("JobsFiltersSidebarOrganizations", () => {
  const renderJobsFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    const jobsStore = useJobsStore()

    render(JobsFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { userStore, jobsStore }
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

  it("communicated that user has selected checkbox for organization", async () => {
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
})
