<template>
  <main class="flex-auto bg-brand-grey-2 p-8">
    <ol>
      <li class="mb-7">
        <router-link
          to="/job/results"
          class="mx-auto block rounded border border-solid border-brand-grey-2 bg-white hover:shadow-grey"
        >
          <div class="mx-8 border-b border-solid border-brand-grey-2 pb-2 pt-5">
            <h2 class="mb-2 text-2xl">Technical Program Manager, Perception, Augumented Reality</h2>
            <div class="flex flex-row align-middle">
              <div class="mr-5">
                <span>Bobo</span>
              </div>
              <div>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  name: "JobListings"
}
</script>
