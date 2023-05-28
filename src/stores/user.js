import { defineStore } from "pinia"

export const useUserStroe = defineStore("user", {
  state: () => {
    return {
      isLoggedIn: false
    }
  },

  actions: {
    loginUser() {
      this.isLoggedIn = true
    }
  }
})
