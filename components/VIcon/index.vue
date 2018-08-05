<template lang="pug">
div
  a(v-if="link", :href="link", target="_blank")
    img(:src="iconPath", :style="size")
  img(v-else, :src="iconPath", :style="size")
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    link: { type: String, required: false },
    format: { type: String, default: 'svg' },
    huge: { type: Boolean, default: true },
    medium: { type: Boolean, default: false },
    small: { type: Boolean, default: false }
  },
  computed: {
    iconPath () {
      return `/i/${this.name}.${this.format}`
    },
    size () {
      let resolution
      if (this.huge) resolution = 300
      if (this.medium) resolution = 150
      if (this.small) resolution = 50
      return {
        'width': `${resolution}px`,
        'height': `${resolution}px`
      }
    }
  }
}
</script>

