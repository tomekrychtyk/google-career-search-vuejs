<template>
  <img class="h-8 w-8 rounded-3xl object-contain" :src="imageLink" alt="User profile image" />
</template>

<script lang="ts" setup>
import { ref } from "vue"

const imageLink = ref(
  "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
)
</script>
