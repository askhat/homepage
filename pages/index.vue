<template lang="pug">
.container
  v-dimmer(:active="gameOn", :radius="25")
    //- nav
    //-   v-list(flex-direction="row")
    //-     nuxt-link(to="/", exact) Home
    //-     nuxt-link(to="/projects") Projects
    //-     nuxt-link(to="/links") Links
    article
      v-card(itemscope, itemtype="http://schema.org/Person")
        h1(slot="header", itemprop="name") {{ title }}
        h2(slot="lead")
          span(itemprop="jobTitle") Front–end Developer
          br
          span(itemprop="worksFor") at&nbsp;Akvelon
        img(slot="image", src="/askhat-bikmetov-photo.jpg", @click="gameOn = true", v-show="!gameOn")
    footer
      v-list(flex-direction="row")
        v-icon(small, name="github", link="https://github.com/askhat")
        v-icon(small, name="linkedin", link="https://www.linkedin.com/in/askhat-bikmetov-35031aa8/")
        v-icon(small, name="telegram", link="https://t.me/askhatbik")
        v-icon(small, name="discord", link="https://discord.gg/Yj7eTTX")
  v-game(v-if="gameOn", @game-over="gameOn = false", @game-win="handleGameWin")
</template>

<script>
import VDimmer from '~/components/VDimmer'
import VGame from '~/components/VGame'
import VCard from '~/components/VCard'
import VList from '~/components/VList'
import VIcon from '~/components/VIcon'

export default {
  components: {
    VDimmer,
    VGame,
    VCard,
    VList,
    VIcon
  },
  data () {
    return {
      gameOn: false,
      title: 'Askhat Bikmetov'
    }
  },
  methods: {
    handleGameWin () {
      const oldTitle = this.title
      this.gameOn = false
      this.title = 'You Won!'
      setTimeout(() => this.title = oldTitle, 3000)
    }
  }
}
</script>
