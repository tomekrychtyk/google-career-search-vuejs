import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import { useRouter } from "vue-router"

import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue"

vi.mock("vue-router")

describe("JobSearch", () => {
  describe("when user submits the form ", () => {
    it("directs user job results page with users search params", async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({
        push
      })

      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })

      const roleInput = screen.getByRole("textbox", {
        name: /role/i
      })
      await userEvent.type(roleInput, "Vue Developer")

      const locationInput = screen.getByRole("textbox", {
        name: /where/i
      })
      await userEvent.type(locationInput, "Cracow")

      const submitButton = screen.getByRole("button", {
        name: /search/i
      })
      await userEvent.click(submitButton)

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Vue Developer",
          location: "Cracow"
        }
      })
    })
  })
})
