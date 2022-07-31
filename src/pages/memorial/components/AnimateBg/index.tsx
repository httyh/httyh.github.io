import { forwardRef, useState, useImperativeHandle } from 'react'
import cls from 'classnames'
import styles from './styles.module.less'

export type AnimateBgRef = { show: () => void }

const arrs = new Array(200).fill(0)

const AnimateBg = forwardRef<AnimateBgRef, {}>((_, ref) => {
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
  }))
  return (
    <div className={cls(styles.animate_bg, visible && styles.visible)}>
      <div className={styles.container}>
        <div className={styles.container_rotate}>
          {arrs.map((item, i) => (
            <div className={styles.rotate} key={i}>
              <div className={styles.flip_rotate}>
                <div className={styles.flip_pos}>
                  <div className={styles.flip} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default AnimateBg
