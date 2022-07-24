import { Garden } from './garden'

export function getHeartPoint(angle: number) {
  const t = angle / Math.PI
  const x = 19.5 * (16 * Math.pow(Math.sin(t), 3))
  const y =
    -20 *
    (13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t))
  return [x, y]
}

export function startHeartAnimation(
  offsetX: number,
  offsetY: number,
  garden: Garden
) {
  const interval = 50
  let angle = 10
  const heart: number[][] = []
  const animationTimer = window.setInterval(function () {
    const point = getHeartPoint(angle)
    const bloom = [offsetX + point[0], offsetY + point[1]]
    let draw = true
    for (let i = 0; i < heart.length; i++) {
      const p = heart[i]
      const distance = Math.sqrt(
        Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2)
      )
      if (distance < Garden.options.bloomRadius.max * 1.3) {
        draw = false
        break
      }
    }
    if (draw) {
      heart.push(bloom)
      garden.createRandomBloom(bloom[0], bloom[1])
    }
    if (angle >= 30) {
      clearInterval(animationTimer)
      // showMessages()
    } else {
      angle += 0.2
    }
  }, interval)
}
