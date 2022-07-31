import styles from './styles.module.less'
import Timeline from './components/timeline'

const Calendar = () => {
  return (
    <div className={styles.calendar}>
      <div className={styles.title}>历程</div>
      <Timeline />
    </div>
  )
}

export default Calendar
