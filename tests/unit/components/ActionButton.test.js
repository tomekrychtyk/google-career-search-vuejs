import { render, screen } from "@testing-library/vue"
import ActionButton from "@/components/ActionButton.vue"

describe("action button", () => {
  it("renders text", () => {
    render(ActionButton, {
      props: {
        text: "Click me",
        type: "primary"
      }
    })

    const button = screen.getByRole("button", {
      name: /click me/i
    })
    expect(button).toBeInTheDocument()
  })

  it("applies one of several styles to a button", () => {
    render(ActionButton, {
      props: {
        text: "Click me",
        type: "primary"
      }
    })
    const button = screen.getByRole("button", {
      name: /click me/i
    })
    expect(button).toHaveClass("primary")
  })
})
