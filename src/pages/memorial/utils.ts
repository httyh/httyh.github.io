export function getHeartPoint(offsetX: number, offsetY: number, angle: number) {
  const t = angle / Math.PI
  const x = 19.5 * (16 * Math.pow(Math.sin(t), 3))
  const y =
    -20 *
    (13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t))
  return [offsetX + x, offsetY + y]
}
