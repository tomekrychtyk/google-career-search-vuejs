import type { Mock } from "vitest"
import axios from "axios"

import getDegrees from "@/api/getDegrees"

vi.mock("axios")

describe("getDegrees", () => {
  beforeEach(() => {
    ;(axios.get as Mock).mockResolvedValue({
      data: [{ id: 1, degree: "Masters" }]
    })
  })

  it("fetches degree that candidates can apply to", async () => {
    await getDegrees()
    expect(axios.get as Mock).toHaveBeenCalledWith("http://myfakeapi.com/degrees")
  })

  it("extracts degrees from response", async () => {
    const jobs = await getDegrees()
    expect(jobs).toEqual([{ id: 1, degree: "Masters" }])
  })
})
