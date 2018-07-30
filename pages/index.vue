<template lang="pug">
.container
  nav
    v-navbar
      nuxt-link(to="/", exact) Home
      nuxt-link(to="/projects") Projects
      nuxt-link(to="/links") Links
  main
    v-card
      h1(slot="header") Askhat Bikmetov
      h2(slot="title") Front–end Developer<br>at YouDo.com
      img(slot="image", src="/askhat-bikmetov-photo.jpg")
  footer
    v-list(horizontal)
      v-icon(small, name="github", link="https://github.com/askhat")
      v-icon(small, name="linkedin", link="https://www.linkedin.com/in/askhat-bikmetov-35031aa8/")
      v-icon(small, name="telegram", link="https://t.me/askhatbik")
      v-icon(small, name="discord", link="https://discord.gg/Yj7eTTX")
</template>

<script>
import VNavbar from '~/components/VNavbar'
import VCard from '~/components/VCard'
import VList from '~/components/VList'
import VIcon from '~/components/VIcon'

export default {
  components: {
    VNavbar,
    VCard,
    VList,
    VIcon
  }
}
</script>

<style scoped>
.container {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "." "." ".";
}
nav, main, footer {
  place-self: center;
}
</style>
