import { Mock } from "vitest"
import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import { RouterLinkStub } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import { useRoute } from "vue-router"

import MainNav from "@/components/Navigation/MainNav.vue"
import { useUserStore } from "@/stores/user"

vi.mock("vue-router")

describe("MainNav", () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia()

    ;(useRoute as Mock).mockReturnValue({
      name: "Home"
    })

    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  it("displays company name", () => {
    renderMainNav()
    const companyName = screen.getByText("Mkoo Careers")
    expect(companyName).toBeInTheDocument()
  })

  it("displays menu items for navigation", () => {
    renderMainNav()
    const navigationMenuItems = screen.getAllByRole("listitem")
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent)
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Mkoo Corp",
      "How we hire?",
      "Students",
      "Jobs"
    ])
  })

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav()
      const userStore = useUserStore()

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole("button", {
        name: /sign in/i
      })
      userStore.isLoggedIn = true
      await userEvent.click(loginButton)

      profileImage = screen.getByRole("img", {
        name: /user profile image/i
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
