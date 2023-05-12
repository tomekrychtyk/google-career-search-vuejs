import { render, screen } from "@testing-library/vue"
import MainNav from "@/components/MainNav.vue"

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav, {
      data() {
        return {
          company: "super corp"
        }
      }
    })

    const companyName = screen.getByText(/mkoo careers/i)

    expect(companyName).toBeInTheDocument()
  })
})
