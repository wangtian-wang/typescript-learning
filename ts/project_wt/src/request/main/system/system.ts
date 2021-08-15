import { axios } from '../../index'
import { IDataType } from '../../types'
export function getPageListData(url: string, queryInfo: any) {
  return axios.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
