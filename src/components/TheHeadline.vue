<template>
  <section>
    <h1>Build for everyone</h1>
    <h2>Find your next job at Mkoo Corp.</h2>
  </section>
</template>

<script>
export default {
  name: "TheHeadline",
  data() {
    return {
      sample: "Hello!"
    }
  },
  created() {
    console.log("been created: ", this.sample)
  }
}
</script>
