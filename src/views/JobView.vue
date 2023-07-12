<template>
  <div>job page for {{ currentJobId }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const currentJobId = computed(() => {
  return route.params.id
})
</script>
