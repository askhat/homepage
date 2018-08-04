<template lang="pug">
.container
  nav
    v-list(flex-direction="row")
      nuxt-link(to="/", exact) Home
      nuxt-link(to="/projects") Projects
      nuxt-link(to="/links") Links
  article
    v-card(itemscope, itemtype="http://schema.org/Person")
      h1(slot="header", itemprop="name") Askhat Bikmetov
      h2(slot="lead")
        <span itemprop="jobTitle">Front–end Developer</span>
        <br>
        <span itemprop="worksFor">@&nbsp;YouDo.com</span>
      img(slot="image", src="/askhat-bikmetov-photo.jpg")
  footer
    v-list(flex-direction="row")
      v-icon(small, name="github", link="https://github.com/askhat")
      v-icon(small, name="linkedin", link="https://www.linkedin.com/in/askhat-bikmetov-35031aa8/")
      v-icon(small, name="telegram", link="https://t.me/askhatbik")
      v-icon(small, name="discord", link="https://discord.gg/Yj7eTTX")
</template>

<script>
import VCard from '~/components/VCard'
import VList from '~/components/VList'
import VIcon from '~/components/VIcon'

export default {
  components: {
    VCard,
    VList,
    VIcon
  }
}
</script>
