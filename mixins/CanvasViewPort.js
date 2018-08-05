export default {
  provide () {
    return { canvas: this }
  },
  props: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
  },
  data () {
    return {
      ready: false
    }
  },
  computed: {
    ctx () {
      if (this.ready) {
        return this.$refs.canvas.getContext('2d')
      }
    }
  },
  mounted () {
    this.ready = true
    setInterval(this.draw, 10)
  },
  beforeDestroy () {
    clearInterval(this.draw)
  },
  methods: {
    draw () {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.$children.forEach(child => child.draw())
    }
  }
}
