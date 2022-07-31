import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimateBg, { AnimateBgRef } from './components/AnimateBg'
import Love from './components/Love'
import ElapseClock, { ElapseClockRef } from './components/ElapseClock'
import styles from './styles.module.less'

const Memorial = () => {
  const elapseClockRef = useRef<ElapseClockRef>(null)
  const animateBgRef = useRef<AnimateBgRef>(null)
  const nextIconRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const onAnimateEnd = () => {
    elapseClockRef.current?.show()
    animateBgRef.current?.show()
    setTimeout(() => {
      nextIconRef.current?.classList.add(styles.visible)
    }, 5000)
  }
  const toLookCalendar = () => {
    navigate('../calendar')
  }
  return (
    <div className={styles.memorial}>
      <AnimateBg ref={animateBgRef} />
      <Love onAnimateEnd={onAnimateEnd}>
        <ElapseClock ref={elapseClockRef} />
      </Love>
      <div
        className={styles.next_icon}
        ref={nextIconRef}
        onClick={toLookCalendar}
      >
        去查看我们的历程
      </div>
    </div>
  )
}

export default Memorial
