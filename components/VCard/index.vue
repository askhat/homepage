<template lang="pug">
section
  .info
    .name
      slot(name="header")
    .title
      slot(name="title")
  .photo
    slot(name="image")
</template>

<script>
export default {
  filters: {
    br (str) {
      return str.replace(/\s/, '<br>')
    }
  }
}
</script>

<style scoped>
section {
  display: grid;
  grid-template-columns: 3fr 1fr;
}
.info, .photo {
  place-self: center;
}
.photo > * {
  border-radius: 50%;
  max-width: 150px;
  max-height: 150px;
}
</style>
