<script>
import CanvasObject from '~/mixins/CanvasObject'

export default {
  mixins: [CanvasObject],
  props: {
    image: { type: String, required: true }
  },
  data() {
    return {
      imgReady: false,
      img: null
    }
  },
  mounted() {
    this.img = new Image()
    this.img.src = this.image
  },
  methods: {
    draw() {
      if (this.ready) {
        this.canvas.ctx.drawImage(
          this.img,
          this.x,
          this.y,
          this.width,
          this.height
        )
      }
    }
  }
}
</script>
