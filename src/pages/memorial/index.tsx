import { useEffect, useState } from 'react'
import Love from './components/Love'
import ElapseClock from './components/ElapseClock'
import styles from './styles.module.less'

const Memorial = () => {
  const [visibleElapseClock, setVisibleElapseClock] = useState(false)
  const onAnimateEnd = () => {
    setVisibleElapseClock(true)
  }
  return (
    <div className={styles.memorial}>
      <Love onAnimateEnd={onAnimateEnd}>
        <ElapseClock visible={visibleElapseClock} />
      </Love>
    </div>
  )
}

export default Memorial
