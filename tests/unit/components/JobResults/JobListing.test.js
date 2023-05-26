import { render, screen } from "@testing-library/vue"
import { RouterLinkStub } from "@vue/test-utils"

import JobListing from "@/components/JobResults/JobListing.vue"

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => {
    return {
      title: "Vue Developer",
      organization: "Airbnb",
      locations: ["New York", "Miami"],
      minimumQualifications: ["PHP", "React"],
      ...jobProps
    }
  }

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub
        }
      },
      props: {
        job: {
          ...jobProps
        }
      }
    })
  }

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Vue Dev" })
    renderJobListing(jobProps)

    const title = screen.getByText(/Vue Dev/i)
    expect(title).toBeInTheDocument()
  })

  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "Samsung" })
    renderJobListing(jobProps)

    const title = screen.getByText(/Samsung/i)
    expect(title).toBeInTheDocument()
  })

  it("renders job location", () => {
    const jobProps = createJobProps({ locations: ["Cracow", "Warsaw"] })
    renderJobListing(jobProps)

    expect(screen.getByText(/Cracow/i)).toBeInTheDocument()
    expect(screen.getByText(/Warsaw/i)).toBeInTheDocument()
  })

  it("renders job qualifications", () => {
    const jobProps = createJobProps({ minimumQualifications: ["Vue", "Code"] })
    renderJobListing(jobProps)

    expect(screen.getByText("Vue")).toBeInTheDocument()
    expect(screen.getByText("Code")).toBeInTheDocument()
  })
})
