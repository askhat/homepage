<script>
import CanvasObject from '@/mixins/CanvasObject'
export default {
  mixins: [CanvasObject],
  props: {
    img: { required: false }
  },
  methods: {
    draw () {
      if (this.ready) {
        if (this.img) {
          this.canvas.ctx.save()
          this.canvas.ctx.beginPath()
          this.canvas.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2)
          this.canvas.ctx.closePath()
          this.canvas.ctx.clip()
          this.canvas.ctx.drawImage(this.img, this.x, this.y, this.radius * 2, this.radius * 2)
          this.canvas.ctx.beginPath()
          this.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
          this.canvas.ctx.clip()
          this.canvas.ctx.closePath()
          this.canvas.ctx.restore()
        } else {
          this.canvas.ctx.beginPath()
          this.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
          this.canvas.ctx.fillStyle = this.color
          this.canvas.ctx.fill()
          this.canvas.ctx.closePath()
        }
      }
    }
  }
}
</script>
