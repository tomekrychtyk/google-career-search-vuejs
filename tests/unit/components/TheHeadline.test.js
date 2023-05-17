import { nextTick } from "vue"
import { render, screen } from "@testing-library/vue"
import TheHeadline from "@/components/TheHeadline.vue"

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("displays introductory action verb", () => {
    render(TheHeadline)

    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i
    })
    expect(actionPhrase).toBeInTheDocument()
  })

  it("changes action verb at a consistent interval", () => {
    const mock = vi.fn()
    vi.stubGlobal("setInterval", mock)

    render(TheHeadline)
    expect(mock).toHaveBeenCalled()
  })

  it("swaps actions verb after interval", async () => {
    render(TheHeadline)
    vi.advanceTimersToNextTimer()

    await nextTick()
    const actionPhrase = screen.getByRole("heading", {
      name: /create for everyone/i
    })
    expect(actionPhrase).toBeInTheDocument()
  })

  it("removes interval when component disappears", () => {
    const mock = vi.fn()
    vi.stubGlobal("clearInterval", mock)

    const { unmount } = render(TheHeadline)
    unmount()
    expect(mock).toHaveBeenCalled()
  })
})
