<template lang="pug">
canvas(ref="canvas", :height="height", :width="width")
  slot
</template>

<script>
import CanvasViewPort from '~/mixins/CanvasViewPort'

export default {
  mixins: [CanvasViewPort]
}
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
