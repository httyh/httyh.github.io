import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import cls from 'classnames'
import styles from './styles.module.less'

dayjs.extend(durationPlugin)

const startTime = '4-27-2022 21:30:00'
const format = 'MM-DD-YYYY HH:mm:ss'

const timeDurtion = dayjs.duration(dayjs().diff(dayjs(startTime, format)))

export type ElapseClockRef = { show: () => void }

const ElapseClock = forwardRef<ElapseClockRef, {}>((_, ref) => {
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
  }))
  const [durtion, setDurtion] = useState(timeDurtion)
  useEffect(() => {
    const interval = setInterval(() => {
      setDurtion(dayjs.duration(dayjs().diff(dayjs(startTime, format))))
    }, 1000)
    return () => {
      interval && clearInterval(interval)
    }
  }, [])
  return (
    <div className={cls(styles.elapse_clock, visible && styles.visible)}>
      <div className={styles.title}>亲爱的，这是我们相爱在一起的时光：</div>
      <div className={styles.clock}>
        <span className={styles.number}>{Math.floor(durtion.asDays())}</span>
        <span className={styles.text}>days</span>
        <span className={styles.number}>
          {`${durtion.hours()}`.padStart(2, '0')}
        </span>
        <span className={styles.text}>hours</span>
        <span className={styles.number}>
          {`${durtion.minutes()}`.padStart(2, '0')}
        </span>
        <span className={styles.text}>minutes</span>
        <span className={styles.number}>
          {`${durtion.seconds()}`.padStart(2, '0')}
        </span>
        <span className={styles.text}>seconds</span>
      </div>
      <div className={styles.author}>———— 叨叨</div>
    </div>
  )
})

export default ElapseClock
