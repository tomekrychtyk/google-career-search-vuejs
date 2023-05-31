import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue"

describe("CollapsibleAccordion", () => {
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        header: "My Category"
      },
      slots: {
        default: "<h3>My nested child</h3>"
      },
      ...config
    })
  }

  it("renders child content", async () => {
    renderCollapsibleAccordion({
      props: {
        header: "My category"
      },
      slots: {
        default: "<h3>My nested child</h3>"
      }
    })

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument()
    const button = screen.getByRole("button", {
      name: /my category/i
    })
    await userEvent.click(button)
    expect(screen.queryByText("My nested child")).toBeInTheDocument()
  })

  describe("when parent does not provide custom child content", () => {
    it("renders child content", async () => {
      renderCollapsibleAccordion({
        props: {
          header: "My category"
        },
        slots: {}
      })

      const button = screen.getByRole("button", {
        name: /my category/i
      })
      await userEvent.click(button)

      expect(screen.getByText("Whoops, somebody forgot to populate me")).toBeInTheDocument()
    })
  })
})
