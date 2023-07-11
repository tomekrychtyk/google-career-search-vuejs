import { Mock } from "vitest"
import { render, screen } from "@testing-library/vue"
import axios from "axios"

import SpotLight from "@/components/JobSearch/SpotLight.vue"

vi.mock("axios")

describe("SpotLight", () => {
  const mockSpotlightsResponse = (spotlight = {}) => {
    ;(axios.get as Mock).mockResolvedValue({
      data: [
        {
          img: "image.jpg",
          title: "Some title",
          description: "Some description",
          id: 1,
          ...spotlight
        }
      ]
    })
  }

  it("provides image to parent component", async () => {
    mockSpotlightsResponse({ img: "other-image.jpg" })

    render(SpotLight, {
      slots: {
        default: `
          <template #default="slotProps">
            <h1>{{slotProps.img}}</h1>
          </template>
        `
      }
    })

    const text = await screen.findByText("other-image.jpg")
    expect(text).toBeInTheDocument()
  })

  it("provides title to parent component", async () => {
    mockSpotlightsResponse({ title: "Other title" })

    render(SpotLight, {
      slots: {
        default: `
          <template #default="slotProps">
            <h1>{{slotProps.title}}</h1>
          </template>
        `
      }
    })

    const text = await screen.findByText("Other title")
    expect(text).toBeInTheDocument()
  })

  it("provides description to parent component", async () => {
    mockSpotlightsResponse({ description: "Other description" })

    render(SpotLight, {
      slots: {
        default: `
          <template #default="slotProps">
            <h1>{{slotProps.description}}</h1>
          </template>
        `
      }
    })

    const text = await screen.findByText("Other description")
    expect(text).toBeInTheDocument()
  })
})
