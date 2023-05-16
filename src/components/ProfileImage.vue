<template>
  <img class="h-8 w-8 rounded-3xl object-contain" :src="imageLink" />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
    }
  }
}
</script>
