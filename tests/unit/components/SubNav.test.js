import { render, screen } from "@testing-library/vue"
import SubNav from "@/components/Navigation/SubNav.vue"

describe("SubNav", () => {
  const renderSubNav = (routeName) => {
    render(SubNav, {
      global: {
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
  }

  describe("when user is on Job page", () => {
    it("displays job count", () => {
      renderSubNav("JobResults")

      const jobCount = screen.getByText("1653")
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe("when user is not on Job page", () => {
    it("does not display the job count", () => {
      renderSubNav("Home")

      const jobCount = screen.queryByText("1653")
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
