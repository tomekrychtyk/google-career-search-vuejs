import { render, screen } from "@testing-library/vue"
import SubNav from "@/components/SubNav.vue"

describe("SubNav", () => {
  describe("when user is on Job page", () => {
    it("displays job count", () => {
      render(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        },
        data() {
          return {
            onJobResultsPage: true
          }
        }
      })

      const jobCount = screen.getByText("1653")
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe("when user is not on Job page", () => {
    it("does not display the job count", () => {
      render(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        },
        data() {
          return {
            onJobResultPage: false
          }
        }
      })

      const jobCount = screen.queryByText("1653")
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
