import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { Degree } from "@/api/types"
import getDegrees from "@/api/getDegrees"

export const useDegreesStore = defineStore("degrees", () => {
  const degrees = ref<Degree[]>([])

  const FETCH_DEGREES = async () => {
    const receivedDegrees = await getDegrees()
    degrees.value = receivedDegrees
  }

  const UNIQUE_DEGREES = computed(() => {
    return degrees.value.map((item) => {
      return item.degree
    })
  })

  return {
    degrees,

    FETCH_DEGREES,

    UNIQUE_DEGREES
  }
})
