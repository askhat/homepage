<script>
export default {
  render (h) {
    return h('ul', {}, this.$slots.default.map(el => {
      if (el.tag) return h('li', {}, [el])
    }))
  }
}
</script>


<style scoped>
ul {
  margin: 30px -10px;
  display: inline-flex;
}
li {
  margin: 10px;
}
</style>
