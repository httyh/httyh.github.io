import { Link } from 'react-router-dom'
import { Card, Spin } from 'antd'
import styles from './styles.module.less'

import { useRecordList } from '../../datas'

const Timeline = () => {
  const { data, error } = useRecordList()
  const isLoading = typeof data === 'undefined' && !error

  if (isLoading) {
    return <Spin spinning={isLoading} />
  }
  return (
    <div className={styles.timeline}>
      <div className={styles.timeline_list}>
        {data?.map((item, index) => (
          <Link
            className={styles.timeline_item}
            key={`${item.id}${index}`}
            to={`./detail?id=${item.id}`}
          >
            <div className={styles.timeline_item_content}>
              <img src={styles.timeline_img} srcSet={item.mainImage} />
              <div className={styles.timeline_info}>
                <div className={styles.timeline_title}>{item.title}</div>
                <div className={styles.timeline_date}>{item.date}</div>
                <div className={styles.timeline_desc}>{item.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Timeline
