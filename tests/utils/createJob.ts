import { Job } from "@/api/types"

const createJob = (job: Partial<Job> = {}): Job => {
  return {
    id: 1,
    title: "Angular Developer",
    organization: "Vue and Me",
    degree: "Master's",
    jobType: "Intern",
    locations: ["Lisbon"],
    minimumQualifications: ["Embrace sticky infrastructures"],
    preferredQualifications: ["Envisioneer b2b web services"],
    description: ["Away someone forget effect wait land."],
    dateAdded: "2021-07-04",
    ...job
  }
}

export default createJob
