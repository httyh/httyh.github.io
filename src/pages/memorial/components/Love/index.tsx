import { useEffect, useRef, ReactNode } from 'react'
import { Garden } from './garden'
import { getHeartPoint } from './utils'
import styles from './styles.module.less'

type Props = {
  children?: ReactNode
  onAnimateEnd?: () => void
}

const GardenComp = (props: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    // ...
    if (wrapperRef.current && canvasRef.current) {
      // 爱心
      const loveHeart = wrapperRef.current
      // 爱心花园canvas
      const gardenCanvas = canvasRef.current
      // 爱心x位置
      const offsetX = loveHeart.clientWidth / 2
      // 爱心y位置
      const offsetY = loveHeart.clientHeight / 2 - 55
      // 获取爱心花园ctx
      const gardenCtx = gardenCanvas.getContext('2d')
      if (!gardenCtx) {
        return
      }
      gardenCtx.globalCompositeOperation = 'lighter'
      const garden = new Garden(gardenCtx, gardenCanvas)

      // 循环render
      const gardenRenderTimer = window.setInterval(function () {
        garden.render()
      }, Garden.options.growSpeed)

      let animationTimer = 0

      function startHeartAnimation() {
        const interval = 50
        let angle = 10
        const heart: number[][] = []
        animationTimer = window.setInterval(function () {
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
            // 结束
            clearInterval(animationTimer)
            window.clearInterval(gardenRenderTimer)
            props.onAnimateEnd?.()
          } else {
            angle += 0.2
          }
        }, interval)
      }

      // 等待0.5s后开始画爱心
      setTimeout(() => {
        startHeartAnimation()
      }, 500)
      return () => {
        gardenCtx.clearRect(0, 0, gardenCanvas.width, gardenCanvas.height)
        gardenRenderTimer && window.clearInterval(gardenRenderTimer)
        animationTimer && window.clearInterval(animationTimer)
      }
    }
  }, [])
  return (
    <div ref={wrapperRef} className={styles.garden}>
      <canvas ref={canvasRef} width='670' height='625' />
      {props.children}
    </div>
  )
}

export default GardenComp
