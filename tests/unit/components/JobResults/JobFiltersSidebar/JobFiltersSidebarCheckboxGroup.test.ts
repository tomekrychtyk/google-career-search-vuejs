import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import { createTestingPinia } from "@pinia/testing"
import { useRouter } from "vue-router"
import { Mock } from "vitest"

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarCheckboxGroup.vue"
import { useUserStore } from "@/stores/user"

vi.mock("vue-router")

describe("JobFiltersSidebarCheckboxGroup", () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>
    action: Mock
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => {
    return {
      uniqueValues: new Set(["ValueA", "ValueB"]),
      action: vi.fn(),
      ...props
    }
  }

  const renderJobsFiltersSidebarCheckboxGroup = (props: JobFiltersSidebarCheckboxGroupProps) => {
    const pinia = createTestingPinia({
      stubActions: false
    })
    const userStore = useUserStore()

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia]
      }
    })

    return { userStore }
  }

  it("renders unique list of values", () => {
    renderJobsFiltersSidebarCheckboxGroup(
      createProps({
        uniqueValues: new Set(["Full time", "Part time"])
      })
    )

    const jobTypesListItems = screen.getAllByRole("listitem")
    const jobTypes = jobTypesListItems.map((node) => {
      return node.textContent
    })

    expect(jobTypes).toEqual(["Full time", "Part time"])
  })

  describe("when user clicks checkbox", () => {
    it.only("communicates that user has selected checkbox for value", async () => {
      ;(useRouter as Mock).mockReturnValue({
        push: vi.fn()
      })
      const action = vi.fn()
      const props = createProps({
        uniqueValues: new Set(["Full time", "Part time"]),
        action
      })
      renderJobsFiltersSidebarCheckboxGroup(props)

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full time/i
      })

      await userEvent.click(fullTimeCheckbox)

      expect(action).toHaveBeenCalledWith(["Full time"])
    })

    it("navigates user to JobResults page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn()
      ;(useRouter as Mock).mockReturnValue({ push })
      const props = createProps({
        uniqueValues: new Set(["Full time"])
      })

      renderJobsFiltersSidebarCheckboxGroup(props)

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full time/i
      })

      await userEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({
        name: "JobResults"
      })
    })
  })

  describe("when user clears job filters", () => {
    it("unchecks all checkboxes", async () => {
      ;(useRouter as Mock).mockReturnValue({
        push: vi.fn()
      })
      const props = createProps({
        uniqueValues: new Set(["Full time"])
      })
      const { userStore } = renderJobsFiltersSidebarCheckboxGroup(props)

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>("checkbox", {
        name: /full time/i
      })
      await userEvent.click(fullTimeCheckboxBeforeAction)

      expect(fullTimeCheckboxBeforeAction.checked).toBe(true)

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS()

      const fullTimeCheckboxAfterAction = await screen.findByRole<HTMLInputElement>("checkbox", {
        name: /full time/i
      })

      expect(fullTimeCheckboxAfterAction.checked).toBe(false)
    })
  })
})
