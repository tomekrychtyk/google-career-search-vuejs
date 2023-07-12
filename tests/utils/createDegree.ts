import type { Degree } from "@/api/types"

export const createDegree = (degree: Partial<Degree>): Degree => {
  return {
    id: 1,
    degree: "Bachelor",
    ...degree
  }
}
