import useSWR from 'swr'

type Module = {
  attributes: {
    title: string
    date: string
    desc: string
    mainImage: string
  }
  ReactComponent: React.FunctionComponent
}

type RecordItem = {
  id: string
  title: string
  desc: string
  date: string
  mainImage: string
}

type RecordDetail = RecordItem & {
  Detail: React.FunctionComponent
}

const mds = import.meta.glob('./*.md') as Record<string, () => Promise<Module>>

export const useRecordList = () => {
  return useSWR('recordList', {
    fetcher: async () => {
      const list: RecordItem[] = []
      for (const key in mds) {
        const { attributes } = await mds[key]()
        list.push({
          id: key.match(/\d+/g)?.[0] || '',
          ...attributes,
        })
      }
      return list
    },
    revalidateOnFocus: false,
  })
}

export const useRecordDetail = (id: string) => {
  return useSWR('recordDetail', {
    fetcher: async () => {
      const data = await mds[`./${id}.md`]()
      const detail: RecordDetail = {
        id,
        ...data.attributes,
        Detail: data.ReactComponent,
      }
      return detail
    },
    revalidateOnFocus: false,
  })
}
