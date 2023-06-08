import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import { createTestingPinia } from "@pinia/testing"

import JobsFiltersSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganizations.vue"
import { useJobsStore } from "@/stores/jobs"

describe("JobsFiltersSidebarOrganizations", () => {
  it("renders unique list of organizations", async () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Facebook", "Google"])

    render(JobsFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

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
})
