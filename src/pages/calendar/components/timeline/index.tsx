import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

import { useRecordList } from '../../datas'

import styles from './styles.module.less'

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
          <div className={styles.timeline_item} key={`${item.id}${index}`}>
            <HeartOutlined className={styles.heart_icon} />
            <Link
              to={`./detail?id=${item.id}`}
              className={styles.timeline_item_body}
            >
              <div
                style={{ backgroundImage: `url(${item.mainImage})` }}
                className={styles.timeline_img}
              />
              <div className={styles.timeline_info}>
                <div className={styles.timeline_info_header}>
                  {item.date} {item.title}
                </div>
                <div className={styles.timeline_info_desc}>{item.desc}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
