<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 z-10 h-16 w-full bg-white">
      <div class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-grey-1 px-8">
        <RouterLink class="flex h-full items-center text-xl" :to="{ name: 'Home' }"
          >Mkoo Careers</RouterLink
        >
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem.text" class="ml-9 h-full first:ml-0">
              <RouterLink :to="menuItem.url" class="flex h-full items-center py-2.5">{{
                menuItem.text
              }}</RouterLink>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else text="Sign in" @click="userStore.loginUser" />
        </div>
      </div>
      <SubNav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import { useUserStore } from "@/stores/user"
import ActionButton from "@/components/Shared/ActionButton.vue"
import ProfileImage from "./ProfileImage.vue"
import SubNav from "./SubNav.vue"

const menuItems = ref([
  {
    text: "Teams",
    url: "/teams"
  },
  {
    text: "Locations",
    url: "/"
  },
  {
    text: "Life at Mkoo Corp",
    url: "/"
  },
  {
    text: "How we hire?",
    url: "/"
  },
  {
    text: "Students",
    url: "/"
  },
  {
    text: "Jobs",
    url: "/jobs/results"
  }
])

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)
const headerHeightClass = computed(() => {
  return {
    "h-16": !isLoggedIn.value,
    "h-32": isLoggedIn.value
  }
})
</script>
