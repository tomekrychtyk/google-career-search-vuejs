<template>
  <h1 class="text-6xl font-bold">Job Results Page</h1>
  <button @click="goToHome">Go to Homepage</button>
</template>

<script>
export default {
  name: "JobResultsView",
  methods: {
    goToHome() {
      this.$router.push({
        path: "/"
      })
    }
  }
}
</script>
