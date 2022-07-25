import { useRef } from 'react'
import Love from './components/Love'
import ElapseClock, { ElapseClockRef } from './components/ElapseClock'
import styles from './styles.module.less'

const Memorial = () => {
  const elapseClockRef = useRef<ElapseClockRef>(null)
  const onAnimateEnd = () => {
    elapseClockRef.current?.show()
  }
  return (
    <div className={styles.memorial}>
      <Love onAnimateEnd={onAnimateEnd}>
        <ElapseClock ref={elapseClockRef} />
      </Love>
    </div>
  )
}

export default Memorial
