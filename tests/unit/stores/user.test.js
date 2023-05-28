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
})
