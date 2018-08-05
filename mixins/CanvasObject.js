export default {
  inject: ['canvas'],
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    radius: { type: Number, required: false },
    color: { type: String, default: 'black' }
  },
  render () {
    return null
  },
  data () {
    return {
      ready: false
    }
  },
  mounted () {
    this.ready = true
  }
}
