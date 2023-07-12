import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import { createTestingPinia } from "@pinia/testing"
import { useRouter } from "vue-router"
import { Mock } from "vitest"

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarCheckboxGroup.vue"

vi.mock("vue-router")

describe("JobFiltersSidebarCheckboxGroup", () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    header: string
    uniqueValues: Set<string>
    action: Mock
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => {
    return {
      header: "Some header",
      uniqueValues: new Set(["ValueA", "ValueB"]),
      action: vi.fn(),
      ...props
    }
  }

  const renderJobsFiltersSidebarCheckboxGroup = (props: JobFiltersSidebarCheckboxGroupProps) => {
    const pinia = createTestingPinia()

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it("renders unique list of values", async () => {
    renderJobsFiltersSidebarCheckboxGroup(
      createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full time", "Part time"])
      })
    )

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
    it.only("communicates that user has selected checkbox for value", async () => {
      ;(useRouter as Mock).mockReturnValue({
        push: vi.fn()
      })
      const action = vi.fn()
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full time", "Part time"]),
        action
      })
      renderJobsFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole("button", {
        name: /job types/i
      })
      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full time/i
      })

      await userEvent.click(fullTimeCheckbox)

      expect(action).toHaveBeenCalledWith(["Full time"])
    })

    it("navigates user to JobResults page to see fresh batch of filtered jobs", async () => {
      const push = vi
        .fn()(useRouter as Mock)
        .mockReturnValue({ push })
      const props = createProps({
        header: "Job types",
        uniqueValues: new Set(["Full time"])
      })

      renderJobsFiltersSidebarCheckboxGroup(props)

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
