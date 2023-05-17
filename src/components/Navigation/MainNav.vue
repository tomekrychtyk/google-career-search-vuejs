<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
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
        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else @click="loginUser" text="Sign in" />
        </div>
      </div>
      <SubNav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue"
import ProfileImage from "./ProfileImage.vue"
import SubNav from "./SubNav.vue"

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    SubNav
  },
  data() {
    return {
      company: "Mkoo Careers",
      url: "https://careers.google.com",
      menuItems: ["Teams", "Locations", "Life at Mkoo Corp", "How we hire?", "Students", "Jobs"],
      isLoggedIn: false
    }
  },
  computed: {
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn
      }
    }
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true
    }
  }
}
</script>
