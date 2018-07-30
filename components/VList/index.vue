<script>
export default {
  props: {
    horizontal: { type: Boolean, default: false }
  },
  render (h) {
    return h('ul', { style: {
      'grid-auto-flow': this.horizontal ? 'column' : 'row'
    }}, this.$slots.default.map(el => {
      if (el.tag) return h('li', {}, [el])
    }))
  }
}
</script>


<style scoped>
ul {
  display: grid;
}
li {
  margin: 30px;
}
</style>
