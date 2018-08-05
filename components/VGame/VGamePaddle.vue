<script>
import CanvasObject from '@/mixins/CanvasObject'

export default {
  mixins: [CanvasObject],
  methods: {
    draw () {
      if (this.ready) {
        this.canvas.ctx.beginPath()
        this.canvas.ctx.rect(this.x, this.y, this.width, this.height)
        this.canvas.ctx.fillStyle = this.color
        this.canvas.ctx.fill()
        this.canvas.ctx.closePath()
      }
    }
  }
}
</script>
