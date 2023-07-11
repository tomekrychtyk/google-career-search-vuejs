import { render, screen } from "@testing-library/vue"
import { RouterLinkStub } from "@vue/test-utils"

import JobListing from "@/components/JobResults/JobListing.vue"
import { Job } from "@/api/types"
import createJob from "../../../utils/createJob"

describe("JobListing", () => {
  const createJob = (jobProps = {}) => {
    return {
      title: "Vue Developer",
      organization: "Airbnb",
      locations: ["New York", "Miami"],
      minimumQualifications: ["PHP", "React"],
      ...jobProps
    }
  }

  const renderJobListing = (jobProps: Job) => {
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
    const jobProps = createJob({ title: "Vue Dev" })
    renderJobListing(jobProps as Job)

    const title = screen.getByText(/Vue Dev/i)
    expect(title).toBeInTheDocument()
  })

  it("renders job organization", () => {
    const jobProps = createJob({ organization: "Samsung" })
    renderJobListing(jobProps as Job)

    const title = screen.getByText(/Samsung/i)
    expect(title).toBeInTheDocument()
  })

  it("renders job location", () => {
    const jobProps = createJob({ locations: ["Cracow", "Warsaw"] })
    renderJobListing(jobProps as Job)

    expect(screen.getByText(/Cracow/i)).toBeInTheDocument()
    expect(screen.getByText(/Warsaw/i)).toBeInTheDocument()
  })

  it("renders job qualifications", () => {
    const jobProps = createJob({ minimumQualifications: ["Vue", "Code"] })
    renderJobListing(jobProps as Job)

    expect(screen.getByText("Vue")).toBeInTheDocument()
    expect(screen.getByText("Code")).toBeInTheDocument()
  })
})
