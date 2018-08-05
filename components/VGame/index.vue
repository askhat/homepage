<template lang="pug">
v-view-port(
  :height="viewport.height",
  :width="viewport.width")
  v-game-brick(
    v-for="brick in bricksShown",
    :key="brick.id",
    :image="brick.image",
    :x="brick.x",
    :y="brick.y",
    :height="50",
    :width="50")
  v-game-ball(
    :img="head",
    :x="objects.ball.x",
    :y="objects.ball.y",
    :radius="objects.ball.radius")
  v-game-paddle(
    :x="objects.pad.x",
    :y="objects.pad.y",
    :width="objects.pad.width",
    :height="objects.pad.height")
</template>

<script>
import VViewPort from '@/components/VGame/VViewPort'
import VGameBall from '@/components/VGame/VGameBall'
import VGamePaddle from '@/components/VGame/VGamePaddle'
import VGameBrick from '@/components/VGame/VGameBrick'

const RIGHT = 39
const LEFT = 37

export default {
  components: {
    VViewPort,
    VGameBall,
    VGamePaddle,
    VGameBrick
  },
  data () {
    return {
      rightPressed: false,
      leftPressed: false,
      viewport: {
        height: 0,
        width: 0
      },
      objects: {
        ball: {
          radius: 60,
          x: 10,
          y: 10,
          dx: 2,
          dy: -2
        },
        pad: {
          height: 10,
          width: 250,
          x: 0,
          y: 0
        },
        brickConfig: {
          height: 50,
          width: 50,
          cols: 5,
          rows: 3,
          gap: 50
        },
        bricks: [
          [
            { id: 0, x: 0, y: 0, show: true, image: '/skills/js.png' },
            { id: 1, x: 0, y: 0, show: true, image: '/skills/ruby.png' },
            { id: 2, x: 0, y: 0, show: true, image: '/skills/vue.png' }
          ], [
            { id: 3, x: 0, y: 0, show: true, image: '/skills/react.png' },
            { id: 4, x: 0, y: 0, show: true, image: '/skills/rails.png' },
            { id: 5, x: 0, y: 0, show: true, image: '/skills/nuxt.png' }
          ], [
            { id: 6, x: 0, y: 0, show: true, image: '/skills/ubuntu.png' },
            { id: 7, x: 0, y: 0, show: true, image: '/skills/middleman.png' },
            { id: 8, x: 0, y: 0, show: true, image: '/skills/nginx.png' }
          ], [
            { id: 9, x: 0, y: 0, show: true, image: '/skills/docker.png' },
            { id: 10, x: 0, y: 0, show: true, image: '/skills/html.png' },
            { id: 11, x: 0, y: 0, show: true, image: '/skills/css.png' }
          ], [
            { id: 12, x: 0, y: 0, show: true, image: '/skills/sass.png' },
            { id: 13, x: 0, y: 0, show: true, image: '/skills/node.png' },
            { id: 14, x: 0, y: 0, show: true, image: '/skills/vuex.png' }
          ]
        ]
      }
    }
  },
  computed: {
    bricksFlatten () {
      const flatten = list => list.reduce(
        (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
      )
      return flatten(this.objects.bricks)
    },
    bricksShown () {
      return this.bricksFlatten.filter(brick => brick.show)
    },
    head () {
      return document.querySelector('aside > img')
    },
  },
  watch: {
    bricksShown (bricks) {
      if (bricks.length < 1) {
        this.$emit('game-win')
      }
    }
  },
  mounted () {
    this.allocate()
    window.addEventListener('resize', this.allocate)
    window.addEventListener('keydown', this.keyDownHandler, false)
    window.addEventListener('keyup', this.keyUpHandler, false)
    setInterval(this.moveBall, 5)
    setInterval(this.detectCollision, 5)
    setInterval(this.movePad, 10)
  },
  beforeDestroy () {
    clearInterval(this.moveBall)
    clearInterval(this.movePad)
    clearInterval(this.detectCollision)
    window.removeEventListener('resize', this.allocate)
    window.removeEventListener('keydown', this.keyDownHandler)
    window.removeEventListener('keyup', this.keyUpHandler)
  },
  methods: {
    keyDownHandler (e) {
      switch (e.keyCode) {
        case RIGHT: this.rightPressed = true; break
        case LEFT: this.leftPressed = true; break
      }
    },
    keyUpHandler (e) {
      switch (e.keyCode) {
        case RIGHT: this.rightPressed = false; break
        case LEFT: this.leftPressed = false; break
      }
    },
    moveBall () {
      const { viewport } = this
      const { ball, pad } = this.objects

      if (ball.y + ball.dy > viewport.height - ball.radius) {
        if(ball.x > pad.x && ball.x < pad.x + pad.width) {
            ball.dy = -ball.dy
        } else {
          this.$emit('game-over')
        }
      }
      if (ball.x + ball.dx > viewport.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx
      }
      if (ball.y + ball.dy > viewport.height - ball.radius || ball.y + ball.dy < ball.radius) {
          ball.dy = -ball.dy
      }
      ball.x += ball.dx
      ball.y += ball.dy
    },
    movePad () {
      const { viewport } = this
      const { pad } = this.objects
      if (this.rightPressed && pad.x < viewport.width - pad.width) {
        pad.x += 10
      }
      if (this.leftPressed && pad.x > 0) {
        pad.x -= 10
      }
    },
    detectCollision () {
      const { ball, bricks, brickConfig } = this.objects
      for (let c = 0; c < brickConfig.cols; c++) {
        for (let r = 0; r < brickConfig.rows; r++) {
          let b = bricks[c][r]
          if(b.show && ball.x > b.x && ball.x < b.x + brickConfig.width && ball.y > b.y && ball.y < b.y + brickConfig.height) {
            ball.dy = -ball.dy
            b.show = false
          }
        }
      }
    },
    allocate () {
      const {
        innerHeight: height,
        innerWidth: width
      } = window

      this.viewport.height = height
      this.viewport.width = width

      const { ball, pad, bricks, brickConfig } = this.objects

      ball.y = height / 2
      ball.x = width / 2

      pad.x = (width - pad.width) / 2
      pad.y = height - pad.height

      const offset = (width - (brickConfig.width * brickConfig.cols + brickConfig.gap * (brickConfig.cols - 1))) / 2
      for (let c = 0; c < brickConfig.cols; c++) {
        for (let r = 0; r < brickConfig.rows; r++) {
          let x = (c * (brickConfig.width + brickConfig.gap)) + offset
          let y = (r * (brickConfig.height + brickConfig.gap)) + brickConfig.gap // offset top
          bricks[c][r].x = x
          bricks[c][r].y = y
        }
      }
    }
  }
}
</script>
