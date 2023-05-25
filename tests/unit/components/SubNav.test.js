import { render, screen } from "@testing-library/vue"
import SubNav from "@/components/Navigation/SubNav.vue"

describe("SubNav", () => {
  describe("when user is on Job page", () => {
    it("displays job count", () => {
      const $route = {
        name: "JobResults"
      }

      render(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          },
          mocks: {
            $route
          }
        }
      })

      const jobCount = screen.getByText("1653")
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe("when user is not on Job page", () => {
    it("does not display the job count", () => {
      const $route = {
        name: "Home"
      }

      render(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          },
          mocks: {
            $route
          }
        }
      })

      const jobCount = screen.queryByText("1653")
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
