<template lang="pug">
.flex.row
  main.flex.column(v-if="hasInfo")
    slot(name="header")
    slot(name="lead")
  aside.flex.column(v-if="hasImage")
    slot(name="image")
</template>

<script>
export default {
  filters: {
    br (str) {
      return str.replace(/\s/, '<br>')
    }
  },
  computed: {
    hasInfo () {
      return this.$slots.header || this.$slots.lead
    },
    hasImage () {
      return this.$slots.image
    }
  }
}
</script>

<style scoped>
main {
  max-height: 120px;
}
img {
  max-width: 120px;
  max-height: 120px;
  border-radius: 50%;
}
</style>
