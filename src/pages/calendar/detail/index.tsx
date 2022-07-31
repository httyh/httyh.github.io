import { Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'

import { useRecordDetail } from '../datas'

const Detail = () => {
  const searchParams = useSearchParams()
  const id = searchParams[0].get('id') || ''
  const { data, error } = useRecordDetail(id)

  if (error) {
    return <>页面不存在</>
  }

  if (!data) {
    return <Spin spinning={true} />
  }

  const Comp = data.Detail

  return <Comp />
}

export default Detail
