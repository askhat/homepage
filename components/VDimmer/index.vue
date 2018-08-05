<template lang="pug">
div(:style="dimmerStyle")
  slot
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false },
    radius: { type: Number, defualt: 5 }
  },
  computed: {
    dimmerStyle () {
      if (this.active) {
        return {
          filter: `blur(${this.radius}px`
        }
      }
    }
  }
}
</script>
