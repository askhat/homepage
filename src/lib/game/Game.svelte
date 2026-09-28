<script>
  import { onMount } from 'svelte'

  /**
   * Breakout-style easter egg: the photo becomes the ball, skills become bricks.
   * @type {{ ball: HTMLImageElement, onwin: () => void, onlose: () => void }}
   */
  let { ball: ballImage, onwin, onlose } = $props()

  const SKILLS = [
    ['js', 'ruby', 'vue'],
    ['react', 'rails', 'nuxt'],
    ['ubuntu', 'middleman', 'nginx'],
    ['docker', 'html', 'css'],
    ['sass', 'node', 'vuex']
  ]
  const COLS = SKILLS.length
  const ROWS = SKILLS[0].length
  const BALL_SPEED = 400 // px/s along each axis
  const PAD_SPEED = 1000 // px/s

  /** @type {HTMLCanvasElement} */
  let canvas

  onMount(() => {
    const ctx = /** @type {CanvasRenderingContext2D} */ (
      canvas.getContext('2d')
    )
    const images = SKILLS.map((col) =>
      col.map((name) => {
        const img = new Image()
        img.src = `/skills/${name}.png`
        return img
      })
    )
    const bricks = SKILLS.flatMap((col, c) =>
      col.map((_, r) => ({ c, r, x: 0, y: 0, size: 0, alive: true }))
    )
    const ball = { x: 0, y: 0, r: 0, dx: BALL_SPEED, dy: -BALL_SPEED }
    const pad = { x: 0, y: 0, width: 0, height: 10 }
    const keys = { left: false, right: false }
    let width = 0
    let height = 0

    function layout() {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      pad.width = Math.min(250, width * 0.4)
      pad.x = (width - pad.width) / 2
      pad.y = height - pad.height

      // Launch from the paddle, so the player gets a full flight to react.
      ball.r = Math.min(60, width / 8)
      ball.x = width / 2
      ball.y = pad.y - ball.r
      ball.dy = -Math.abs(ball.dy)

      // Bricks and gaps share one size so the grid always fits the screen.
      const unit = Math.min(50, (width - 32) / (COLS * 2 - 1))
      const offset = (width - unit * (COLS * 2 - 1)) / 2
      for (const b of bricks) {
        b.size = unit
        b.x = offset + b.c * unit * 2
        b.y = unit + b.r * unit * 2
      }
    }

    function hitBrick() {
      for (const b of bricks) {
        if (!b.alive) continue
        const nx = Math.max(b.x, Math.min(ball.x, b.x + b.size))
        const ny = Math.max(b.y, Math.min(ball.y, b.y + b.size))
        if ((ball.x - nx) ** 2 + (ball.y - ny) ** 2 > ball.r ** 2) continue
        b.alive = false
        const fromSide = ball.y > b.y && ball.y < b.y + b.size
        if (fromSide) ball.dx = -ball.dx
        else ball.dy = -ball.dy
        return
      }
    }

    /** @returns {'win' | 'lose' | undefined} */
    function step(/** @type {number} */ dt) {
      if (keys.left) pad.x -= PAD_SPEED * dt
      if (keys.right) pad.x += PAD_SPEED * dt
      pad.x = Math.max(0, Math.min(width - pad.width, pad.x))

      ball.x += ball.dx * dt
      ball.y += ball.dy * dt

      if (ball.x - ball.r < 0) ball.dx = Math.abs(ball.dx)
      if (ball.x + ball.r > width) ball.dx = -Math.abs(ball.dx)
      if (ball.y - ball.r < 0) ball.dy = Math.abs(ball.dy)

      if (ball.y + ball.r >= pad.y && ball.dy > 0) {
        if (ball.x >= pad.x && ball.x <= pad.x + pad.width) {
          ball.dy = -Math.abs(ball.dy)
          ball.y = pad.y - ball.r
        } else if (ball.y + ball.r >= height) {
          return 'lose'
        }
      }

      hitBrick()
      if (bricks.every((b) => !b.alive)) return 'win'
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (const b of bricks) {
        const img = images[b.c][b.r]
        if (b.alive && img.complete)
          ctx.drawImage(img, b.x, b.y, b.size, b.size)
      }

      ctx.fillStyle = 'black'
      ctx.fillRect(pad.x, pad.y, pad.width, pad.height)

      // Crop the photo to a centered square and clip it to a circle.
      const side = Math.min(ballImage.naturalWidth, ballImage.naturalHeight)
      const sx = (ballImage.naturalWidth - side) / 2
      const sy = (ballImage.naturalHeight - side) / 2
      ctx.save()
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(
        ballImage,
        sx,
        sy,
        side,
        side,
        ball.x - ball.r,
        ball.y - ball.r,
        ball.r * 2,
        ball.r * 2
      )
      ctx.restore()
    }

    let frame = 0
    let last = performance.now()
    function tick(/** @type {number} */ now) {
      // Clamp dt so a backgrounded tab doesn't teleport the ball.
      const dt = Math.min((now - last) / 1000, 1 / 30)
      last = now
      const result = step(dt)
      if (result === 'win') return onwin()
      if (result === 'lose') return onlose()
      draw()
      frame = requestAnimationFrame(tick)
    }

    /** @param {KeyboardEvent} e */
    function onKey(e) {
      const down = e.type === 'keydown'
      if (e.key === 'ArrowLeft') keys.left = down
      else if (e.key === 'ArrowRight') keys.right = down
      else if (e.key === 'Escape' && down) onlose()
      else return
      e.preventDefault()
    }

    /** @param {PointerEvent} e */
    function onPointer(e) {
      pad.x = e.clientX - pad.width / 2
    }

    layout()
    frame = requestAnimationFrame(tick)
    window.addEventListener('resize', layout)
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('pointerdown', onPointer)
    document.body.style.overflow = 'hidden'

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', layout)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      document.body.style.overflow = ''
    }
  })
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    touch-action: none;
  }
</style>
