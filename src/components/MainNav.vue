<template>
  <header class="w-full text-sm">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-grey-1 px-8">
        <a class="flex h-full items-center text-xl" :href="url">{{ company }}</a>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem" class="ml-9 h-full first:ml-0">
              <a href="" class="flex h-full items-center py-2.5">{{ menuItem }}</a>
            </li>
          </ul>
        </nav>
        <h2 class="ml-8 flex h-full items-center">Developed by Tomek Rychtyk</h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainNav",
  data() {
    return {
      company: "Mkoo Careers",
      url: "https://careers.google.com",
      menuItems: ["Teams", "Locations", "Life at Mkoo Corp", "How we hire?", "Students", "Jobs"]
    }
  }
}
</script>
