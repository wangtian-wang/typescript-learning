import { axios } from '../../index'
import { IDataType } from '../../types'
export function getPageListData(url: string, queryInfo: any) {
  return axios.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function deletePageData(url: string) {
  return axios.delete<IDataType>({
    url
  })
}
export function createNewData(url: string, data: any) {
  return axios.post<IDataType>({
    url,
    data: data
  })
}
export function editOldData(url: string, data: any) {
  return axios.patch<IDataType>({
    url,
    data
  })
}
