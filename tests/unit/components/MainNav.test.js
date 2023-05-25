import { render, screen } from "@testing-library/vue"
import { RouterLinkStub } from "@vue/test-utils"
import userEvent from "@testing-library/user-event"
import MainNav from "@/components/Navigation/MainNav.vue"

const renderMainNav = () => {
  const $route = {
    name: "Home"
  }

  render(MainNav, {
    global: {
      stubs: {
        FontAwesomeIcon: true,
        RouterLink: RouterLinkStub
      }
    },
    mocks: {
      $route
    }
  })
}

describe("MainNav", () => {
  it("displays company name", () => {
    renderMainNav()
    const companyName = screen.getByText(/mkoo careers/i)
    expect(companyName).toBeInTheDocument()
  })

  it("displays menu items for navigation", () => {
    renderMainNav()
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

    it("displays user profile picture", async () => {
      renderMainNav()

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole("button", {
        name: /sign in/i
      })
      expect(loginButton).toBeInTheDocument()

      await userEvent.click(loginButton)
      profileImage = screen.getByRole("img", {
        name: /user profile image/i
      })
      expect(profileImage).toBeInTheDocument()
      expect(loginButton).not.toBeInTheDocument()
    })
  })
})
