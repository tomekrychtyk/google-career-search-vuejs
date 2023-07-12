import { createPinia, setActivePinia } from "pinia"

import { useUserStore } from "@/stores/user"

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test("keeps track that use is logged in", () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })

  test("keeps track of the selected organizations", () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
  })

  test("keeps track of the selected job types", () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })

  test("keeps track of the selected degrees", () => {
    const store = useUserStore()
    expect(store.selectedDegrees).toEqual([])
  })
})

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("loginUser", () => {
    test("logs user in", () => {
      const store = useUserStore()
      store.loginUser()

      expect(store.isLoggedIn).toBe(true)
    })
  })

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    test("updates organizations the user have chosen to filter to jobs by", () => {
      const store = useUserStore()
      store.ADD_SELECTED_ORGANIZATIONS(["Org 1", "Org 2"])

      expect(store.selectedOrganizations).toEqual(["Org 1", "Org 2"])
    })
  })

  describe("ADD_SELECTED_JOB_TYPES", () => {
    test("updated selectedJobTypes the user have chosen to filter by", () => {
      const store = useUserStore()
      store.ADD_SELECTED_JOB_TYPES(["Fulltime", "Part time"])

      expect(store.selectedJobTypes).toEqual(["Fulltime", "Part time"])
    })
  })

  describe("ADD_SELECTED_DEGREES", () => {
    test("updates degrees that user have chosen to filter jobs by", () => {
      const store = useUserStore()
      store.ADD_SELECTED_DEGREES(["Bachelor", "Master"])

      expect(store.selectedDegrees).toEqual(["Bachelor", "Master"])
    })
  })
})
