<script>
export default {
  props: {
    flexDirection: {
      type: String,
      default: 'column',
      validator: val => val === 'column' || val === 'row'
    }
  },
  render(h) {
    return h(
      'ul',
      {
        class: {
          flex: true,
          [this.flexDirection]: true
        }
      },
      this.$slots.default.map(el => {
        if (el.tag) return h('li', {}, [el])
      })
    )
  }
}
</script>
