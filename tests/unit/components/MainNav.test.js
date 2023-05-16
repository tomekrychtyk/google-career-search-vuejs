import { render, screen } from "@testing-library/vue"
import MainNav from "@/components/MainNav.vue"

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav)

    const companyName = screen.getByText(/mkoo careers/i)

    expect(companyName).toBeInTheDocument()
  })

  it("displays menu items for navigation", () => {
    render(MainNav)
    const navigationMenuItems = screen.getAllByRole("listitem")
    const navigationMenuTexts = navigationMenuItems.map((item) => {
      return item.textContent
    })

    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Mkoo Corp",
      "How we hire?",
      "Students",
      "Jobs"
    ])
  })
})
